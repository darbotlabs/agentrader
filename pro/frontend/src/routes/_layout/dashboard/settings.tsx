/** @evidence index-DTKnr6h1.js:43700 awe */
import { createRoute, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
} from "@mui/joy";
import { useState } from "react";
import { Route as layoutRoute } from "../../_layout";
import { Page } from "@/components/Page";
import { COPY, PATHS } from "@/lib/contracts";
import {
  clearSession,
  getAppUrl,
  getDeveloperMode,
  setAppUrl,
  setDeveloperMode,
} from "@/lib/storage";

function SettingsPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState(getAppUrl());
  const [dev, setDev] = useState(getDeveloperMode());

  return (
    <Page title={COPY.appSettings}>
      <Box sx={{ display: "grid", gap: 2, maxWidth: 480 }}>
        <FormControl>
          <FormLabel>{COPY.backendUrl}</FormLabel>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        </FormControl>
        <Button
          onClick={() => {
            setAppUrl(url);
          }}
        >
          Save
        </Button>
        <FormControl orientation="horizontal" sx={{ justifyContent: "space-between" }}>
          <div>
            <FormLabel>{COPY.developerMode}</FormLabel>
            <FormHelperText>For debugging and experimental features.</FormHelperText>
          </div>
          <Switch
            checked={dev}
            onChange={(e) => {
              setDev(e.target.checked);
              setDeveloperMode(e.target.checked);
            }}
          />
        </FormControl>
        <Alert color="neutral" variant="soft" sx={{ mt: 1 }}>
          Self-hosted open access: no password required unless the daemon sets
          AGENTTRADER_REQUIRE_AUTH=1.
        </Alert>
        <Button
          variant="solid"
          color="neutral"
          onClick={() => {
            clearSession();
            navigate({ to: PATHS.botIndex, replace: true });
          }}
        >
          Clear optional password
        </Button>
        <Button
          variant="plain"
          onClick={() => navigate({ to: PATHS.login, replace: true })}
        >
          Backend URL screen
        </Button>
      </Box>
    </Page>
  );
}

export const Route = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard/settings",
  component: SettingsPage,
});
