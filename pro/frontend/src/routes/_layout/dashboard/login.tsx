/**
 * Self-hosted AgentTrader: login is optional.
 * Default path is open access — password only if the daemon runs with AGENTTRADER_REQUIRE_AUTH.
 */
import { createRoute, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { Route as layoutRoute } from "../../_layout";
import { COPY, DEFAULTS, PATHS } from "@/lib/contracts";
import { getAppUrl, setAdminPassword, setAppUrl, clearSession } from "@/lib/storage";

function LoginPage() {
  const navigate = useNavigate();
  const [backend, setBackend] = useState(getAppUrl());
  const [username, setUsername] = useState<string>(DEFAULTS.username);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const enterOpen = () => {
    setAppUrl(backend);
    clearSession();
    navigate({ to: PATHS.botIndex });
  };

  const onLogin = async () => {
    setError(null);
    setBusy(true);
    setAppUrl(backend);
    try {
      // Probe API open access first
      const healthUrl = `${backend.replace(/\/$/, "")}/api/health`;
      let openMode = true;
      try {
        const health = await fetch(healthUrl);
        if (health.ok) {
          const body = (await health.json()) as { authRequired?: boolean };
          openMode = !body.authRequired;
        }
      } catch {
        // health optional on older daemons
      }

      if (openMode && !password) {
        clearSession();
        navigate({ to: PATHS.botIndex });
        return;
      }

      if (password) {
        setAdminPassword(password);
      } else {
        clearSession();
      }

      // Verify bots list works (works open or with correct password)
      const probe = await fetch(
        `${backend.replace(/\/$/, "")}/api/trpc/bot.list`,
        {
          headers: password ? { Authorization: password } : {},
        },
      );
      if (!probe.ok) {
        const text = await probe.text();
        if (text.includes("UNAUTHORIZED") || probe.status === 401) {
          setError("Password required or incorrect for this daemon.");
          setBusy(false);
          return;
        }
      }
      navigate({ to: PATHS.botIndex });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cannot reach backend");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: 360,
        mx: "auto",
        my: 6,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <Typography component="h1" level="h4">
        {COPY.welcome}
      </Typography>
      <Typography level="body-sm">
        Self-hosted AgentTrader is open by default. No account required.
      </Typography>
      <Alert color="success" variant="soft">
        Open access · pro UI native · LLM-driven strategies welcome
      </Alert>
      {error && <Alert color="danger">{error}</Alert>}
      <FormControl>
        <FormLabel>{COPY.backendUrl}</FormLabel>
        <Input value={backend} onChange={(e) => setBackend(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>{COPY.username}</FormLabel>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="optional"
        />
      </FormControl>
      <FormControl>
        <FormLabel>{COPY.password} (only if auth locked)</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") void onLogin();
          }}
          placeholder="leave empty for open access"
        />
      </FormControl>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => void onLogin()} loading={busy} sx={{ flex: 1 }}>
          Continue
        </Button>
        <Button variant="outlined" color="neutral" onClick={enterOpen} sx={{ flex: 1 }}>
          Enter open
        </Button>
      </Stack>
    </Sheet>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/login",
  component: LoginPage,
});
