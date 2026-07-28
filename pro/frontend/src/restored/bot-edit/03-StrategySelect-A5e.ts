/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248798
 * mangled: A5e → StrategySelect
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function StrategySelect({ value, onChange, templates }) {

      const [s] = $f(),
        i = Object.fromEntries(Object.entries(t).filter(([r, a]) => !a.hidden)),
        n = s ? t : i;
      return jsx(Xk, {
        onChange: (r, a) => e(a),
        required: true,
        value: c,
        children: Object.keys(n).map((r) => jsx(Xm, { value: r, children: r }, r)),
      });

}