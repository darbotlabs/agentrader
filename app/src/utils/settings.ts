import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { logger } from "@agentrader/logger";
import { appPath, settingsPath } from "./app-path.js";

type DaemonSettings = {
  host: string;
  port: number;
};

export const defaultSettings: DaemonSettings = {
  /**
   * Daemon hostname. Use `0.0.0.0` to listen on all interfaces.
   * Prefer 127.0.0.1 for local self-host reliability on Windows.
   */
  host: "127.0.0.1",
  /**
   * Daemon port.
   */
  port: 8000,
};

function fromEnv(): Partial<DaemonSettings> {
  const host = process.env.HOST || process.env.AGENTTRADER_HOST;
  const portRaw = process.env.PORT || process.env.AGENTTRADER_PORT;
  const out: Partial<DaemonSettings> = {};
  if (host && host.trim()) out.host = host.trim();
  if (portRaw && String(portRaw).trim()) {
    const n = Number(portRaw);
    if (Number.isFinite(n) && n > 0) out.port = n;
  }
  return out;
}

export function getSettings(): DaemonSettings {
  let fileSettings: DaemonSettings = defaultSettings;
  if (existsSync(settingsPath)) {
    try {
      fileSettings = { ...defaultSettings, ...JSON.parse(readFileSync(settingsPath, "utf-8")) };
    } catch (error) {
      logger.warn(error, "Failed to parse settings.json.");
      fileSettings = defaultSettings;
    }
  } else {
    fileSettings = saveSettings(defaultSettings);
  }

  // Env wins (launcher / container), then file, then defaults
  return { ...fileSettings, ...fromEnv() };
}

export function saveSettings(settings: DaemonSettings): DaemonSettings {
  if (!existsSync(appPath)) {
    logger.info(`Creating app directory: ${appPath}`);
    mkdirSync(appPath);
  }

  writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  // Return the settings that were written (not a stale default copy)
  return settings;
}
