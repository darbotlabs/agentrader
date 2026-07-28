/** @evidence index-DTKnr6h1.js:47354 jke — hardened empty/error paths */
import { createRoute, Link } from "@tanstack/react-router";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { trpc } from "@/lib/trpc";
import { useSnackbar } from "@/lib/snackbar";
import { COPY, PATHS } from "@/lib/contracts";
import { pathTo } from "@/lib/paths";

function BotsPage() {
  const { showSnackbar } = useSnackbar();
  const accounts = trpc.exchangeAccount.list.useQuery(undefined, {
    retry: false,
    refetchInterval: 15_000,
  });
  const bots = trpc.bot.list.useQuery(undefined, {
    retry: false,
    refetchInterval: 5_000,
  });
  const start = trpc.bot.start.useMutation({
    onSuccess: () => {
      showSnackbar("Bot has been enabled");
      bots.refetch();
    },
    onError: (e: any) => showSnackbar(e?.message || "Start failed"),
  });
  const stop = trpc.bot.stop.useMutation({
    onSuccess: () => {
      showSnackbar("Bot has been stopped");
      bots.refetch();
    },
    onError: (e: any) => showSnackbar(e?.message || "Stop failed"),
  });

  if (accounts.isLoading || bots.isLoading) {
    return <CircularProgress sx={{ m: 2 }} />;
  }

  const hardError = accounts.error || bots.error;
  if (hardError && !bots.data && !accounts.data) {
    return (
      <Page title={COPY.bots}>
        <Alert color="danger">
          {hardError.message}
          {String(hardError.message).includes("UNAUTHORIZED")
            ? " — rebuild/restart daemon with open self-hosted defaults."
            : " — check API health in the sidebar."}
        </Alert>
      </Page>
    );
  }

  if (accounts.data && accounts.data.length === 0) {
    return (
      <Page title={COPY.bots}>
        <Alert color="warning" sx={{ mb: 2 }}>
          No exchange accounts yet. Add one to create live bots (paper/demo keys preferred first).
        </Alert>
        <Button component={Link} to={PATHS.accounts} variant="solid">
          Add exchange account
        </Button>
      </Page>
    );
  }

  return (
    <Page
      title={COPY.bots}
      actions={
        <Stack direction="row" spacing={1}>
          <Button component={Link} to={PATHS.gridCreate} variant="solid">
            Grid bot
          </Button>
          <Button component={Link} to={PATHS.dcaCreate} variant="outlined">
            DCA bot
          </Button>
          <Button component={Link} to={PATHS.botCreate} variant="plain">
            Template bot
          </Button>
        </Stack>
      }
    >
      {bots.error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {bots.error.message}
        </Alert>
      )}
      {bots.data && bots.data.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Template</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {bots.data.map((b: any) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.template || b.type || "—"}</td>
                <td>
                  <Typography
                    color={b.enabled ? "success" : "neutral"}
                    level="body-sm"
                  >
                    {b.enabled ? "running" : "stopped"}
                  </Typography>
                </td>
                <td>
                  <Stack direction="row" spacing={0.5}>
                    <Button
                      size="sm"
                      loading={start.isPending}
                      disabled={!!b.enabled}
                      onClick={() => start.mutate(b.id)}
                    >
                      Start
                    </Button>
                    <Button
                      size="sm"
                      color="neutral"
                      loading={stop.isPending}
                      disabled={!b.enabled}
                      onClick={() => stop.mutate(b.id)}
                    >
                      Stop
                    </Button>
                    <Button size="sm" variant="plain" component={Link} to={pathTo("botId", b.id)}>
                      Open
                    </Button>
                    <Button
                      size="sm"
                      variant="outlined"
                      component={Link}
                      to={pathTo("botEdit", b.id)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {bots.data?.length === 0 && (
        <Alert color="neutral" variant="soft">
          No bots yet. Create a Grid or DCA bot to start paper/live execution. Use Strategies
          for template metadata (run policy, history needs).
        </Alert>
      )}
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/bot",
  component: BotsPage,
});
