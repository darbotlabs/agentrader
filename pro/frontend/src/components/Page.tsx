import type { ReactNode } from "react";
import { Box, Typography } from "@mui/joy";

export function Page({
  title,
  children,
  actions,
}: {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <Typography level="h2" sx={{ flex: 1 }}>
          {title}
        </Typography>
        {actions}
      </Box>
      {children}
    </Box>
  );
}
