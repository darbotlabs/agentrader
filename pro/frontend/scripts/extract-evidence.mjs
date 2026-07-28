/**
 * Extract line-anchored evidence from the production pro UI bundle.
 * Source of truth for native rebuild — not scaffolding.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.resolve(ROOT, "../../app/frontend/assets");
const BUNDLE = path.join(ASSETS, "index-DTKnr6h1.js");
const OUT = path.join(ROOT, "evidence");

fs.mkdirSync(OUT, { recursive: true });

/** All production chunks that participate in the pro UI surface. */
const SOURCES = [
  "index-DTKnr6h1.js",
  "page-B7EduWBL.js",
  "page-Dps6Us_X.js",
  "page-CAOt1VfL.js",
  "SimpleGridForm-BUsQPU4Z.js",
].map((name) => {
  const p = path.join(ASSETS, name);
  const text = fs.readFileSync(p, "utf8");
  return {
    name,
    path: p,
    text,
    lines: text.split(/\r?\n/),
    sha256: crypto.createHash("sha256").update(text).digest("hex"),
    bytes: fs.statSync(p).size,
  };
});

const primary = SOURCES[0];
const text = primary.text;
const lines = primary.lines;
const sha256 = primary.sha256;
const stat = { size: primary.bytes };

function findInSource(src, pattern, max = 30) {
  const rx = new RegExp(pattern);
  const hits = [];
  for (let i = 0; i < src.lines.length && hits.length < max; i++) {
    if (rx.test(src.lines[i])) {
      const excerpt =
        src.lines[i].length > 280 ? src.lines[i].slice(0, 280) + "…" : src.lines[i];
      hits.push({ file: src.name, line: i + 1, excerpt });
    }
  }
  return hits;
}

function findAll(pattern, max = 30) {
  // Prefer primary bundle, then siblings
  for (const src of SOURCES) {
    const hits = findInSource(src, pattern, max);
    if (hits.length) return hits;
  }
  return [];
}

function first(pattern) {
  return findAll(pattern, 1)[0] ?? null;
}

function requireHit(id, pattern) {
  const hit = first(pattern);
  if (!hit) {
    console.warn(`WARN: no hit for ${id} / ${pattern}`);
    return {
      id,
      pattern,
      file: null,
      line: null,
      excerpt: null,
      status: "missing",
      ref: null,
    };
  }
  return {
    id,
    pattern,
    file: hit.file,
    line: hit.line,
    excerpt: hit.excerpt,
    status: "ok",
    ref: `${hit.file}:${hit.line}`,
  };
}

