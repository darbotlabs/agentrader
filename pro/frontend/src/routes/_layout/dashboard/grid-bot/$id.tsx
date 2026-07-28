/** @evidence index-DTKnr6h1.js:237281 J7 */
import { createRoute, Link } from "@tanstack/react-router";
import { Alert, Button, CircularProgress, Typography } from "@mui/joy";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { trpc } from "@/lib/trpc";
import { pathTo } from "@/lib/paths";

function GridBotDetailPage() {
  const { id } = Route.useParams();
  const bot = trpc.gridBot.getOne.useQuery(Number(id), { retry: false });

  return (
    <Page
      title={bot.data?.name ?? `Grid bot ${id}`}
      actions={
        <Button component={Link} to={pathTo("gridEdit", id)} size="sm">
          Edit
        </Button>
      }
    >
      {bot.isLoading && <CircularProgress />}
      {bot.error && <Alert color="danger">{bot.error.message}</Alert>}
      {bot.data && (
        <Typography component="pre" sx={{ whiteSpace: "pre-wrap", fontSize: "sm" }}>
          {JSON.stringify(bot.data, null, 2)}
        </Typography>
      )}
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/grid-bot/$id",
  component: GridBotDetailPage,
});
