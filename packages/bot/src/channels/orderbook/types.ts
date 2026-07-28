import type { ExchangeCode, IOrderbook, MarketId } from "@agentrader/types";

export type OrderbookEvent = {
  exchangeCode: ExchangeCode;
  marketId: MarketId;
  isDemoMarket: boolean;
  symbol: string;
  orderbook: IOrderbook;
};
