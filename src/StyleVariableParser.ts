import type { ChildNode, Declaration } from 'postcss';
import type { GetStyleVarParams, StyleVariableResult } from './types';

import fs from 'node:fs';
import postcss from 'postcss';
import parser from './LessVariableParse';

export default class StyleVariableParser {
  public css: string;
  // public variableList: [];

  constructor(css: string) {
    this.css = css;
  }

  async parseCss() {
    const ast = postcss.parse(this.css);
    const result: StyleVariableResult = [];

    ast.walk((decl) => this.eachCssNodes(decl, result));

    return Array.from(result).flat();
  }

  async parseLess() {
    const result = await postcss().process(this.css, { syntax: parser });
    console.log(
      '🚀 ~ file: StyleVariableParser.ts:23 ~ StyleVariableParser ~ parseLess ~ result:',
      JSON.stringify(result.root)
    );
    return result;
  }

  async parseSass() {}

  private eachCssNodes(node: ChildNode, result: StyleVariableResult) {
    if (node.type === 'rule') {
      node.nodes.forEach((decl) => {
        if (decl.type === 'decl' && decl.prop.startsWith('--')) {
          const selectors = node.selectors.concat(decl.prop);
          const annotation = decl.prev();
          const comment =
            annotation?.type === 'comment' ? annotation.text : null;
          result.push({
            selectors,
            name: decl.prop,
            value: decl.value,
            comment
          });
          this.eachCssNodes(decl, result);
        }
      });
    }
  }
}
