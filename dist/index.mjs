// src/index.ts
import fs from "fs";
import path from "path";
import postcss from "postcss";
var src = path.resolve("./test/styles/index.css");
function getStyleVar(params) {
  const css = fs.readFileSync(params.path);
  const ast = postcss.parse(css);
  const result = /* @__PURE__ */ new Map();
  ast.walk((decl) => {
    eachNodes(decl, result);
  });
}
getStyleVar({ path: src });
function eachNodes(node, result) {
  if (node.type === "rule") {
    node.nodes.forEach((child) => {
      var _a;
      if (child.type === "decl" && checkProp(child.prop)) {
        const key = node.selectors.join(">");
        const value = { prop: child.prop, value: child.value };
        result.set(
          key,
          result.get(key) ? ((_a = result.get(key)) == null ? void 0 : _a.concat(value)) || [] : [value]
        );
        eachNodes(child, result);
      }
    });
  }
}
function checkProp(prop) {
  if (prop.substring(0, 2) === "--") {
    return true;
  }
  return false;
}
export {
  getStyleVar
};
