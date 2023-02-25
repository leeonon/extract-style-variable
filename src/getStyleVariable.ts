import type { ChildNode, Declaration } from 'postcss';
import type { GetStyleVarParams, GetStyleVariableResult } from './types';

import fs from 'node:fs';
import postcss from 'postcss';

export function getStyleVariable(params: GetStyleVarParams) {
  const css = fs.readFileSync(params.path);
  const ast = postcss.parse(css);
  const result: GetStyleVariableResult = [];

  ast.walk((decl) => eachNodes(decl, result));

  return Array.from(result).flat();
}

function eachNodes(node: ChildNode, result: GetStyleVariableResult) {
  if (node.type === 'rule') {
    node.nodes.forEach((decl) => {
      if (decl.type === 'decl' && checkProp(decl.prop)) {
        const key = node.selectors.concat(decl.prop).join('');
        const comment = readAnnotation(decl);
        result.push({
          key,
          prop: decl.prop,
          value: decl.value,
          comment
        });
        eachNodes(decl, result);
      }
    });
  }
}

function checkProp(prop: string) {
  return prop.startsWith('--');
}

function readAnnotation(decl: Declaration) {
  const annotation = decl.prev();
  if (annotation?.type === 'comment') {
    return annotation.text;
  }
  return null;
}
