/**
 * @evidence index-DTKnr6h1.js:237478
 * mangled: sz → BotNameField
 * survivors: "Bot name", "Must be defined"
 */
export function BotNameField({ value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);
  const handleRegen = () => onChange(generateBotName());
  const error = value.length === 0 ? "Must be defined" : null;
  return jsxs(FormControl, {
    error: !!error,
    children: [
      jsx(FormLabel, { children: "Bot name" }),
      jsx(Input, {
        endDecorator: jsx(IconButton, { onClick: handleRegen, children: jsx(ReplayIcon, {}) }),
        onChange: handleChange,
        value,
      }),
      error ? jsx(FormHelperText, { children: error }) : null,
    ],
  });
}
