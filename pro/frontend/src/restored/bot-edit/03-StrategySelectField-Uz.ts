/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248810
 * mangled: Uz → StrategySelectField
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function StrategySelectField({ value, onChange, templates }) {
  return jsxs(FormControl, {
        children: [jsx(FormLabel, { children: "Strategy" }), jsx(StrategySelect, { onChange: e, value: c, templates: t })],
      })
}