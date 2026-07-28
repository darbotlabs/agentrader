/** @evidence index-DTKnr6h1.js:243636 m5e */
import { createRoute, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Switch,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { Route as layoutRoute } from "../../../_layout";
import { Page } from "@/components/Page";
import { dcaBotFormActions, selectDcaBotForm } from "@/store/dcaBotForm";
import type { RootState } from "@/store";
import { trpc } from "@/lib/trpc";
import { useSnackbar } from "@/lib/snackbar";
import { COPY } from "@/lib/contracts";
import { pathTo } from "@/lib/paths";

function DcaBotCreatePage() {
  const dispatch = useDispatch();
  const form = useSelector((s: RootState) => selectDcaBotForm(s));
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const create = trpc.dcaBot.create.useMutation({
    onSuccess(data: any) {
      showSnackbar(COPY.botCreated);
      setTimeout(() => navigate({ to: pathTo("dcaId", data.id) }), 1000);
    },
  });

  return (
    <Page title={`Create ${COPY.dcaBot}`}>
      {create.error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {create.error.message}
        </Alert>
      )}
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <FormControl>
          <FormLabel>{COPY.botName}</FormLabel>
          <Input
            value={form.botName}
            onChange={(e) => dispatch(dcaBotFormActions.setBotName(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Exchange account id</FormLabel>
          <Input
            type="number"
            value={form.exchangeAccountId ?? ""}
            onChange={(e) =>
              dispatch(
                dcaBotFormActions.setExchangeAccountId(
                  e.target.value === "" ? null : Number(e.target.value),
                ),
              )
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Symbol id</FormLabel>
          <Input
            value={form.symbolId}
            onChange={(e) => dispatch(dcaBotFormActions.setSymbolId(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Entry quantity</FormLabel>
          <Input
            value={form.entryOrderQuantity}
            onChange={(e) =>
              dispatch(dcaBotFormActions.setEntryOrderQuantity(e.target.value))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Take profit %</FormLabel>
          <Input
            value={form.takeProfitPercent}
            onChange={(e) =>
              dispatch(dcaBotFormActions.setTakeProfitPercent(e.target.value))
            }
          />
        </FormControl>
        <FormControl orientation="horizontal" sx={{ justifyContent: "space-between" }}>
          <FormLabel>Stop loss enabled</FormLabel>
          <Switch
            checked={form.stopLossEnabled}
            onChange={(e) =>
              dispatch(dcaBotFormActions.setStopLossEnabled(e.target.checked))
            }
          />
        </FormControl>
        <Button
          loading={create.isPending}
          disabled={form.exchangeAccountId == null}
          onClick={() => {
            const symbol = form.symbolId.includes(":")
              ? form.symbolId.split(":").slice(1).join(":")
              : form.symbolId;
            create.mutate({
              exchangeAccountId: form.exchangeAccountId,
              data: {
                name: form.botName,
                symbol,
                settings: {
                  entry: {
                    type: form.entryOrderType,
                    quantity: Number(form.entryOrderQuantity) || 0,
                    conditions: [],
                  },
                  tp: { percent: Number(form.takeProfitPercent) || 0 },
                  sl: form.stopLossEnabled
                    ? { percent: Number(form.stopLossPercent) || 0 }
                    : undefined,
                  safetyOrders: form.safetyOrders,
                },
              },
            });
          }}
        >
          {COPY.create}
        </Button>
      </Stack>
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/dca-bot/create",
  component: DcaBotCreatePage,
});
