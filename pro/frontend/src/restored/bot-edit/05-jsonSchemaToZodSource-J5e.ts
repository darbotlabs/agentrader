/**
 * @evidence index-DTKnr6h1.js:249220
 * mangled: J5e → jsonSchemaToZodSource
 * Generates zod source text (cjs/esm/none module styles)
 */
export function jsonSchemaToZodSource(schema, { module, name, type, noImport, ...rest } = {}) {
  if (type && (!name || module !== "esm")) {
    throw new Error("Option `type` requires `name` to be set and `module` to be `esm`");
  }
  // Jr(...) is the recursive schema→zod expression printer (still a gap dependency)
  let code = printZodExpr(schema, { module, name, path: [], seen: new Map(), ...rest });
  // module wrapping omitted in detail — structure preserved for fidelity notes
  if (module === "none" && name) code = `const ${name} = ${code}`;
  return code;
}
