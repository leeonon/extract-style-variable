// src/getStyleVariable.ts
import fs from "fs";
import postcss from "postcss";
function getStyleVariable(params) {
  const css = fs.readFileSync(params.path);
  const ast = postcss.parse(css);
  const result = [];
  ast.walk((decl) => eachNodes(decl, result));
  return Array.from(result).flat();
}
function eachNodes(node, result) {
  if (node.type === "rule") {
    node.nodes.forEach((decl) => {
      if (decl.type === "decl" && checkProp(decl.prop)) {
        const key = node.selectors.concat(decl.prop).join("");
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
function checkProp(prop) {
  return prop.startsWith("--");
}
function readAnnotation(decl) {
  const annotation = decl.prev();
  if ((annotation == null ? void 0 : annotation.type) === "comment") {
    return annotation.text;
  }
  return null;
}
export {
  getStyleVariable
};
