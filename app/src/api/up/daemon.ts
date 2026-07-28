import { App } from "@agentrader/bot";
import { getSettings } from "../../utils/settings.js";

const { host, port } = getSettings();

// Reliability: never die silently
process.on("uncaughtException", (err) => {
  console.error("[agentrader] uncaughtException", err);
});
process.on("unhandledRejection", (err) => {
  console.error("[agentrader] unhandledRejection", err);
});

const app = await App.create({
  server: {
    frontendDistPath: "../frontend",
    host,
    port,
  },
});

async function shutdown(signal: string) {
  console.error(`[agentrader] shutting down (${signal})`);
  try {
    await app.shutdown();
  } catch (e) {
    console.error("[agentrader] shutdown error", e);
  }
  process.exit(0);
}
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
