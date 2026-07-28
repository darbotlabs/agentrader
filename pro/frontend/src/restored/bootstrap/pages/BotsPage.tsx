/**
 * @evidence index-DTKnr6h1.js:47354 jke
 * empty exchange accounts → empty state; else toolbar + bot list
 */
export function BotsPage() {
  const trpc = useTRPC();
  const { data: accounts } = useQuery(trpc.exchangeAccount.list.queryOptions());
  if (accounts.length === 0) return jsx(NoExchangeAccountsState, {});
  return jsxs(Grid, {
    container: true,
    spacing: 4,
    children: [
      jsx(Grid, { xs: 12, children: jsx(Box, { display: "flex", gap: 1, children: jsx(BotsToolbar, {}) }) }),
      jsx(Grid, {
        xs: 12,
        children: jsx(Suspense, {
          fallback: jsx(BotsListSkeleton, {}),
          children: jsx(BotsList, {}),
        }),
      }),
    ],
  });
}
