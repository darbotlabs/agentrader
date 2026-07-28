import type { OrderWithSmartTrade } from "@agentrader/db";
import type { ExchangeCode, IWatchOrder } from "@agentrader/types";

export type OrderEventType = "onFilled" | "onCanceled" | "onPlaced";

export type Subscription = {
  event: OrderEventType;
  callback: (
    exchangeOrder: IWatchOrder,
    order: OrderWithSmartTrade,
    exchangeCode: ExchangeCode,
    isDemoMarket: boolean,
  ) => void;
};