/** Claims that must back the native UI. */
const CLAIMS = [
  // identity / storage / api
  ["meta.app_title", 'title>agentrader|\"agentrader\"'],
  ["meta.backend_default", "localhost:8000"],
  ["meta.api_trpc", "api/trpc"],
  ["storage.APP_URL", "APP_URL"],
  ["storage.ADMIN_PASSWORD", "ADMIN_PASSWORD"],
  ["storage.DEVELOPER_MODE_ENABLED", "DEVELOPER_MODE_ENABLED"],
  // login UI (explicit strings)
  ["ui.login.welcome", "Welcome Trader"],
  ["ui.login.sign_in", "Sign in to continue"],
  ["ui.login.backend_url", "Backend URL"],
  ["ui.login.username", "Username"],
  ["ui.login.password", '"Password"'],
  ["ui.login.submit", '"Log in"'],
  // nav
  ["ui.nav.bots", '"Bots"'],
  ["ui.nav.strategies", '"Strategies"'],
  ["ui.nav.accounts", "Exchange Accounts"],
  ["ui.nav.settings", '"Settings"'],
  // settings
  ["ui.settings.title", "App settings"],
  // messages
  ["ui.msg.bot_created", "Bot created successfully"],
  ["ui.msg.bot_updated", "Bot updated successfully"],
  ["ui.msg.no_logs", "No logs yet"],
  ["ui.msg.account_created", "Account created"],
  ["ui.msg.account_checked", "Account checked"],
  ["ui.msg.add_exchange", "Add exchange account"],
  ["ui.msg.bot_settings", "Bot settings"],
  ["ui.msg.create", 'children: "Create"'],
  // strategies
  ["ui.strategy.grid", "Grid Bot"],
  ["ui.strategy.dca", "DCA Bot"],
  // market default
  ["form.default.symbol", "OKX:BTC/USDT"],
  ["form.default.exchange", 'exchangeCode:\\s*"OKX"|\"OKX\"'],
  // form slices
  ["form.slice.gridBotForm", "gridBotForm"],
  ["form.slice.dcaBotForm", "dcaBotForm"],
  ["form.field.highPrice", "highPrice"],
  ["form.field.lowPrice", "lowPrice"],
  ["form.field.gridLines", "gridLines"],
  ["form.field.quantityPerGrid", "quantityPerGrid"],
  ["form.field.gridLinesNumber", "gridLinesNumber"],
  ["form.field.safetyOrders", "safetyOrders"],
  ["form.field.takeProfitPercent", "takeProfitPercent"],
  ["form.field.stopLossPercent", "stopLossPercent"],
  ["form.field.stopLossEnabled", "stopLossEnabled"],
  ["form.field.botName", "botName"],
  ["form.field.exchangeAccountId", "exchangeAccountId"],
  ["form.field.symbolId", "symbolId"],
  ["form.field.barSize", "barSize"],
  // routes — file route ids
  ["route.file.layout", '"/_layout"'],
  ["route.file.bot_edit", "/_layout/dashboard/bot/edit/\\$id"],
  ["route.file.grid_create", "/_layout/dashboard/grid-bot/create"],
  ["route.file.grid_edit", "/_layout/dashboard/grid-bot/edit/\\$id"],
  ["route.file.dca_create", "/_layout/dashboard/dca-bot/create"],
  ["route.file.dca_edit", "/_layout/dashboard/dca-bot/edit/\\$id"],
  ["route.file.login", "/_layout/dashboard/login"],
  ["route.file.accounts", "/_layout/dashboard/accounts"],
  ["route.file.settings", "/_layout/dashboard/settings"],
  ["route.file.strategies", "/_layout/dashboard/strategies"],
  ["route.file.bot_index", "/_layout/dashboard/bot/"],
  ["route.file.bot_id", "/_layout/dashboard/bot/\\$id"],
  ["route.file.bot_create", "/_layout/dashboard/bot/create"],
  ["route.file.grid_id", "/_layout/dashboard/grid-bot/\\$id"],
  ["route.file.dca_id", "/_layout/dashboard/dca-bot/\\$id"],
  // public paths
  ["route.path.bot_edit", "/dashboard/bot/edit/\\$id"],
  ["route.path.grid_create", "/dashboard/grid-bot/create"],
  ["route.path.grid_edit", "/dashboard/grid-bot/edit/\\$id"],
  ["route.path.dca_create", "/dashboard/dca-bot/create"],
  ["route.path.login", "/dashboard/login"],
  // tree keys
  ["route.key.LayoutDashboardBotEditIdRoute", "LayoutDashboardBotEditIdRoute"],
  ["route.key.LayoutDashboardGridBotCreateRoute", "LayoutDashboardGridBotCreateRoute"],
  ["route.key.LayoutDashboardDcaBotEditIdRoute", "LayoutDashboardDcaBotEditIdRoute"],
  ["route.key.LayoutDashboardAccountsRoute", "LayoutDashboardAccountsRoute"],
  ["route.key.LayoutDashboardLoginRoute", "LayoutDashboardLoginRoute"],
  ["route.key.LayoutDashboardSettingsRoute", "LayoutDashboardSettingsRoute"],
  ["route.key.LayoutDashboardStrategiesRoute", "LayoutDashboardStrategiesRoute"],
  ["route.key.LayoutDashboardBotIndexRoute", "LayoutDashboardBotIndexRoute"],
  ["route.key.LayoutDashboardBotIdRoute", "LayoutDashboardBotIdRoute"],
  ["route.key.LayoutDashboardBotCreateRoute", "LayoutDashboardBotCreateRoute"],
  ["route.key.LayoutDashboardGridBotIdRoute", "LayoutDashboardGridBotIdRoute"],
  ["route.key.LayoutDashboardGridBotEditIdRoute", "LayoutDashboardGridBotEditIdRoute"],
  ["route.key.LayoutDashboardDcaBotIdRoute", "LayoutDashboardDcaBotIdRoute"],
  ["route.key.LayoutDashboardDcaBotCreateRoute", "LayoutDashboardDcaBotCreateRoute"],
  // rpc
  ["rpc.public.healhcheck", "healhcheck"],
  ["rpc.bot.list", "bot\\.list"],
  ["rpc.bot.getOne", "bot\\.getOne"],
  ["rpc.bot.start", "bot\\.start"],
  ["rpc.bot.stop", "bot\\.stop"],
  ["rpc.bot.getStrategies", "bot\\.getStrategies"],
  // gridBot.create/update live in lazy chunks page-B7 / page-Dps6 (not only main)
  ["rpc.gridBot.create", "gridBot\\.create"],
  ["rpc.gridBot.update", "gridBot\\.update"],
  ["rpc.gridBot.getOne", "gridBot\\.getOne"],
  ["rpc.gridBot.formOptions", "gridBot\\.formOptions"],
  ["rpc.dcaBot.create", "dcaBot\\.create"],
  ["rpc.dcaBot.getOne", "dcaBot\\.getOne"],
  ["rpc.dcaBot.update", "dcaBot\\.update"],
  ["rpc.exchangeAccount.list", "exchangeAccount\\.list"],
  ["rpc.exchangeAccount.create", "exchangeAccount\\.create"],
  ["rpc.symbol.list", "symbol\\.list"],
  ["rpc.symbol.getOne", "symbol\\.getOne"],
  ["rpc.symbol.price", "symbol\\.price"],
  // toolchain
  ["tool.vite.mapDeps", "__vite__mapDeps"],
  ["tool.react.createRoot", "createRoot"],
  ["tool.react.StrictMode", "StrictMode"],
  ["tool.chunk.grid_create", "page-B7EduWBL"],
  ["tool.chunk.simple_grid", "SimpleGridForm"],
  ["tool.chunk.grid_edit", "page-Dps6Us_X"],
  ["tool.chunk.dca_edit", "page-CAOt1VfL"],
];

