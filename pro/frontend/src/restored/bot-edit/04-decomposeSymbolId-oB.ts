/**
 * @evidence index-DTKnr6h1.js:21622
 * mangled: oB → decomposeSymbolId
 */
export function decomposeSymbolId(symbolId) {
  if (!isValidSymbolId(symbolId)) throw new Error(`${symbolId} is not a valid symbolId`);
  const [exchangePart, pairPart, rest] = symbolId.split(":");
  // production uses exchange code map + BASE/QUOTE split
  const [baseCurrency, quoteCurrency] = pairPart.split("/");
  return {
    exchangeCode: exchangePart,
    currencyPairSymbol: rest ? pairPart + ":" + rest : pairPart,
    baseCurrency,
    quoteCurrency,
  };
}
