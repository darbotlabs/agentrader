/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248603
 * mangled: qk → defaultValuesFromSchema
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function defaultValuesFromSchema(schema) {

    function e(t) {
      if (t.default !== undefined) return t.default;
      if (t.type === "object" && t.properties) {
        const s = {};
        for (const [i, n] of Object.entries(t.properties)) s[i] = e(n);
        return s;
      }
      if (t.type === "array" && t.items) return [e(t.items)];
      if (t.type === "string" || t.type === "number") return "";
    }
    return e(c);

}