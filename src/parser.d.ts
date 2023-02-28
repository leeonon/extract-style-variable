// https://github.com/postcss/postcss/blob/main/lib/parser.js#L79

declare module '*/parser' {
  class Parser {
    createTokenizer(): void;
    parse(): void;
    comment(token: any): void;
    emptyRule(): void;
    other(): void;
    rule(): void;
  }
  export default Parser;
}
