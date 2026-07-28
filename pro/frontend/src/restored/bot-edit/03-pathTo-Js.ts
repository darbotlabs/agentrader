/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:32365
 * mangled: Js → pathTo
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function pathTo(key, ...args) {

    const entry = PATHS[key];
    return typeof entry === "string" ? entry : entry.apply(null, args);
}