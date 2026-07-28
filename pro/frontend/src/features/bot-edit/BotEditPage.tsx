/**
 * Native bot edit — dataflow from unfry gVe + mVe (passes 1–5).
 * @evidence index-DTKnr6h1.js:249624 gVe, 249563 mVe
 */
import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Option,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import { trpc } from "@/lib/trpc";
import { useSnackbar } from "@/lib/snackbar";
import { COPY } from "@/lib/contracts";
import { botTypeToPath } from "@/lib/paths";
import { useNavigate } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/ErrorBoundary";

type Props = { botId: number };

export function BotEditPage({ botId }: Props) {
  const trpcClient = trpc;
  const strategiesQ = trpcClient.bot.getStrategies.useQuery(undefined, { retry: false });
  const botQ = trpcClient.bot.getOne.useQuery(botId, { retry: false });

  if (botQ.isLoading || strategiesQ.isLoading) return <CircularProgress sx={{ m: 2 }} />;
  if (botQ.error) return <Alert color="danger">{botQ.error.message}</Alert>;
  if (!botQ.data) return <Alert color="warning">Bot not found</Alert>;

  return (
    <ErrorBoundary>
      <BotEditForm bot={botQ.data} strategies={strategiesQ.data ?? {}} />
    </ErrorBoundary>
  );
}

function BotEditForm({ bot, strategies }: { bot: any; strategies: any }) {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const strategyNames = useMemo(() => {
    if (Array.isArray(strategies)) {
      return strategies.map((s: any) => s.name ?? s.displayName).filter(Boolean);
    }
    return Object.keys(strategies ?? {});
  }, [strategies]);

  const [template, setTemplate] = useState(bot.template ?? strategyNames[0] ?? "grid");
  const [name, setName] = useState(bot.name ?? "");
  const [settingsJson, setSettingsJson] = useState(
    JSON.stringify(bot.settings ?? {}, null, 2),
  );

  const update = trpc.bot.update.useMutation({
    onSuccess(updated: any) {
      showSnackbar(COPY.botUpdated);
      const type = (updated?.type as "Bot" | "GridBot" | "DcaBot") || "Bot";
      setTimeout(() => {
        navigate({ to: botTypeToPath(type, updated.id ?? bot.id) });
      }, 1000);
    },
  });

  const onSubmit = () => {
    let settings: unknown = bot.settings;
    try {
      settings = JSON.parse(settingsJson);
    } catch {
      showSnackbar("Strategy params are not valid.", { color: "danger" });
      return;
    }
    update.mutate({
      botId: bot.id,
      data: {
        name,
        template,
        settings,
        symbol: bot.symbol,
        exchangeAccountId: bot.exchangeAccountId,
        timeframe: bot.timeframe,
        logging: bot.logging,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid xs={12} md={6}>
        <Typography level="h2" sx={{ mb: 1 }}>
          {COPY.strategySettings}
        </Typography>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Strategy</FormLabel>
          <Select value={template} onChange={(_, v) => setTemplate(String(v ?? template))}>
            {strategyNames.map((n: string) => (
              <Option key={n} value={n}>
                {n}
              </Option>
            ))}
          </Select>
        </FormControl>
        <Typography level="body-sm" sx={{ mb: 1 }}>
          {COPY.strategyParams}
        </Typography>
        <Box
          component="textarea"
          value={settingsJson}
          onChange={(e) => setSettingsJson(e.target.value)}
          sx={{
            width: "100%",
            minHeight: 220,
            fontFamily: "ui-monospace, monospace",
            fontSize: 12,
            p: 1,
            borderRadius: "sm",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.level1",
          }}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <Typography level="h2" sx={{ mb: 1 }}>
          {COPY.botSettings}
        </Typography>
        <Stack spacing={1.5}>
          <FormControl>
            <FormLabel>{COPY.botName}</FormLabel>
            <Box
              component="input"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              sx={{
                p: 1,
                borderRadius: "sm",
                border: "1px solid",
                borderColor: "divider",
              }}
            />
          </FormControl>
          <Typography level="body-sm">
            Exchange account: {bot.exchangeAccountId} · Symbol: {bot.symbol}
          </Typography>
          <Button
            color="primary"
            size="lg"
            variant="soft"
            loading={update.isPending}
            disabled={!name}
            onClick={onSubmit}
          >
            {COPY.updateBot}
          </Button>
          {update.error && <Alert color="danger">{update.error.message}</Alert>}
        </Stack>
      </Grid>
    </Grid>
  );
}
