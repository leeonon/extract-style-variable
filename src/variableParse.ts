import StyleVariableParser from './StyleVariableParser';

export type VariableParseParams = {
  path: string;
};

export function variableParse(params: VariableParseParams) {
  const parser = new StyleVariableParser({ src: params.path });

  return parser;
}
