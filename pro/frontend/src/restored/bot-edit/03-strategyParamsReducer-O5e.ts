/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248540
 * mangled: O5e → strategyParamsReducer
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function strategyParamsReducer(state, action) {

    switch (action.type) {
      case "set":
        return produce(state, (draft) => {
          lodash.set(draft, action.path, action.value);
        });
      case "arr.push": {
        const arr = lodash.get(state, action.path) || [];
        const path = `${action.path}[${arr.length}]`;
        return produce(state, (draft) => {
          lodash.set(draft, path, action.value);
        });
      }
      case "arr.rm":
        return produce(state, (draft) => {
          const next = lodash.get(draft, action.path).filter((_, i) => i !== action.index);
          lodash.set(draft, action.path, next);
        });
      case "reset":
        return action.defaultState ? action.defaultState : {};
      default:
        console.warn("Unrecognized action type", action);
        return state;
    }
}