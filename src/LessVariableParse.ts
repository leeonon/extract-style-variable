import type { Syntax } from 'postcss';

import Input from 'postcss/lib/input';
import LessVariableParser from './LessVariableParser';

const syntax: Syntax = {
  parse(css, options) {
    const input = new Input(css.toString(), options);
    const parser = new LessVariableParser(input);
    parser.parse();

    return parser.root;
  },
  stringify() {
    return '';
  }
};

export default syntax;
