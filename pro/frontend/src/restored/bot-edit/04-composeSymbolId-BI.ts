/**
 * @evidence index-DTKnr6h1.js:21613
 * mangled: BI → composeSymbolId
 */
export function composeSymbolId(exchangeCode, base, quote) {
  return `${exchangeCode.toUpperCase()}:${base}/${quote}`;
}