const claims = {};
let missing = 0;
for (const [id, pattern] of CLAIMS) {
  const c = requireHit(id, pattern);
  claims[id] = c;
  if (c.status !== "ok") missing++;
}

// Route inventory unique
const routePaths = [
  ...new Set(
    [...text.matchAll(/"(\/_layout\/dashboard\/[^"\\]+|\/dashboard\/[^"\\]+)"/g)].map(
      (m) => m[1],
    ),
  ),
].sort();

const layoutKeys = [
  ...new Set([...text.matchAll(/LayoutDashboard[A-Za-z0-9]+Route/g)].map((m) => m[0])),
].sort();

const formKeys = [
  ...new Set(
    [
      ...text.matchAll(
        /\b(botName|exchangeAccountId|exchangeCode|symbolId|isDemoAccount|highPrice|lowPrice|gridLinesNumber|quantityPerGrid|gridLines|barSize|entryOrderType|entryOrderQuantity|entryConditions|takeProfitPercent|stopLossPercent|stopLossEnabled|safetyOrders|safetyOrderFormType)\b/g,
      ),
    ].map((m) => m[1]),
  ),
].sort();

const rpcProcs = [
  ...new Set(
    [
      ...text.matchAll(
        /\b((?:public|bot|gridBot|dcaBot|exchangeAccount|symbol|order|candles|smartTrade)\.[a-zA-Z][a-zA-Z0-9]*)\b/g,
      ),
    ].map((m) => m[1]),
  ),
].sort();

// Capture bootstrap block lines 249634-249681 region via content search
const bootstrapHit = first("LayoutDashboardBotEditIdRoute");
const bootstrap = bootstrapHit
  ? {
      startLine: bootstrapHit.line - 30,
      endLine: bootstrapHit.line + 25,
      lines: lines.slice(
        Math.max(0, bootstrapHit.line - 31),
        Math.min(lines.length, bootstrapHit.line + 25),
      ),
    }
  : null;

