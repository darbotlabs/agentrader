/**
 * RESTORED by Minifryer Unfry — chase pass after gVe
 * @evidence index-DTKnr6h1.js:248564
 * mangled: Vz → StrategyParamsProvider
 * kind: arrow
 * provenance: derivation (structure) + explicit string survivors
 */

export function StrategyParamsProvider({ children, initialState }) {

      const [state, dispatch] = useReducer(O5e, initialState || T5e);
    return jsx(qz.Provider, { value: { state, dispatch }, children });

}