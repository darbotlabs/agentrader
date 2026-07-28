/**
 * @evidence index-DTKnr6h1.js:237499
 * mangled: nz → LoggingSwitch
 * survivor: "Enabled Logging"
 */
export function LoggingSwitch({ checked, onChange }) {
  return jsx(Switch, {
    checked,
    label: "Enabled Logging",
    onChange: (e) => onChange(e.target.checked),
  });
}
