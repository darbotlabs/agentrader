/**
 * RESTORED by Minifryer Unfry — pass 4 refined REe
 * @evidence index-DTKnr6h1.js:237553
 * mangled: REe → BotSettingsForm
 * survivors: "Update bot"
 */
export function BotSettingsForm({
  defaultBot,
  onSubmit,
  isLoading,
  hideTimeframe,
  botName: botNameProp,
  onBotNameChange,
  timeframe: timeframeProp,
  onTimeframeChange,
  logging: loggingProp,
  onLoggingChange,
  exchangeAccount: exchangeAccountProp,
  onExchangeAccountChange,
  symbol: symbolProp,
  onSymbolChange,
}) {
  const trpc = useTRPC();
  const [devMode] = useDeveloperMode();
  const [botName, setBotName] = useControllableState({
    value: botNameProp,
    onChange: onBotNameChange,
    initialValue: defaultBot.name,
  });
  const [timeframe, setTimeframe] = useControllableState({
    value: timeframeProp,
    onChange: onTimeframeChange,
    initialValue: defaultBot.timeframe,
  });
  const [logging, setLogging] = useControllableState({
    value: loggingProp,
    onChange: onLoggingChange,
    initialValue: defaultBot.logging,
  });
  const { data: exchangeAccountData } = useQuery(
    trpc.exchangeAccount.getOne.queryOptions(defaultBot.exchangeAccountId),
  );
  const [exchangeAccount, setExchangeAccount] = useControllableState({
    value: exchangeAccountProp,
    onChange: onExchangeAccountChange,
    initialValue: exchangeAccountData,
  });
  const symbolId = composeSymbolId(
    exchangeAccount.exchangeCode,
    getBaseCurrency(defaultBot.symbol),
    getQuoteCurrency(defaultBot.symbol),
  );
  const { data: symbolData } = useQuery(
    trpc.symbol.getOne.queryOptions({
      symbolId,
      isDemoAccount: exchangeAccount.isDemoAccount,
    }),
  );
  const [symbol, setSymbol] = useControllableState({
    value: symbolProp,
    onChange: onSymbolChange,
    initialValue: symbolData,
  });
  if (useHasChanged(exchangeAccount.exchangeCode)) setSymbol(symbolData);

  const handleUpdate = () => {
    onSubmit({
      botId: defaultBot.id,
      botName,
      exchangeAccountId: exchangeAccount.id,
      exchangeCode: exchangeAccount.exchangeCode,
      symbolId: symbol.symbolId,
      timeframe,
      logging,
    });
  };
  const disabled = !botName || !exchangeAccount || !symbol;

  return jsxs(Box, {
    sx: { display: "grid", flexWrap: 1, gap: 2 },
    children: [
      jsx(BotNameField, { onChange: setBotName, value: botName }),
      hideTimeframe ? null : jsx(TimeframeField, { onChange: setTimeframe, value: timeframe }),
      jsx(ExchangeField, { value: exchangeAccount, onChange: setExchangeAccount }),
      jsx(SymbolField, {
        exchangeCode: exchangeAccount.exchangeCode,
        isDemoAccount: exchangeAccount.isDemoAccount,
        onChange: setSymbol,
        value: symbol,
      }),
      devMode ? jsx(LoggingSwitch, { checked: logging, onChange: setLogging }) : null,
      jsx(Button, {
        color: "primary",
        disabled,
        loading: isLoading,
        loadingPosition: "start",
        onClick: handleUpdate,
        size: "lg",
        variant: "soft",
        children: "Update bot",
      }),
    ],
  });
}
