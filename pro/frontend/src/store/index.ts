import { configureStore } from "@reduxjs/toolkit";
import { gridBotFormReducer } from "./gridBotForm";
import { dcaBotFormReducer } from "./dcaBotForm";

export const store = configureStore({
  reducer: {
    gridBotForm: gridBotFormReducer,
    dcaBotForm: dcaBotFormReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
