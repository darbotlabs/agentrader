/**
 * @evidence index-DTKnr6h1.js:237501
 * mangled: I3 → pickDefaultSymbol
 */
export function pickDefaultSymbol(symbols) {
  if (symbols.length === 0) throw new Error("Empty symbols array provided");
  return symbols.find((s) => s.currencyPair === "BTC/USDT") || symbols[0];
}