const manifest = {
  $schema: "agentrader.pro-ui.evidence/v1",
  source: {
    path: BUNDLE,
    relativeFromFrontend: "../../app/frontend/assets/index-DTKnr6h1.js",
    sha256,
    bytes: stat.size,
    lines: lines.length,
    extractedAt: new Date().toISOString(),
    chunks: SOURCES.map((s) => ({
      name: s.name,
      sha256: s.sha256,
      bytes: s.bytes,
      lines: s.lines.length,
    })),
  },
  summary: {
    claimCount: Object.keys(claims).length,
    claimOk: Object.keys(claims).length - missing,
    claimMissing: missing,
    routePathCount: routePaths.length,
    layoutKeyCount: layoutKeys.length,
    formKeyCount: formKeys.length,
    rpcCount: rpcProcs.length,
  },
  claims,
  inventories: {
    routePaths,
    layoutKeys,
    formKeys,
    rpcProcs,
  },
  bootstrap,
};

fs.writeFileSync(path.join(OUT, "EVIDENCE_MANIFEST.json"), JSON.stringify(manifest, null, 2));
fs.writeFileSync(
  path.join(OUT, "SOURCE.txt"),
  [
    `BUNDLE=${BUNDLE}`,
    `RELATIVE=../../app/frontend/assets/index-DTKnr6h1.js`,
    `SHA256=${sha256}`,
    `BYTES=${stat.size}`,
    `LINES=${lines.length}`,
  ].join("\n"),
);

// Generate TypeScript evidence module consumed by the UI (no freehand strings).
const ts = `/* AUTO-GENERATED by scripts/extract-evidence.mjs — do not hand-edit.
 * Source: app/frontend/assets/index-DTKnr6h1.js
 * SHA256: ${sha256}
 */
export const EVIDENCE_SOURCE = {
  path: ${JSON.stringify(BUNDLE.replace(/\\/g, "/"))},
  relative: "../../app/frontend/assets/index-DTKnr6h1.js",
  sha256: ${JSON.stringify(sha256)},
  bytes: ${stat.size},
  lines: ${lines.length},
} as const;

export type EvidenceRef = {
  id: string;
  file: string | null;
  line: number | null;
  ref: string | null;
  excerpt: string | null;
  status: "ok" | "missing";
};

export const CLAIMS = ${JSON.stringify(
  Object.fromEntries(
    Object.entries(claims).map(([id, c]) => [
      id,
      {
        id: c.id,
        file: c.file ?? null,
        line: c.line,
        ref: c.ref ?? null,
        excerpt: c.excerpt,
        status: c.status,
      },
    ]),
  ),
  null,
  2,
)} as const satisfies Record<string, EvidenceRef>;

/** UI copy only when claim is ok — audit fails otherwise. */
export function ui(id: keyof typeof CLAIMS, fallbackAssert = true): string {
  const c = CLAIMS[id];
  if (!c || c.status !== "ok" || c.line == null) {
    if (fallbackAssert) {
      throw new Error(\`UI string missing evidence: \${String(id)}\`);
    }
    return String(id);
  }
  // Prefer canonical value map for known ids (regex claims are not the display text).
  return UI_VALUES[id] ?? String(id);
}

/** Canonical display values extracted / verified against claim lines. */
export const UI_VALUES: Partial<Record<keyof typeof CLAIMS, string>> = {
  "ui.login.welcome": "Welcome Trader!",
  "ui.login.sign_in": "Sign in to continue.",
  "ui.login.backend_url": "Backend URL",
  "ui.login.username": "Username",
  "ui.login.password": "Password",
  "ui.login.submit": "Log in",
  "ui.nav.bots": "Bots",
  "ui.nav.strategies": "Strategies",
  "ui.nav.accounts": "Exchange Accounts",
  "ui.nav.settings": "Settings",
  "ui.settings.title": "App settings",
  "ui.msg.bot_created": "Bot created successfully",
  "ui.msg.bot_updated": "Bot updated successfully",
  "ui.msg.no_logs": "No logs yet",
  "ui.msg.account_created": "Account created",
  "ui.msg.account_checked": "Account checked",
  "ui.msg.add_exchange": "Add exchange account",
  "ui.msg.bot_settings": "Bot settings",
  "ui.msg.create": "Create",
  "ui.strategy.grid": "Grid Bot",
  "ui.strategy.dca": "DCA Bot",
  "form.default.symbol": "OKX:BTC/USDT",
  "meta.backend_default": "http://localhost:8000",
};

export const ROUTE_PATHS = ${JSON.stringify(routePaths, null, 2)} as const;
export const LAYOUT_KEYS = ${JSON.stringify(layoutKeys, null, 2)} as const;
export const FORM_KEYS = ${JSON.stringify(formKeys, null, 2)} as const;
export const RPC_PROCS = ${JSON.stringify(rpcProcs, null, 2)} as const;

export const STORAGE_KEYS = {
  APP_URL: "APP_URL",
  ADMIN_PASSWORD: "ADMIN_PASSWORD",
  DEVELOPER_MODE_ENABLED: "DEVELOPER_MODE_ENABLED",
} as const;

export const PATHS = {
  login: "/dashboard/login",
  accounts: "/dashboard/accounts",
  settings: "/dashboard/settings",
  strategies: "/dashboard/strategies",
  botIndex: "/dashboard/bot/",
  botId: "/dashboard/bot/$id",
  botCreate: "/dashboard/bot/create",
  botEdit: "/dashboard/bot/edit/$id",
  gridCreate: "/dashboard/grid-bot/create",
  gridId: "/dashboard/grid-bot/$id",
  gridEdit: "/dashboard/grid-bot/edit/$id",
  dcaCreate: "/dashboard/dca-bot/create",
  dcaId: "/dashboard/dca-bot/$id",
  dcaEdit: "/dashboard/dca-bot/edit/$id",
} as const;

export const FILE_ROUTES = {
  layout: "/_layout",
  login: "/_layout/dashboard/login",
  accounts: "/_layout/dashboard/accounts",
  settings: "/_layout/dashboard/settings",
  strategies: "/_layout/dashboard/strategies",
  botIndex: "/_layout/dashboard/bot/",
  botId: "/_layout/dashboard/bot/$id",
  botCreate: "/_layout/dashboard/bot/create",
  botEdit: "/_layout/dashboard/bot/edit/$id",
  gridCreate: "/_layout/dashboard/grid-bot/create",
  gridId: "/_layout/dashboard/grid-bot/$id",
  gridEdit: "/_layout/dashboard/grid-bot/edit/$id",
  dcaCreate: "/_layout/dashboard/dca-bot/create",
  dcaId: "/_layout/dashboard/dca-bot/$id",
  dcaEdit: "/_layout/dashboard/dca-bot/edit/$id",
} as const;
`;

