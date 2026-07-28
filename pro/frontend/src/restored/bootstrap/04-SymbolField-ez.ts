/**
 * @evidence index-DTKnr6h1.js:237446
 * mangled: ez → SymbolField
 * survivor: "Symbol"
 */
export function SymbolField({ value, onChange, exchangeCode, isDemoAccount }) {
  return jsxs(FormControl, {
    children: [
      jsx(FormLabel, { children: "Symbol" }),
      jsx(SymbolSelect, {
        exchangeCode,
        isDemoAccount,
        onChange: (next) => {
          if (next) onChange(next);
        },
        value,
      }),
    ],
  });
}
