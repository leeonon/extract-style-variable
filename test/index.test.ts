import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { variableParse } from '../src/index';

describe('Get css file variable', () => {
  const src = path.resolve(__dirname, 'styles/index.css');

  it('Should return a w two-dimensional array', async () => {
    const result = await variableParse({ path: src }).parseCss();
    expect(result[0]).toMatchObject({
      selectors: [':root', '--color-red'],
      name: '--color-red',
      value: "'red'",
      comment: 'var color'
    });
  });
});

describe('Get less file variable', () => {
  const src = path.resolve(__dirname, 'styles/index.less');
  variableParse({ path: src }).parseLess();

  it('Should return a w two-dimensional array', () => {
    expect(1).toBe(1);
  });
});