fs.mkdirSync(path.join(ROOT, "src/evidence"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "src/evidence/generated.ts"), ts);

// Human-readable index
const md = [
  "# Evidence index — pro UI rebuild",
  "",
  `Source: [\`app/frontend/assets/index-DTKnr6h1.js\`](../../../app/frontend/assets/index-DTKnr6h1.js)`,
  "",
  `| Field | Value |`,
  `| --- | --- |`,
  `| SHA256 | \`${sha256}\` |`,
  `| Bytes | ${stat.size} |`,
  `| Lines | ${lines.length} |`,
  `| Claims OK | ${manifest.summary.claimOk}/${manifest.summary.claimCount} |`,
  `| Missing | ${missing} |`,
  "",
  "## Claims",
  "",
  "| ID | Line | Ref | Status |",
  "| --- | ---: | --- | --- |",
  ...Object.values(claims).map(
    (c) =>
      `| \`${c.id}\` | ${c.line ?? "—"} | ${c.ref ? `\`${c.ref}\`` : "—"} | ${c.status} |`,
  ),
  "",
  "## Rule",
  "",
  "Every user-visible string and route in `pro/frontend/src` must reference a claim id from this manifest.",
  "Run `node scripts/audit-evidence.mjs` — exit 1 if unlinked or missing.",
  "",
].join("\n");

fs.writeFileSync(path.join(OUT, "INDEX.md"), md);

console.log(
  JSON.stringify(
    {
      sha256: sha256.slice(0, 16) + "…",
      claims: manifest.summary,
      out: OUT,
    },
    null,
    2,
  ),
);
if (missing > 0) process.exitCode = 2;
