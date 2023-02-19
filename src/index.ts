// https://github.com/postcss/postcss/blob/main/docs/README-cn.md
// https://juejin.cn/post/6844903761463214087

import type { ChildNode } from 'postcss';

import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

type Result = Map<
	string,
	Array<{
		prop: string;
		value: string;
	}>
>;

const src = path.resolve('./test/styles/index.css');
const css = fs.readFileSync(src);
const ast = postcss.parse(css);
const result: Result = new Map();

ast.walk((decl, index) => {
	eachNodes(decl, result);
});

console.log('🚀 ~ file: index.ts:12 ~ ast.walk ~ result', result);

function eachNodes(node: ChildNode, result: Result) {
	if (node.type === 'rule') {
		node.nodes.forEach((child) => {
			if (child.type === 'decl') {
				const key = node.selectors.join('-');
				const value = { prop: child.prop, value: child.value };
				result.set(
					key,
					result.get(key) ? result.get(key)?.concat(value) || [] : [value]
				);
				eachNodes(child, result);
			}
		});
	}
}
