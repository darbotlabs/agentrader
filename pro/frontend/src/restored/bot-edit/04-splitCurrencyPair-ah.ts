/**
 * @evidence index-DTKnr6h1.js:21628
 * mangled: ah → splitCurrencyPair
 */
export function splitCurrencyPair(pair) {
  const [baseCurrency = "NONE", quoteCurrency = "NONE"] = pair.split("/");
  return { baseCurrency, quoteCurrency };
}
