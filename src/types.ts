export type StyleVariableResult = Array<{
  selectors: string[];
  name: string;
  value: string;
  comment?: string | null;
}>;

export type GetStyleVarParams = {
  path: string;
};
