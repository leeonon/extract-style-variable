import type { VariableAtRule } from './types';

import Parser from 'postcss/lib/parser';
import Comment from 'postcss/lib/comment';
import Input from 'postcss/lib/input';

const afterPattern = /:$/;
const beforePattern = /^:(\s+)?/;

export type ParserType = 'css' | 'less' | 'sass';

export default class VariableParser extends Parser {
  public lastNode: VariableAtRule | null;
  private temporaryComments: Comment[];
  private type: ParserType;

  constructor(type: ParserType, input: Input) {
    super(input);

    this.lastNode = null;
    this.type = type;
    this.temporaryComments = [];
  }

  parse(): void {
    let token;
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();
      if (token[0] === 'at-word') this.atrule(token);
      if (token[0] === 'comment') this.comment(token);
      if (token[0] === 'word') this.word(token);
    }

    super.endFile();
    this.getComments();
  }

  init(node: VariableAtRule, line: number, column: number) {
    super.init(node, line, column);
    this.lastNode = node;
  }

  word(token: any[]) {
    if (this.type === 'css' && !token[1].startsWith('--')) return;
    if (this.type === 'sass' && !token[1].startsWith('$')) return;
    if (this.type === 'less') return;

    super.other(token);

    if (this.lastNode) {
      this.lastNode.name = this.lastNode.prop;
      this.lastNode.params = this.lastNode.value;
      this.lastNode.value = this.lastNode.value;
    }

    // TODO calculate css variables value

    if (
      this.type === 'sass' &&
      this.lastNode &&
      this.lastNode.params?.startsWith('$')
    ) {
      const parentValue = [...this.root.nodes]
        .reverse()
        .find((item: any) => item.name === this.lastNode?.params);
      this.lastNode.value = parentValue?.value;
    }
  }

  atrule(token: any) {
    if (!afterPattern.test(token[1])) {
      return;
    }

    token[1] = '@' + token[1];
    super.atrule(token);

    if (!this.lastNode) return;

    // TODO Handle import: name === 'import' && params.length

    if (this.lastNode.name.slice(-1) !== ':') {
      return;
    }

    // Processing variable node
    if (afterPattern.test(this.lastNode.name)) {
      // @ts-ignore
      const [match] = this.lastNode.name.match(afterPattern);

      this.lastNode.name = this.lastNode.name.replace(match, '');
      this.lastNode.raws.afterName =
        match + (this.lastNode.raws.afterName || '');
      this.lastNode.value = this.lastNode.params;
    }

    if (beforePattern.test(this.lastNode.params)) {
      const [match] = this.lastNode.params.match(beforePattern);
      this.lastNode.value = this.lastNode.params.replace(match, '');
      this.lastNode.raws.afterName =
        (this.lastNode.raws.afterName || '') + match;
    }

    if (this.lastNode.params.startsWith('@')) {
      const parentValue = [...this.root.nodes]
        .reverse()
        .find((item: any) => item.name === this.lastNode?.params);
      this.lastNode.value = parentValue?.value;
    }
  }

  comment(token: any) {
    let node = new Comment();
    let text = token[1].slice(2, -2);
    if (text.slice(-2) === '*/') {
      text = text.slice(0, -2);
    }

    node.source = {
      start: this.getPosition(token[2]),
      end: this.getPosition(token[3] || token[2]),
      input: this.input
    };

    if (/^\s*$/.test(text)) {
      node.text = '';
      node.raws.left = text;
      node.raws.right = '';
    } else {
      let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
      node.text = match[2];
      node.raws.left = match[1];
      node.raws.right = match[3];
    }

    this.temporaryComments.push(node);
  }

  unknownWord(tokens: any) {
    if (this.type === 'sass') {
      this.spaces += tokens.map((i: string) => i[1]).join('');
      return;
    }

    super.unknownWord(tokens);
  }

  getPosition(offset: number) {
    let pos = this.input.fromOffset(offset);
    return {
      offset,
      line: pos.line,
      column: pos.col
    };
  }

  getComments() {
    if (this.temporaryComments.length === 0) return;

    this.root.nodes.forEach((node) => {
      node.comments = { top: [], right: [] };

      let currentIndex = 1;
      [...this.temporaryComments].reverse().forEach((comment) => {
        if (comment.source?.start?.line === node.source?.end?.line) {
          node.comments.right.push(comment);
        }

        if (
          comment.source?.end?.line ===
          node.source?.start?.line - currentIndex
        ) {
          currentIndex++;
          node.comments.top.push(comment);
        }
      });
    });
  }
}
