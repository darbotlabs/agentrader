/** @evidence index-DTKnr6h1.js:249545 Qz */
import { createRoute, Link } from "@tanstack/react-router";
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/joy";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { trpc } from "@/lib/trpc";
import { useSnackbar } from "@/lib/snackbar";
import { pathTo } from "@/lib/paths";

function BotDetailPage() {
  const { id } = Route.useParams();
  const botId = Number(id);
  const { showSnackbar } = useSnackbar();
  const bot = trpc.bot.getOne.useQuery(botId, { retry: false });
  const start = trpc.bot.start.useMutation({
    onSuccess: () => {
      showSnackbar("Bot has been enabled");
      bot.refetch();
    },
  });
  const stop = trpc.bot.stop.useMutation({
    onSuccess: () => {
      showSnackbar("Bot has been stopped");
      bot.refetch();
    },
  });
  const logs = trpc.bot.getBotLogs.useQuery(
    { botId },
    { retry: false, enabled: Number.isFinite(botId) },
  );

  return (
    <Page
      title={bot.data?.name ?? `Bot ${id}`}
      actions={
        <Stack direction="row" spacing={1}>
          <Button size="sm" loading={start.isPending} onClick={() => start.mutate(botId)}>
            Start
          </Button>
          <Button
            size="sm"
            color="neutral"
            loading={stop.isPending}
            onClick={() => stop.mutate(botId)}
          >
            Stop
          </Button>
          <Button size="sm" variant="outlined" component={Link} to={pathTo("botEdit", id)}>
            Edit
          </Button>
        </Stack>
      }
    >
      {bot.isLoading && <CircularProgress />}
      {bot.error && <Alert color="danger">{bot.error.message}</Alert>}
      {bot.data && (
        <Typography
          component="pre"
          sx={{ whiteSpace: "pre-wrap", fontSize: "sm", mb: 2 }}
        >
          {JSON.stringify(bot.data, null, 2)}
        </Typography>
      )}
      <Typography level="title-md" sx={{ mb: 1 }}>
        Logs
      </Typography>
      {logs.data?.length ? (
        <Typography component="pre" sx={{ whiteSpace: "pre-wrap", fontSize: "sm" }}>
          {JSON.stringify(logs.data, null, 2)}
        </Typography>
      ) : (
        <Typography>No logs yet</Typography>
      )}
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/bot/$id",
  component: BotDetailPage,
});
