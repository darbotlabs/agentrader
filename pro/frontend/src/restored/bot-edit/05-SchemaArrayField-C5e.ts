/**
 * @evidence index-DTKnr6h1.js:248657
 * mangled: C5e → SchemaArrayField
 * survivors: "array: ", "Unsupported array", "Schema missing `items`"
 */
export function SchemaArrayField({ name, basePath, schema }) {
  const { path } = joinParamPath(basePath, name);
  const arr = useStrategyParamArray(path);
  const { items } = schema;
  if (!items) {
    return jsxs("div", {
      children: ["Schema missing `items` property: ", JSON.stringify(schema)],
    });
  }
  if (!isObjectSchema(items)) {
    return jsxs("div", {
      children: ["Unsupported array `", name, "` items schema: ", JSON.stringify(schema)],
    });
  }
  return jsxs(Sheet, {
    children: [
      jsxs(Box, {
        sx: { display: "flex", justifyContent: "space-between" },
        children: [
          jsxs(Typography, {
            children: ["array: ", jsx(Typography, { level: "body-sm", children: name })],
          }),
          jsx(IconButton, {
            children: jsx(AddBoxIcon, {
              onClick: () => arr.push(defaultValuesFromSchema(items)),
            }),
          }),
        ],
      }),
      ...Array.from({ length: arr.length }).map((_, index) =>
        jsx(
          SchemaObjectFields,
          {
            action: jsx(IconButton, {
              onClick: () => arr.remove(index),
              children: jsx(DeleteIcon, {}),
            }),
            basePath,
            name: `${name}[${index}]`,
            schema: items,
          },
          index,
        ),
      ),
    ],
  });
}
