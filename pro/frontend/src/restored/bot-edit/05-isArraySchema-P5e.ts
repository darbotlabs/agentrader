/**
 * @evidence index-DTKnr6h1.js:248610
 * mangled: P5e → isArraySchema
 */
export const isArraySchema = (schema) =>
  "type" in schema && schema.type === "array" && "items" in schema && !!schema.items;
