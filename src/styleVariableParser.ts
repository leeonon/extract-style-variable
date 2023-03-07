import type { ChildNode, Declaration, Result, Root, Document } from 'postcss';
import type { GetStyleVarParams, StyleVariableResult } from './types';

import fs from 'node:fs';
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
    const ast = postcss.parse(this.css);
    const result: StyleVariableResult = [];

    ast.walk((decl) => this.eachCssNodes(decl, result));

    return Array.from(result).flat();
  }

  async parseLess() {
    const result = await postcss().process(this.css, {
      syntax: createSyntax('less')
    });
    this.root = result.root;
    this.variableList = this.parseLessNodes(this.root);
    return this;
  }

  async parseSass() {}

  private parseLessNodes(root: Root | Document) {}

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
            params: ''
            // comment
          });
          this.eachCssNodes(decl, result);
        }
      });
    }
  }
}
