// https://github.com/postcss/postcss/blob/main/lib/parser.js#L79

// import type { ChildNode, Declaration } from 'postcss';

declare module 'postcss/lib/parser' {
  class Parser {
    constructor(input: any): void;
    createTokenizer(): void;
    parse(): void;
    comment(token: any): void;
    emptyRule(): void;
    other(token: any): void;
    rule(): void;
    atrule(token: any): void;
    init(node: any, line: any, column: any): void;
    endFile(): void;
    tokenizer: any;
    root: {
      nodes: any[];
    };
    input: any;
    current: {
      nodes: any[];
    };
  }
  export default Parser;
}
