import fs from 'node:fs';
import StyleVariableParser from './styleVariableParser';

export type VariableParseParams = {
  path: string;
};

export function variableParse(params: VariableParseParams) {
  const css = fs.readFileSync(params.path, 'utf-8');
  const parser = new StyleVariableParser(css);

  return parser;
}
