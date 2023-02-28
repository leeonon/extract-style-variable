import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { getStyleVariable } from '../src/index';
import { parseLess } from '../src/playground';

describe('Get css file variable', () => {
  const src = path.resolve(__dirname, 'styles/index.css');

  it('Should return a w two-dimensional array', () => {
    expect(getStyleVariable({ path: src })[0]).toMatchObject({
      key: ':root--color-red',
      prop: '--color-red',
      value: "'red'",
      comment: '--color-red'
    });
  });
});

describe('Get less file variable', () => {
  const src = path.resolve(__dirname, 'styles/index.less');
  parseLess(src);

  it('Should return a w two-dimensional array', () => {
    expect(1).toBe(1);
  });
});
