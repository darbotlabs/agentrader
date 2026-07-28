/**
 * @evidence form.slice.gridBotForm + form field keys from dist
 */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COPY, DEFAULTS } from "@/lib/contracts";

export type GridLine = { price: number; quantity: number };

export type GridBotFormState = {
  botName: string;
  exchangeAccountId: number | null;
  exchangeCode: string;
  symbolId: string;
  isDemoAccount: boolean;
  highPrice: string;
  lowPrice: string;
  gridLinesNumber: number;
  quantityPerGrid: string;
  gridLines: GridLine[];
  barSize: string;
};

const initialState: GridBotFormState = {
  botName: COPY.gridBot,
  exchangeAccountId: null,
  exchangeCode: DEFAULTS.exchangeCode,
  symbolId: DEFAULTS.symbolId,
  isDemoAccount: false,
  highPrice: "",
  lowPrice: "",
  gridLinesNumber: 20,
  quantityPerGrid: "",
  gridLines: [],
  barSize: "1h",
};

const gridBotFormSlice = createSlice({
  name: "gridBotForm",
  initialState,
  reducers: {
    setBotName(state, action: PayloadAction<string>) {
      state.botName = action.payload;
    },
    setExchangeAccountId(state, action: PayloadAction<number | null>) {
      state.exchangeAccountId = action.payload;
    },
    setExchangeCode(state, action: PayloadAction<string>) {
      state.exchangeCode = action.payload;
    },
    setIsDemoAccount(state, action: PayloadAction<boolean>) {
      state.isDemoAccount = action.payload;
    },
    setSymbolId(state, action: PayloadAction<string>) {
      state.symbolId = action.payload;
    },
    setHighPrice(state, action: PayloadAction<string>) {
      state.highPrice = action.payload;
    },
    setLowPrice(state, action: PayloadAction<string>) {
      state.lowPrice = action.payload;
    },
    setQuantityPerGrid(state, action: PayloadAction<string>) {
      state.quantityPerGrid = action.payload;
    },
    setGridLines(state, action: PayloadAction<GridLine[]>) {
      state.gridLines = action.payload;
    },
    setGridLinesNumber(state, action: PayloadAction<number>) {
      state.gridLinesNumber = action.payload;
    },
    setBarSize(state, action: PayloadAction<string>) {
      state.barSize = action.payload;
    },
    resetGridBotForm() {
      return initialState;
    },
  },
});

export const gridBotFormActions = gridBotFormSlice.actions;
export const gridBotFormReducer = gridBotFormSlice.reducer;

export function selectGridBotForm(state: { gridBotForm: GridBotFormState }) {
  return state.gridBotForm;
}

/** @evidence page-B7EduWBL.js create payload */
export function toCreateGridBotInput(form: GridBotFormState) {
  if (form.exchangeAccountId == null) throw new Error("exchangeAccountId required");
  const symbol = form.symbolId.includes(":")
    ? form.symbolId.split(":").slice(1).join(":")
    : form.symbolId;
  return {
    exchangeAccountId: form.exchangeAccountId,
    data: {
      name: form.botName,
      settings: { gridLines: form.gridLines },
      symbol,
    },
  };
}
