import fs from 'node:fs';
import postcss from 'postcss';
import parser from './lessParse';

export function parseLess(src: string) {
  const less = fs.readFileSync(src, 'utf-8');
  postcss()
    .process(less, { syntax: parser })
    .then((res) => {
      // console.log('🚀 ~ file: playground.ts:10 ~ postcss ~ res:', res);
    });
}
