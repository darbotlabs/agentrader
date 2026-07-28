/**
 * Pro shell with live health strip for reliability / traceability.
 */
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Box,
  Chip,
  CssVarsProvider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
  extendTheme,
} from "@mui/joy";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import { COPY, PATHS } from "@/lib/contracts";
import { fetchHealth, type AgentTraderHealth } from "@/lib/health";

const theme = extendTheme({ cssVarPrefix: "joy" });

const nav = [
  { label: COPY.bots, to: PATHS.botIndex, icon: <CandlestickChartIcon /> },
  { label: COPY.strategies, to: PATHS.strategies, icon: <AutoAwesomeIcon /> },
  { label: COPY.exchangeAccounts, to: PATHS.accounts, icon: <AccountBalanceIcon /> },
  { label: COPY.settings, to: PATHS.settings, icon: <SettingsIcon /> },
] as const;

function formatUptime(sec?: number): string {
  if (sec == null || Number.isNaN(sec)) return "—";
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m`;
  return `${Math.floor(sec / 3600)}h${Math.floor((sec % 3600) / 60)}m`;
}

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [health, setHealth] = useState<AgentTraderHealth | null>(null);
  const [healthOk, setHealthOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const h = await fetchHealth();
      if (cancelled) return;
      setHealth(h);
      setHealthOk(Boolean(h?.ok));
    };
    void tick();
    const id = window.setInterval(tick, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sheet
          variant="soft"
          sx={{
            width: 240,
            p: 2,
            borderRight: "1px solid",
            borderColor: "divider",
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
          }}
        >
          <Typography level="title-lg" sx={{ mb: 0.5 }}>
            agentrader
          </Typography>
          <Typography level="body-xs" sx={{ mb: 2, opacity: 0.7 }}>
            pro · self-hosted · open
          </Typography>
          <List size="sm" sx={{ gap: 0.5, flex: 1 }}>
            {nav.map((item) => {
              const active =
                pathname === item.to ||
                pathname.startsWith(item.to.replace(/\/$/, ""));
              return (
                <ListItem key={item.to}>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    selected={active}
                    sx={{ borderRadius: "sm" }}
                  >
                    {item.icon}
                    <ListItemContent>{item.label}</ListItemContent>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box sx={{ mt: 2, display: "grid", gap: 0.5 }}>
            <Chip
              size="sm"
              variant="soft"
              color={healthOk === true ? "success" : healthOk === false ? "danger" : "neutral"}
            >
              {healthOk === true
                ? `API up · ${formatUptime(health?.uptimeSec)}`
                : healthOk === false
                  ? "API down"
                  : "API…"}
            </Chip>
            {health?.version && (
              <Typography level="body-xs" sx={{ opacity: 0.65 }}>
                v{health.version}
                {health.openAccess !== false ? " · open" : " · auth"}
              </Typography>
            )}
            {health?.requestCount != null && (
              <Typography level="body-xs" sx={{ opacity: 0.5 }}>
                reqs {health.requestCount}
              </Typography>
            )}
          </Box>
        </Sheet>
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
