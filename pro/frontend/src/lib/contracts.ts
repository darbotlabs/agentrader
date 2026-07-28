/**
 * Pro UI contracts recovered from production dist.
 * @evidence-source app/frontend/assets/index-DTKnr6h1.js
 *
 * These are the stable runtime strings / shapes the minified SPA depended on.
 * Native implementation must preserve them for behavioral fidelity.
 */

/** @evidence index-DTKnr6h1.js:25904–25907 */
export const STORAGE = {
  APP_URL: "APP_URL",
  ADMIN_PASSWORD: "ADMIN_PASSWORD",
  DEVELOPER_MODE_ENABLED: "DEVELOPER_MODE_ENABLED",
} as const;

/** @evidence index-DTKnr6h1.js:25907 XD */
export const DEFAULT_BACKEND_URL = "http://localhost:8000";

/** @evidence index-DTKnr6h1.js:32402 */
export const TRPC_PATH = "/api/trpc";

/**
 * @evidence index-DTKnr6h1.js:32349–32369 path table lue + qB
 */
export const PATHS = {
  login: "/dashboard/login",
  dashboard: "/dashboard",
  accounts: "/dashboard/accounts",
  settings: "/dashboard/settings",
  strategies: "/dashboard/strategies",
  bot: "/dashboard/bot",
  botIndex: "/dashboard/bot",
  botCreate: "/dashboard/bot/create",
  botId: (id: string | number) => `/dashboard/bot/${id}`,
  botEdit: (id: string | number) => `/dashboard/bot/edit/${id}`,
  gridCreate: "/dashboard/grid-bot/create",
  gridId: (id: string | number) => `/dashboard/grid-bot/${id}`,
  gridEdit: (id: string | number) => `/dashboard/grid-bot/edit/${id}`,
  dcaCreate: "/dashboard/dca-bot/create",
  dcaId: (id: string | number) => `/dashboard/dca-bot/${id}`,
  dcaEdit: (id: string | number) => `/dashboard/dca-bot/edit/${id}`,
} as const;

/** @evidence index-DTKnr6h1.js:32369 qB */
export const BOT_TYPE_PATHS = {
  Bot: "bot/:id",
  GridBot: "grid-bot/:id",
  DcaBot: "dca-bot/:id",
} as const;

/** @evidence UI string survivors */
export const COPY = {
  welcome: "Welcome Trader!",
  signIn: "Sign in to continue.",
  backendUrl: "Backend URL",
  username: "Username",
  password: "Password",
  logIn: "Log in",
  appSettings: "App settings",
  bots: "Bots",
  strategies: "Strategies",
  exchangeAccounts: "Exchange Accounts",
  settings: "Settings",
  botCreated: "Bot created successfully",
  botUpdated: "Bot updated successfully",
  accountDeleted: "Account deleted",
  accountCreated: "Account created",
  strategySettings: "Strategy settings",
  botSettings: "Bot settings",
  strategyParams: "Strategy params",
  updateBot: "Update bot",
  botName: "Bot name",
  timeframe: "Timeframe",
  exchange: "Exchange",
  symbol: "Symbol",
  enabledLogging: "Enabled Logging",
  mustBeDefined: "Must be defined",
  noLogsYet: "No logs yet",
  developerMode: "Developer mode",
  logout: "Logout",
  create: "Create",
  gridBot: "Grid Bot",
  dcaBot: "DCA Bot",
} as const;

/** Default market from dist form initial state */
export const DEFAULTS = {
  exchangeCode: "OKX",
  symbolId: "OKX:BTC/USDT",
  username: "agentrader",
} as const;

/** All dashboard routes from LayoutDashboard* tree */
export const FILE_ROUTES = [
  "/_layout",
  "/",
  "/_layout/dashboard/login",
  "/_layout/dashboard/settings",
  "/_layout/dashboard/strategies",
  "/_layout/dashboard/accounts",
  "/_layout/dashboard/bot/",
  "/_layout/dashboard/bot/$id",
  "/_layout/dashboard/bot/create",
  "/_layout/dashboard/bot/edit/$id",
  "/_layout/dashboard/grid-bot/create",
  "/_layout/dashboard/grid-bot/$id",
  "/_layout/dashboard/grid-bot/edit/$id",
  "/_layout/dashboard/dca-bot/create",
  "/_layout/dashboard/dca-bot/$id",
  "/_layout/dashboard/dca-bot/edit/$id",
] as const;
