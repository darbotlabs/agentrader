/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248573
 * mangled: jN → useStrategyParam
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useStrategyParam(path) {

      const { state: e, dispatch: t } = useStrategyParams();
      return [
        Dy.get(e, c) ?? "",
        (n) => {
          t({ type: "set", path: c, value: n });
        },
      ];

}