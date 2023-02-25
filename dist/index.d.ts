type Result = Map<string, Array<{
    prop: string;
    value: string;
}>>;
type GetStyleVarParams = {
    path: string;
};
declare function getStyleVar(params: GetStyleVarParams): void;

export { GetStyleVarParams, Result, getStyleVar };
