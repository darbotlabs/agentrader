/**
 * @evidence index-DTKnr6h1.js:248689
 * mangled: _5e → SchemaBooleanField
 */
export function SchemaBooleanField({ name, basePath, schema }) {
  const { path } = joinParamPath(basePath, name);
  const [value, setValue] = useStrategyParam(path);
  if (!("type" in schema)) {
    return jsxs("div", { children: ["Unsupported input: ", JSON.stringify(schema)] });
  }
  return jsxs(FormControl, {
    children: [
      jsx(Switch, { label: name, checked: value, onChange: (e) => setValue(e.target.checked) }),
      jsx(FormHelperText, { children: schema.description }),
    ],
  });
}
