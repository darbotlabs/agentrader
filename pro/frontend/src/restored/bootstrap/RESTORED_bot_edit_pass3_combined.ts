// @generated Minifryer Unfry bot-edit passes 1–3

// evidence: index-DTKnr6h1.js



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

/** @evidence index-DTKnr6h1.js:248539 T5e = {} */
export const EMPTY_STRATEGY_PARAMS = {};

/** @evidence index-DTKnr6h1.js:248563 */
import { createContext } from "react";
export const StrategyParamsContext = createContext(undefined);

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

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248595
 * mangled: oO → joinParamPath
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function joinParamPath(basePath, name) {

    return { path: c ? `${c}.${e}` : e };

}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248603
 * mangled: qk → defaultValuesFromSchema
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function defaultValuesFromSchema(schema) {

    function e(t) {
      if (t.default !== undefined) return t.default;
      if (t.type === "object" && t.properties) {
        const s = {};
        for (const [i, n] of Object.entries(t.properties)) s[i] = e(n);
        return s;
      }
      if (t.type === "array" && t.items) return [e(t.items)];
      if (t.type === "string" || t.type === "number") return "";
    }
    return e(c);

}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248617
 * mangled: zN → isObjectSchema
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function isObjectSchema(schema) {
  return "type" in c && c.type === "object" && "properties" in c && !!c.properties
}

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

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:249257
 * mangled: KN → jsonSchemaToZod
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function jsonSchemaToZod(schema) {

    const e = J5e(c, { module: "none" });
    return new Function("z", `return ${e}`)(xse);

}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:249253
 * mangled: $z → strategyHasParams
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function strategyHasParams(strategyName, strategies) {

    const t = jsonSchemaToZod(e[c].schema);
    return t instanceof bn ? Object.keys(t.shape).length > 0 : false;

}

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

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:249555
 * mangled: pVe → toUpdateBotInput
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function toUpdateBotInput(formValues, template, settings) {

    const {
      botId,
      botName,
      exchangeCode,
      exchangeAccountId,
      symbolId,
      timeframe,
      logging,
    } = formValues;
    const { currencyPairSymbol } = decomposeSymbolId(symbolId);
    return {
      botId,
      data: {
        name: botName,
        template,
        settings,
        timeframe,
        symbol: currencyPairSymbol,
        exchangeAccountId,
        logging,
      },
    };
}

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

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:248795
 * mangled: Gz → StrategyNoParamsMessage
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function StrategyNoParamsMessage({ strategy }) {
  return jsx(Sheet, {
        children: jsxs(Typography, { children: ["Strategy ", jsx("strong", { children: c }), " has no params"] }),
      })
}

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

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:237553
 * mangled: REe → BotSettingsForm
 * kind: arrow
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function BotSettingsForm(c) {

      const { defaultBot: e, onSubmit: t, isLoading: s, hideTimeframe: i } = c,
        n = useTRPC(),
        [r] = $f(),
        [a, o] = zl({ value: c.botName, onChange: c.onBotNameChange, initialValue: e.name }),
        [d, u] = zl({ value: c.timeframe, onChange: c.onTimeframeChange, initialValue: e.timeframe }),
        [l, h] = zl({ value: c.logging, onChange: c.onLoggingChange, initialValue: e.logging }),
        { data: f } = useQuery(n.exchangeAccount.getOne.queryOptions(e.exchangeAccountId)),
        [p, m] = zl({ value: c.exchangeAccount, onChange: c.onExchangeAccountChange, initialValue: f }),
        g = BI(p.exchangeCode, RI(e.symbol), NI(e.symbol)),
        { data: y } = useQuery(n.symbol.getOne.queryOptions({ symbolId: g, isDemoAccount: p.isDemoAccount })),
        [b, k] = zl({ value: c.symbol, onChange: c.onSymbolChange, initialValue: y });
      Vy(p.exchangeCode) && k(y);
      const T = () => {
          t({
            botId: e.id,
            botName: a,
            exchangeAccountId: p.id,
            exchangeCode: p.exchangeCode,
            symbolId: b.symbolId,
            timeframe: d,
            logging: l,
          });
        },
        x = !a || !p || !b;
      return jsxs(Box, {
        sx: { display: "grid", flexWrap: 1, gap: 2 },
        children: [
          jsx(sz, { onChange: o, value: a }),
          i ? null : jsx(iz, { onChange: u, value: d }),
          jsx(tz, { value: p, onChange: m }),
          jsx(ez, { exchangeCode: p.exchangeCode, isDemoAccount: p.isDemoAccount, onChange: k, value: b }),
          r ? jsx(nz, { checked: l, onChange: h }) : null,
          jsx(Button, {
            color: "primary",
            disabled: x,
            loading: s,
            loadingPosition: "start",
            onClick: T,
            size: "lg",
            variant: "soft",
            children: "Update bot",
          }),
        ],
      });

}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:32365
 * mangled: Js → pathTo
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function pathTo(key, ...args) {

    const entry = PATHS[key];
    return typeof entry === "string" ? entry : entry.apply(null, args);
}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:32369
 * mangled: qB → BOT_TYPE_PATHS
 * kind: const
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export const BOT_TYPE_PATHS = { Bot: "bot/:id", GridBot: "grid-bot/:id", DcaBot: "dca-bot/:id" };

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:32422
 * mangled: Ud → useSnackbar
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useSnackbar() {

    return useContext(k8);

}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:10771
 * mangled: ju → useNavigate
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useNavigate(c) {

    const { navigate: e, state: t } = Wu(),
      s = _c({ strict: false, select: (i) => i.index });
    return useCallback(
      (i) => {
        const n = i.from ?? (c == null ? undefined : c.from) ?? t.matches[s].fullPath;
        return e({ ...i, from: n });
      },
      [c == null ? undefined : c.from, e],
    );

}

/**
 * RESTORED by Minifryer Unfry — bot-edit pass 3
 * @evidence index-DTKnr6h1.js:24562
 * mangled: Xo → useMutation
 * kind: function
 * provenance: derivation + explicit survivors (see LEDGER)
 */

export function useMutation(c, e) {

    const t = Zm(),
      [s] = useState(() => new Tne(t, c));
    useEffect(() => {
      s.setOptions(c);
    }, [s, c]);
    const i = React.useSyncExternalStore(
        useCallback((r) => s.subscribe(Lr.batchCalls(r)), [s]),
        () => s.getCurrentResult(),
        () => s.getCurrentResult(),
      ),
      n = useCallback(
        (r, a) => {
          s.mutate(r, a).catch(oo);
        },
        [s],
      );
    if (i.error && s6(s.options.throwOnError, [i.error])) throw i.error;
    return { ...i, mutate: n, mutateAsync: i.mutate };

}