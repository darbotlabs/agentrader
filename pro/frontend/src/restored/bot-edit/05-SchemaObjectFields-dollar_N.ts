/**
 * @evidence index-DTKnr6h1.js:248731
 * mangled: $N → SchemaObjectFields
 * dispatches properties to array/object/string/number/boolean/enum fields
 */
export function SchemaObjectFields({ name, basePath, schema, action, root }) {
  const { path } = joinParamPath(basePath, name);
  const children = Object.entries(schema.properties).flatMap(([key, propSchema]) => {
    if (!("type" in propSchema)) return null;
    if (isArraySchema(propSchema)) {
      return jsx(SchemaArrayField, { basePath: path, name: key, schema: propSchema }, key);
    }
    if (isObjectSchema(propSchema)) {
      return jsx(SchemaObjectFields, { basePath: path, name: key, schema: propSchema }, key);
    }
    if (propSchema.type === "string") {
      if ("enum" in propSchema) {
        return jsx(SchemaEnumField, { basePath: path, name: key, schema: propSchema }, key);
      }
      return jsx(SchemaTextField, { basePath: path, name: key, schema: propSchema }, key);
    }
    if (propSchema.type === "number") {
      return jsx(SchemaTextField, { basePath: path, name: key, schema: propSchema }, key);
    }
    if (propSchema.type === "boolean") {
      return jsx(SchemaBooleanField, { basePath: path, name: key, schema: propSchema }, key);
    }
    return jsxs("div", { children: ["Unsupported schema: ", JSON.stringify(propSchema)] }, key);
  });
  if (root) {
    return jsx(Box, { sx: { display: "grid", gap: 2, flexWrap: "wrap" }, children });
  }
  return jsxs(Sheet, {
    children: [
      jsxs(Box, {
        sx: { display: "flex", justifyContent: "space-between" },
        children: [
          jsxs(Typography, {
            children: ["object: ", jsx(Typography, { level: "body-sm", children: name })],
          }),
          action,
        ],
      }),
      children,
    ],
  });
}
