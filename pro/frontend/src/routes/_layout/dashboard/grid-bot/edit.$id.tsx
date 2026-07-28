/** @evidence index-DTKnr6h1.js:249552 page-Dps6Us_X.js */
import { createRoute, useNavigate } from "@tanstack/react-router";
import { Alert, CircularProgress, Sheet } from "@mui/joy";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { SimpleGridForm } from "@/features/grid-bot/SimpleGridForm";
import { trpc } from "@/lib/trpc";
import { gridBotFormActions } from "@/store/gridBotForm";
import { useSnackbar } from "@/lib/snackbar";
import { COPY } from "@/lib/contracts";
import { pathTo } from "@/lib/paths";

function GridBotEditPage() {
  const { id } = Route.useParams();
  const botId = Number(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const bot = trpc.gridBot.getOne.useQuery(botId, { retry: false });
  const update = trpc.gridBot.update.useMutation({
    onSuccess() {
      showSnackbar(COPY.botUpdated);
      navigate({ to: pathTo("gridId", botId) });
    },
  });

  useEffect(() => {
    if (!bot.data) return;
    dispatch(gridBotFormActions.setBotName(bot.data.name ?? COPY.gridBot));
    if (bot.data.exchangeAccountId != null) {
      dispatch(gridBotFormActions.setExchangeAccountId(bot.data.exchangeAccountId));
    }
    if (bot.data.symbol) {
      dispatch(
        gridBotFormActions.setSymbolId(
          String(bot.data.symbol).includes(":")
            ? bot.data.symbol
            : `OKX:${bot.data.symbol}`,
        ),
      );
    }
    const lines = bot.data.settings?.gridLines;
    if (Array.isArray(lines)) dispatch(gridBotFormActions.setGridLines(lines));
  }, [bot.data, dispatch]);

  return (
    <Page title={`Edit ${COPY.gridBot} ${id}`}>
      {bot.isLoading && <CircularProgress />}
      {bot.error && <Alert color="danger">{bot.error.message}</Alert>}
      {update.error && <Alert color="danger">{update.error.message}</Alert>}
      {bot.data && (
        <Sheet variant="outlined" sx={{ p: 2, maxWidth: 480, borderRadius: "md" }}>
          <SimpleGridForm
            submitLabel={COPY.updateBot}
            isPending={update.isPending}
            onSubmit={(input) =>
              update.mutate({
                id: botId,
                ...input,
              })
            }
          />
        </Sheet>
      )}
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/grid-bot/edit/$id",
  component: GridBotEditPage,
});
