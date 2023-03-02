// https://github.com/postcss/postcss/blob/main/lib/parser.js#L79

declare module '*/parser' {
  class Parser {
    constructor(args: any): void;
    createTokenizer(): void;
    parse(): void;
    comment(token: any): void;
    emptyRule(): void;
    other(): void;
    rule(): void;
    atrule(token: any): void;
    init(node: any, line: any, column: any): void;
    endFile(): void;
    tokenizer: any;
    root: any;
  }
  export default Parser;
}
