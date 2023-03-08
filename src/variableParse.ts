import fs from 'node:fs';
import StyleVariableParser from './styleVariableParser';

export function parseVariable(css: string) {
  const parser = new StyleVariableParser(css);
  return parser;
}
