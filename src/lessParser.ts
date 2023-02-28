import Comment from 'postcss/lib/comment';
import Parser from 'postcss/lib/parser';

export default class LessParser extends Parser {
  constructor(...args: []) {
    super(...args);

    this.lastNode = null;
  }
  each(tokens: any) {
    // tokens[0][1] = ` ${tokens[0][1]}`;
    // const firstParenIndex = tokens.findIndex((t) => t[0] === '(');
    // const lastParen = tokens.reverse().find((t) => t[0] === ')');
    // const lastParenIndex = tokens.reverse().indexOf(lastParen);
    // const paramTokens = tokens.splice(firstParenIndex, lastParenIndex);
    // const params = paramTokens.map((t) => t[1]).join('');
    // for (const token of tokens.reverse()) {
    //   this.tokenizer.back(token);
    // }
    // this.atrule(this.tokenizer.nextToken());
    // this.lastNode.function = true;
    // this.lastNode.params = params;
  }
  init(node, line, column) {
    super.init(node, line, column);
    this.lastNode = node;
  }
  atrule(tokens: any[]) {
    console.log(
      '🚀 ~ file: lessParser.ts:23 ~ LessParser ~ mixin ~ tokens:',
      tokens
    );
    tokens[1] = 'color';
  }
}
