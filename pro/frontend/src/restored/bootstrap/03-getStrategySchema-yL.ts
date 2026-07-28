/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:249261
 * mangled: yL → getStrategySchema
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function getStrategySchema(strategyName, strategies) {

    if (strategyName in strategies) return strategies[strategyName].schema;
    throw new Error(`Cannot extract strategy schema. Strategy ${strategyName} not found`);

}