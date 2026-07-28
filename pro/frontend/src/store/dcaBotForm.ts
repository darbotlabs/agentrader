import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COPY, DEFAULTS } from "@/lib/contracts";

export type SafetyOrder = { quantity: number; priceDeviation: number };

export type DcaBotFormState = {
  botName: string;
  exchangeAccountId: number | null;
  exchangeCode: string;
  symbolId: string;
  isDemoAccount: boolean;
  barSize: string;
  entryOrderType: string;
  entryOrderQuantity: string;
  takeProfitPercent: string;
  stopLossPercent: string;
  stopLossEnabled: boolean;
  safetyOrders: SafetyOrder[];
};

const initialState: DcaBotFormState = {
  botName: COPY.dcaBot,
  exchangeAccountId: null,
  exchangeCode: DEFAULTS.exchangeCode,
  symbolId: DEFAULTS.symbolId,
  isDemoAccount: false,
  barSize: "1h",
  entryOrderType: "limit",
  entryOrderQuantity: "",
  takeProfitPercent: "1",
  stopLossPercent: "5",
  stopLossEnabled: false,
  safetyOrders: [],
};

const dcaBotFormSlice = createSlice({
  name: "dcaBotForm",
  initialState,
  reducers: {
    setBotName(state, action: PayloadAction<string>) {
      state.botName = action.payload;
    },
    setExchangeAccountId(state, action: PayloadAction<number | null>) {
      state.exchangeAccountId = action.payload;
    },
    setSymbolId(state, action: PayloadAction<string>) {
      state.symbolId = action.payload;
    },
    setEntryOrderQuantity(state, action: PayloadAction<string>) {
      state.entryOrderQuantity = action.payload;
    },
    setTakeProfitPercent(state, action: PayloadAction<string>) {
      state.takeProfitPercent = action.payload;
    },
    setStopLossPercent(state, action: PayloadAction<string>) {
      state.stopLossPercent = action.payload;
    },
    setStopLossEnabled(state, action: PayloadAction<boolean>) {
      state.stopLossEnabled = action.payload;
    },
    setSafetyOrders(state, action: PayloadAction<SafetyOrder[]>) {
      state.safetyOrders = action.payload;
    },
  },
});

export const dcaBotFormActions = dcaBotFormSlice.actions;
export const dcaBotFormReducer = dcaBotFormSlice.reducer;

export function selectDcaBotForm(state: { dcaBotForm: DcaBotFormState }) {
  return state.dcaBotForm;
}
