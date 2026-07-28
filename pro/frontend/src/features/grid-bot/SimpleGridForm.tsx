/**
 * Grid create/edit form — payload shape from page-B7EduWBL.js
 * @evidence page-B7EduWBL.js + SimpleGridForm chunk
 */
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import {
  gridBotFormActions,
  selectGridBotForm,
  toCreateGridBotInput,
  type GridLine,
} from "@/store/gridBotForm";
import type { RootState } from "@/store";
import { COPY } from "@/lib/contracts";

function buildGridLines(
  low: number,
  high: number,
  levels: number,
  qty: number,
): GridLine[] {
  if (!(low > 0 && high > low && levels >= 2)) return [];
  const step = (high - low) / (levels - 1);
  return Array.from({ length: levels }, (_, i) => ({
    price: Number((low + step * i).toFixed(8)),
    quantity: qty,
  }));
}

export function SimpleGridForm({
  onSubmit,
  isPending,
  submitLabel = COPY.create,
}: {
  onSubmit: (input: ReturnType<typeof toCreateGridBotInput>) => void;
  isPending?: boolean;
  submitLabel?: string;
}) {
  const dispatch = useDispatch();
  const form = useSelector((s: RootState) => selectGridBotForm(s));

  const recompute = (patch: Partial<typeof form> = {}) => {
    const next = { ...form, ...patch };
    const low = Number(next.lowPrice);
    const high = Number(next.highPrice);
    const qty = Number(next.quantityPerGrid);
    dispatch(
      gridBotFormActions.setGridLines(
        buildGridLines(low, high, next.gridLinesNumber, qty || 0),
      ),
    );
  };

  return (
    <Stack spacing={2}>
      <Typography level="title-md">Simple grid</Typography>
      <FormControl>
        <FormLabel>{COPY.botName}</FormLabel>
        <Input
          value={form.botName}
          onChange={(e) => dispatch(gridBotFormActions.setBotName(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Exchange account id</FormLabel>
        <Input
          type="number"
          value={form.exchangeAccountId ?? ""}
          onChange={(e) =>
            dispatch(
              gridBotFormActions.setExchangeAccountId(
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
          onChange={(e) => dispatch(gridBotFormActions.setSymbolId(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Low price</FormLabel>
        <Input
          value={form.lowPrice}
          onChange={(e) => {
            dispatch(gridBotFormActions.setLowPrice(e.target.value));
            recompute({ lowPrice: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>High price</FormLabel>
        <Input
          value={form.highPrice}
          onChange={(e) => {
            dispatch(gridBotFormActions.setHighPrice(e.target.value));
            recompute({ highPrice: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Grid levels</FormLabel>
        <Input
          type="number"
          value={form.gridLinesNumber}
          onChange={(e) => {
            const n = Number(e.target.value) || 2;
            dispatch(gridBotFormActions.setGridLinesNumber(n));
            recompute({ gridLinesNumber: n });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Quantity per grid</FormLabel>
        <Input
          value={form.quantityPerGrid}
          onChange={(e) => {
            dispatch(gridBotFormActions.setQuantityPerGrid(e.target.value));
            recompute({ quantityPerGrid: e.target.value });
          }}
        />
      </FormControl>
      <Typography level="body-sm">Grid lines: {form.gridLines.length}</Typography>
      <Button
        variant="outlined"
        color="primary"
        loading={isPending}
        disabled={isPending || form.exchangeAccountId == null}
        onClick={() => onSubmit(toCreateGridBotInput(form))}
      >
        {submitLabel}
      </Button>
    </Stack>
  );
}

export default SimpleGridForm;
