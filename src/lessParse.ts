import postcss from 'postcss';
import Input from 'postcss/lib/input';
import LessParser from './lessParser';

export default {
  parse(less: any, options: any) {
    const input = new Input(less);
    // @ts-ignore
    const parser = new LessParser(input);
    parser.parse();

    // @ts-ignore
    return parser.root;
  },
  stringify(node: any, builder: any) {
    // console.log('🚀 ~ file: lessParser.ts:6 ~ stringify ~ node:', node);
    return 'STRINGIFY';
  }
};
