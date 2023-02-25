"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getStyleVar: () => getStyleVar
});
module.exports = __toCommonJS(src_exports);
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var import_postcss = __toESM(require("postcss"));
var src = import_node_path.default.resolve("./test/styles/index.css");
function getStyleVar(params) {
  const css = import_node_fs.default.readFileSync(params.path);
  const ast = import_postcss.default.parse(css);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStyleVar
});
