import type {
  ChildNode,
  Declaration,
  Result,
  Root,
  Document,
  Comment
} from 'postcss';
import type {
  GetStyleVarParams,
  StyleVariableResult,
  VariableAtRule
} from './types';

import postcss from 'postcss';
import createSyntax from './syntax';

export default class StyleVariableParser {
  public css: string;
  public root?: Root | Document;
  public variableList: StyleVariableResult[];

  constructor(css: string) {
    this.css = css;
    this.variableList = [];
  }

  async parseCss() {
    const result = await postcss().process(this.css, {
      syntax: createSyntax('css')
    });
    this.root = result.root;
    return this.eachNodes(this.root.nodes as VariableAtRule[]);
  }

  async parseLess(): Promise<StyleVariableResult> {
    const result = await postcss().process(this.css, {
      syntax: createSyntax('less')
    });
    this.root = result.root;
    return this.eachNodes(this.root.nodes as VariableAtRule[]);
  }

  eachNodes(nodes: VariableAtRule[]): StyleVariableResult {
    return nodes.map((node: VariableAtRule) => {
      return {
        name: node.name,
        value: node.value,
        params: node.params,
        comments: {
          top: this.eachCommons(node.comments.top),
          right: this.eachCommons(node.comments.right)
        }
      };
    });
  }

  async parseSass() {}

  eachCommons(comments: Comment[]) {
    return comments.map((comment) => ({
      text: comment.text
    }));
  }
}
