/**
 * @evidence index-DTKnr6h1.js:43651 twe
 * lists strategies from bot.getStrategies + exchangeAccount.list
 */
export function StrategiesPage() {
  const trpc = useTRPC();
  const { data: accounts } = useQuery(trpc.exchangeAccount.list.queryOptions());
  const { data: strategies } = useQuery(trpc.bot.getStrategies.queryOptions());
  const grouped = groupStrategies(strategies); // ewe(t)
  return jsx("div", {
    children: jsx(ErrorBoundary, {
      children: jsx(Grid, {
        md: 12,
        xs: 12,
        container: true,
        spacing: 2,
        children: Object.entries(grouped).map(([, strategy]) =>
          jsx(
            Grid,
            {
              flexGrow: 1,
              children: jsx(Sheet, {
                children: jsx(StrategyCard, {
                  strategy,
                  hasExchangeAccounts: accounts.length > 0,
                }),
              }),
            },
            strategy.name,
          ),
        ),
      }),
    }),
  });
}
