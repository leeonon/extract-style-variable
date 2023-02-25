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
  getStyleVariable: () => getStyleVariable
});
module.exports = __toCommonJS(src_exports);

// src/getStyleVariable.ts
var import_node_fs = __toESM(require("fs"));
var import_postcss = __toESM(require("postcss"));
function getStyleVariable(params) {
  const css = import_node_fs.default.readFileSync(params.path);
  const ast = import_postcss.default.parse(css);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStyleVariable
});
