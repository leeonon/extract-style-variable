type GetStyleVariableResult = Array<{
    key: string;
    prop: string;
    value: string;
    comment?: string | null;
}>;
type GetStyleVarParams = {
    path: string;
};

declare function getStyleVariable(params: GetStyleVarParams): {
    key: string;
    prop: string;
    value: string;
    comment?: string | null | undefined;
}[];

export { GetStyleVarParams, GetStyleVariableResult, getStyleVariable };
