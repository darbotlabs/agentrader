/**
 * @evidence index-DTKnr6h1.js:237460
 * mangled: tz → ExchangeField
 * survivor: "Exchange"
 */
export function ExchangeField({ value, onChange }) {
  return jsxs(FormControl, {
    children: [
      jsx(FormLabel, { children: "Exchange" }),
      jsx(ExchangeAccountSelect, {
        onChange: (next) => {
          if (next) onChange(next);
        },
        value,
      }),
    ],
  });
}
