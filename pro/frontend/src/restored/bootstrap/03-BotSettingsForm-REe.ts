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