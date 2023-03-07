import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { variableParse } from '../src/index';

// describe('Get css file variable', () => {
//   const src = path.resolve(__dirname, 'styles/index.css');

//   it('Should return a w two-dimensional array', async () => {
//     const result = await variableParse({ path: src }).parseCss();
//     expect(result[0]).toMatchObject({
//       selectors: [':root', '--color-red'],
//       name: '--color-red',
//       value: "'red'",
//       comment: 'var color'
//     });
//   });
// });

describe('Get less file variable', async () => {
  const src = path.resolve(__dirname, 'styles/index.less');
  const css = fs.readFileSync(src, 'utf-8');
  const result = await variableParse(css).parseLess();
  console.log('🚀 ~ file: index.test.ts:24 ~ describe ~ result:', result[1]);

  it('Should return a w two-dimensional array', () => {
    expect(result[0]).toMatchObject({
      name: '@theme',
      value: 'green',
      params: 'green',
      comments: { top: [], right: [] }
    });
  });

  it('Comments', () => {
    expect(result[1]).toMatchObject({
      name: '@color',
      value: 'red',
      params: 'red',
      comments: {
        top: [
          { text: 'color comment 3' },
          { text: 'color comment 2' },
          { text: 'color comment 1' }
        ],
        right: [{ text: 'right comment' }]
      }
    });
  });
});
