export type GetStyleVariableResult = Array<{
  key: string;
  prop: string;
  value: string;
  comment?: string | null;
}>;

export type GetStyleVarParams = {
  path: string;
};
