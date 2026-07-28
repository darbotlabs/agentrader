/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248582
 * mangled: x5e → useStrategyParamArray
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useStrategyParamArray(path) {

      const { state: e, dispatch: t } = useStrategyParams(),
        s = Dy.get(e, c) || [];
      return {
        value: s,
        setValue: (a) => t({ type: "set", path: c, value: a }),
        push: (a) => t({ type: "arr.push", path: c, value: a }),
        remove: (a) => t({ type: "arr.rm", path: c, index: a }),
        length: s.length,
      };

}