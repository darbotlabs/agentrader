/**
 * @evidence index-DTKnr6h1.js:237495
 * mangled: iz → TimeframeField
 * survivor: "Timeframe"
 */
export function TimeframeField({ value, onChange }) {
  return jsxs(FormControl, {
    children: [
      jsx(FormLabel, { children: "Timeframe" }),
      jsx(TimeframeSelect, { onChange, optional: true, value }),
    ],
  });
}
