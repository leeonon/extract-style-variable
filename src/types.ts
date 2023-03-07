import AtRule from 'postcss/lib/at-rule';
import Comment from 'postcss/lib/comment';

export type StyleVariableResult = Array<{
  selectors: string[];
  name: string;
  value: string;
  params: string;
  comments?: {
    top: Comment[];
    right: Comment[];
  };
}>;

export type GetStyleVarParams = {
  path: string;
};

export interface VariableAtRule extends AtRule {
  value: string;
  comments: {
    top: Comment[];
    right: Comment[];
  };
}
