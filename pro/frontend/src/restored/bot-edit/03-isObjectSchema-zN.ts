/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248617
 * mangled: zN → isObjectSchema
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function isObjectSchema(schema) {
  return "type" in c && c.type === "object" && "properties" in c && !!c.properties
}