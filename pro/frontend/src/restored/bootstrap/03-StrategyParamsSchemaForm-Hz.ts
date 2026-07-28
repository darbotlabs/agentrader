/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248762
 * mangled: Hz → StrategyParamsSchemaForm
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function StrategyParamsSchemaForm({ schema, debug }) {

      const { state: t, dispatch: s } = useStrategyParams(),
        i = () => {
          s({ type: "reset", defaultState: defaultValuesFromSchema(c) });
        };
      return (
        Vy(c) && s({ type: "reset", defaultState: defaultValuesFromSchema(c) }),
        isObjectSchema(c)
          ? jsxs(jsxRuntime.Fragment, {
              children: [
                jsx($N, { basePath: "", name: "", root: true, schema: c }),
                jsx(Button, { sx: { mt: 2 }, variant: "outlined", onClick: i, children: "Reset to defauts" }),
                e
                  ? jsxs(Sheet, {
                      children: [
                        jsx(Typography, { children: "State" }),
                        jsx("pre", { children: JSON.stringify(t, null, 2) }),
                      ],
                    })
                  : null,
                e
                  ? jsxs(Sheet, {
                      children: [
                        jsx(Typography, { children: "Schema" }),
                        jsx("pre", { children: JSON.stringify(c, null, 2) }),
                      ],
                    })
                  : null,
              ],
            })
          : jsxs("div", { children: ["Unsupported schema. It must be object type. Schema: ", JSON.stringify(c)] })
      );

}