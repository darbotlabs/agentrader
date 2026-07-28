/**
 * @evidence index-DTKnr6h1.js:248612
 * mangled: G3 → SchemaTextField
 * survivors: "Must be defined", path tooltip
 */
export function SchemaTextField({ name, basePath, schema }) {
  const { path } = joinParamPath(basePath, name);
  const [value, setValue] = useStrategyParam(path);
  const isNumber = "type" in schema && (schema.type === "number" || schema.type === "integer");
  const [text, setText] = useState(String(value ?? ""));
  useEffect(() => setText(String(value ?? "")), [value]);
  const onBlur = () => {
    if (text.length === 0) {
      setValue("");
      return;
    }
    if (isNumber) {
      if (!isNaN(Number(text))) setValue(Number(text));
      else setText(String(value ?? ""));
    } else setValue(text);
  };
  const error = text.length === 0 ? "Must be defined" : "";
  if (!("type" in schema)) {
    return jsxs("div", { children: ["Unsupported input: ", JSON.stringify(schema)] });
  }
  return jsxs(FormControl, {
    error: !!error,
    children: [
      jsxs(FormLabel, { children: [name, /* path tooltip gap: Tooltip+Code icon */] }),
      jsx(Input, { onBlur, onChange: (e) => setText(e.target.value), value: text }),
      error
        ? jsx(FormHelperText, { children: error })
        : schema.description
          ? jsx(FormHelperText, { children: schema.description })
          : null,
    ],
  });
}
