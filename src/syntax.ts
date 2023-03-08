import type { Syntax } from 'postcss';

import Input from 'postcss/lib/input';
import VariableParser, { type ParserType } from './parser';

export default function createSyntax(type: ParserType): Syntax {
  return {
    parse(css, options) {
      const input = new Input(css.toString(), options);
      const parser = new VariableParser(type, input);
      parser.parse();
      return parser.root;
    },
    stringify() {
      return '';
    }
  };
}
