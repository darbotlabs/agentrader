/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248568
 * mangled: cS → useStrategyParams
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useStrategyParams() {

      const c = useContext(StrategyParamsContext);
      if (c === undefined) throw new Error('"useStrategyParams" must be used within a <StrategyParamsContext />');
      return c;

}