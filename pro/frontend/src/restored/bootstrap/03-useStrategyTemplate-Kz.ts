/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:249265
 * mangled: Kz → useStrategyTemplate
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useStrategyTemplate(templateName, strategies) {

    const { dispatch } = useStrategyParams();
    const [strategy, setStrategy] = useState(templateName);
    const [schema, setSchema] = useState(getStrategySchema(strategy, strategies));
    return {
      strategy,
      onStrategyChange: (next) => {
        setStrategy(next);
        const nextSchema = getStrategySchema(next, strategies);
        setSchema(nextSchema);
        const defaults = defaultValuesFromSchema(nextSchema);
        dispatch({ type: "reset", defaultState: defaults });
      },
      schema,
      defaultValues: defaultValuesFromSchema(schema),
    };
}