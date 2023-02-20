// https://github.com/postcss/postcss/blob/main/docs/README-cn.md
// https://juejin.cn/post/6844903761463214087

import type { ChildNode } from 'postcss';

import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

export type Result = Map<
	string,
	Array<{
		prop: string;
		value: string;
	}>
>;

export type GetStyleVarParams = {
	path: string;
};

const src = path.resolve('./test/styles/index.css');
export function getStyleVar(params: GetStyleVarParams) {
	const css = fs.readFileSync(params.path);
	const ast = postcss.parse(css);
	const result: Result = new Map();

	ast.walk((decl) => {
		eachNodes(decl, result);
	});
}

getStyleVar({ path: src });

function eachNodes(node: ChildNode, result: Result) {
	if (node.type === 'rule') {
		node.nodes.forEach((child) => {
			if (child.type === 'decl' && checkProp(child.prop)) {
				const key = node.selectors.join('>');
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

function checkProp(prop: string) {
	if (prop.substring(0, 2) === '--') {
		return true;
	}

	return false;
}
