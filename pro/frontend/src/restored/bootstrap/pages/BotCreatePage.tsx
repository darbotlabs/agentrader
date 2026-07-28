/**
 * @evidence index-DTKnr6h1.js:249349 sVe + Xz validateSearch
 * search.strategy defaults to "rsi"
 */
export function BotCreatePage() {
  const { strategy = "rsi" } = BotCreateFileRoute.useSearch();
  const trpc = useTRPC();
  const { data: strategies } = useQuery(trpc.bot.getStrategies.queryOptions());
  const schema = getStrategySchema(strategy, strategies);
  const defaults = defaultValuesFromSchema(schema);
  return jsx(ErrorBoundary, {
    children: jsx(StrategyParamsProvider, {
      initialState: defaults,
      children: jsx(BotCreateForm, { strategies, defaultStrategy: strategy }),
    }),
  });
}
