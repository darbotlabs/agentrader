/**
 * RESTORED by Minifryer Unfry — bot edit page (gVe + chases)
 * @evidence index-DTKnr6h1.js:249624
 * gVe → DashboardBotEditIdPage
 * qT → ErrorBoundary | Vz → StrategyParamsProvider | mVe → BotEditForm
 */

import { createFileRoute } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
// useTRPC, ErrorBoundary, StrategyParamsProvider, BotEditForm — same unit / adjacent restores

export const DashboardBotEditIdRoute = createFileRoute("/_layout/dashboard/bot/edit/$id")({
  component: DashboardBotEditIdPage,
});

export function DashboardBotEditIdPage() {
  const { id } = DashboardBotEditIdRoute.useParams();
  const botId = Number(id);
  const trpc = useTRPC();
  const { data: strategies } = useQuery(trpc.bot.getStrategies.queryOptions());
  const { data: bot } = useQuery(trpc.bot.getOne.queryOptions(botId));
  return jsx(ErrorBoundary, {
    children: jsx(StrategyParamsProvider, {
      initialState: bot.settings,
      children: jsx(BotEditForm, { bot, strategies }),
    }),
  });
}
