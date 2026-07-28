/**
 * @evidence index-DTKnr6h1.js:236466
 * mangled: oS → TimeframeSelect
 * survivors: "<None>"
 */
export function TimeframeSelect({ value, onChange, whitelist, optional }) {
  const options = whitelist || Object.values(Timeframe);
  return jsxs(Select, {
    onChange: (_e, next) => onChange(next),
    required: true,
    value,
    children: [
      optional ? jsx(Option, { value: null, children: "<None>" }) : null,
      ...options.map((tf) => jsx(Option, { value: tf, children: tf || "<None>" }, tf)),
    ],
  });
}
