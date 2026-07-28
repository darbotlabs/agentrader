/**
 * @evidence index-DTKnr6h1.js:248701
 * mangled: M5e → SchemaEnumField
 */
export function SchemaEnumField({ name, basePath, schema }) {
  const { path } = joinParamPath(basePath, name);
  const [value, setValue] = useStrategyParam(path);
  const options = schema.enum;
  if (!("type" in schema)) {
    return jsxs("div", { children: ["Unsupported input: ", JSON.stringify(schema)] });
  }
  return jsxs(FormControl, {
    children: [
      jsxs(FormLabel, { children: [name /* + path tooltip */] }),
      jsx(Select, {
        value,
        onChange: (_e, next) => next !== null && setValue(next),
        children: options.map((opt) => jsx(Option, { value: opt, children: opt }, opt)),
      }),
      jsx(FormHelperText, { children: schema.description }),
    ],
  });
}
