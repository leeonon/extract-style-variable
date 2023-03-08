import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { variableParse } from '../src/index';

describe('Get css file variable', () => {
  const src = path.resolve(__dirname, 'styles/index.css');

  it('Should return a w two-dimensional array', async () => {
    const src = path.resolve(__dirname, 'styles/index.css');
    const css = fs.readFileSync(src, 'utf-8');
    const result = await variableParse(css).parseCss();
    expect(result[0]).toMatchObject({
      name: '--color-red',
      value: "'red'",
      params: "'red'",
      comments: { top: [{ text: 'var color' }], right: [] }
    });
  });
});

describe('Get less file variable', async () => {
  const src = path.resolve(__dirname, 'styles/index.less');
  const css = fs.readFileSync(src, 'utf-8');
  const result = await variableParse(css).parseLess();

  it('Should return a w two-dimensional array', () => {
    expect(result[0]).toMatchObject({
      name: '@theme',
      value: 'green',
      params: 'green',
      comments: { top: [], right: [] }
    });
  });

  it('Less Comments', () => {
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

describe('Get sass file variable', async () => {
  const src = path.resolve(__dirname, 'styles/index.scss');
  const css = fs.readFileSync(src, 'utf-8');
  const result = await variableParse(css).parseSass();

  it('Should return a Object', () => {
    expect(result[0]).toMatchObject({
      name: '$color',
      value: '#F90',
      params: '#F90',
      comments: { top: [{ text: 'Top Comment' }], right: [] }
    });
  });

  it('Should return a Object', () => {
    expect(result[2]).toMatchObject({
      name: '$nav-color',
      value: '#F90',
      params: '$color',
      comments: { top: [], right: [] }
    });
  });
});
