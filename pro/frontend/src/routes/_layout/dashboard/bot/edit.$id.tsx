/** @evidence index-DTKnr6h1.js:249634 Yz + gVe */
import { createRoute } from "@tanstack/react-router";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { BotEditPage } from "@/features/bot-edit/BotEditPage";

function BotEditRoutePage() {
  const { id } = Route.useParams();
  return (
    <Page title={`Edit bot ${id}`}>
      <BotEditPage botId={Number(id)} />
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/bot/edit/$id",
  component: BotEditRoutePage,
});
