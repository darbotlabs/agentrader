/**
 * @evidence index-DTKnr6h1.js:43700 awe
 * survivors: "App settings", Backend URL field, Developer mode, Logout
 */
export function SettingsPage() {
  return jsx(Grid, {
    container: true,
    children: jsxs(Box, {
      sx: { display: "grid", gap: 2 },
      children: [
        jsx(Typography, { level: "h3", children: "App settings" }),
        jsx(BackendUrlSetting, {}),
        jsx(DeveloperModeSetting, {}),
        jsx(LogoutButton, {}),
      ],
    }),
  });
}
