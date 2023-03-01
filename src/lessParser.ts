import Comment from 'postcss/lib/comment';
import Parser from 'postcss/lib/parser';

const afterPattern = /:$/;

export default class LessParser extends Parser {
  public lastNode: any;

  constructor(...args: []) {
    super(...args);

    this.lastNode = null;
  }

  parse(): void {
    let token;
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();

      if (token[0] === 'at-word') {
        this.atrule(token);
      }
    }

    super.endFile();
  }

  init(node: any, line: any, column: any) {
    super.init(node, line, column);
    this.lastNode = node;
  }

  atrule(token: any) {
    if (!afterPattern.test(token[1])) {
      return;
    }

    token[1] = '@' + token[1];
    super.atrule(token);

    if (this.lastNode) {
      console.log(
        `🚀 ~  before lastNode: name: ${this.lastNode.name} ---- params: ${this.lastNode.params}`
      );

      // TODO Handle import: name === 'import' && params.length

      if (this.lastNode.name.slice(-1) !== ':') {
        return;
      }

      // Processing variable node
      if (afterPattern.test(this.lastNode.name)) {
        const [match] = this.lastNode.name.match(afterPattern);

        this.lastNode.name = this.lastNode.name.replace(match, '');
        this.lastNode.raws.afterName =
          match + (this.lastNode.raws.afterName || '');
        this.lastNode.variable = true;
        this.lastNode.value = this.lastNode.params;
      }

      if (/^:(\s+)?/.test(this.lastNode.params)) {
        const [match] = this.lastNode.params.match(/^:(\s+)?/);
        this.lastNode.value = this.lastNode.params.replace(match, '');
        this.lastNode.raws.afterName =
          (this.lastNode.raws.afterName || '') + match;
        this.lastNode.variable = true;
      }

      // look @[value]
      if (this.lastNode.params.startsWith('@')) {
        this.lastNode.value = this.lastNode.params;
        this.lastNode.variable = true;
      }

      console.log(
        `🚀 ~  after lastNode: name: ${this.lastNode.name} ---- params: ${this.lastNode.params} ---- value: ${this.lastNode.value}`
      );
    }
  }
}
