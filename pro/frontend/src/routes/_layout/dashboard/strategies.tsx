/** Strategies gallery with schema metadata for accuracy / extensibility */
import { createRoute, Link } from "@tanstack/react-router";
import {
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import { Route as layoutRoute } from "../../_layout";
import { Page } from "@/components/Page";
import { trpc } from "@/lib/trpc";
import { COPY, PATHS } from "@/lib/contracts";

function StrategiesPage() {
  const strategies = trpc.bot.getStrategies.useQuery(undefined, { retry: false });
  const accounts = trpc.exchangeAccount.list.useQuery(undefined, { retry: false });

  const items: any[] = strategies.data
    ? Object.values(strategies.data).filter((s: any) => !s.hidden)
    : [
        { name: "grid", displayName: COPY.gridBot, description: "Grid trading template" },
        { name: "dca", displayName: COPY.dcaBot, description: "Dollar-cost average entries" },
        { name: "rsi", displayName: "RSI", description: "RSI threshold strategy" },
      ];

  return (
    <Page title={COPY.strategies}>
      {strategies.isLoading && <CircularProgress />}
      {strategies.error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {strategies.error.message}
        </Alert>
      )}
      {!accounts.data?.length && !accounts.isLoading && !accounts.error && (
        <Alert color="warning" sx={{ mb: 2 }}>
          Add an exchange account before creating live bots. Paper/backtest paths still work
          once configured.
        </Alert>
      )}
      <Alert color="neutral" variant="soft" sx={{ mb: 2 }}>
        Prefer strategies with clear run policy and required history. Custom/LLM strategies
        appear when loaded via CUSTOM_STRATEGIES_PATH (isCustom badge).
      </Alert>
      <Grid container spacing={2}>
        {items.map((s: any) => {
          const name = s.name || s.displayName;
          const label = s.displayName || s.name;
          const to =
            String(name).includes("grid") || label === COPY.gridBot
              ? PATHS.gridCreate
              : String(name).includes("dca") || label === COPY.dcaBot
                ? PATHS.dcaCreate
                : PATHS.botCreate;
          return (
            <Grid key={name} xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography level="title-md">{label}</Typography>
                    {s.isCustom && (
                      <Chip size="sm" color="primary" variant="soft">
                        custom
                      </Chip>
                    )}
                  </Stack>
                  <Typography level="body-sm" sx={{ mb: 1, opacity: 0.8 }}>
                    {s.description || name}
                  </Typography>
                  <Typography level="body-xs" sx={{ mb: 1, opacity: 0.55 }}>
                    {s.runPolicy ? `run: ${JSON.stringify(s.runPolicy)}` : "run: default"}
                    {s.requiredHistory != null ? ` · history ${s.requiredHistory}` : ""}
                  </Typography>
                  <Link
                    to={to}
                    search={to === PATHS.botCreate ? { strategy: name } : undefined}
                  >
                    Create bot
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/strategies",
  component: StrategiesPage,
});
