/** @evidence index-DTKnr6h1.js:249353 Xz validateSearch + sVe */
import { createRoute, Link } from "@tanstack/react-router";
import { Stack, Typography } from "@mui/joy";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { PATHS } from "@/lib/contracts";

function BotCreatePage() {
  const { strategy } = Route.useSearch();
  return (
    <Page title="Create bot">
      <Stack spacing={1}>
        <Typography>
          Template strategy: <strong>{strategy ?? "rsi"}</strong>
        </Typography>
        <Typography level="body-sm">
          Prefer dedicated strategy flows restored from pro dist:
        </Typography>
        <Link to={PATHS.gridCreate}>Grid Bot create</Link>
        <Link to={PATHS.dcaCreate}>DCA Bot create</Link>
        <Typography level="body-sm" sx={{ mt: 2 }}>
          Generic template create uses bot.create with strategy params (see restored
          BotCreateForm / tVe). Wire full form in a follow-up pass.
        </Typography>
      </Stack>
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/bot/create",
  validateSearch: (search: Record<string, unknown>) => ({
    strategy: typeof search.strategy === "string" ? search.strategy : undefined,
  }),
  component: BotCreatePage,
});
