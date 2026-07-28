/**
 * Verify native pro frontend still matches production dist contracts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPO = path.resolve(ROOT, "../..");
const BUNDLE = path.join(REPO, "app/frontend/assets/index-DTKnr6h1.js");
const SRC = path.join(ROOT, "src");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "restored" || ent.name === "evidence") continue;
      walk(p, acc);
    } else if (/\.(tsx?|jsx?)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

const requiredInBundle = [
  "Welcome Trader!",
  "Sign in to continue.",
  "ADMIN_PASSWORD",
  "APP_URL",
  "LayoutDashboardBotEditIdRoute",
  "/dashboard/bot/edit/$id",
  "/dashboard/grid-bot/create",
  "Bot created successfully",
  "Bot updated successfully",
  "api/trpc",
  "localhost:8000",
];

const requiredInSrc = [
  "Welcome Trader!",
  "Sign in to continue.",
  "ADMIN_PASSWORD",
  "LayoutDashboardBotEditIdRoute",
  "/dashboard/bot/edit/$id",
  "/dashboard/grid-bot/create",
  "Bot created successfully",
  "Bot updated successfully",
  "/api/trpc",
  "http://localhost:8000",
];

let failed = false;

if (!fs.existsSync(BUNDLE)) {
  console.error("FAIL: production bundle missing:", BUNDLE);
  process.exit(1);
}

const bundle = fs.readFileSync(BUNDLE, "utf8");
for (const s of requiredInBundle) {
  if (!bundle.includes(s)) {
    console.error("FAIL: bundle missing contract:", s);
    failed = true;
  }
}

const files = walk(SRC);
const srcText = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");
for (const s of requiredInSrc) {
  if (!srcText.includes(s)) {
    console.error("FAIL: native src missing contract:", s);
    failed = true;
  }
}

// route files exist
const routeFiles = [
  "routes/_layout/dashboard/login.tsx",
  "routes/_layout/dashboard/bot/edit.$id.tsx",
  "routes/_layout/dashboard/grid-bot/create.tsx",
  "routes/_layout/dashboard/dca-bot/create.tsx",
  "routeTree.ts",
  "main.tsx",
];
for (const r of routeFiles) {
  if (!fs.existsSync(path.join(SRC, r))) {
    console.error("FAIL: missing route file", r);
    failed = true;
  }
}

// ledger bootstrap remaining 0 if present
const ledger = path.join(SRC, "restored/bootstrap/LEDGER.json");
if (fs.existsSync(ledger)) {
  const L = JSON.parse(fs.readFileSync(ledger, "utf8"));
  if (L.bootstrapComplete && L.bootstrapComplete.remaining !== 0) {
    console.error("FAIL: bootstrapComplete.remaining !== 0");
    failed = true;
  }
}

if (failed) {
  console.error("\nPRO CONTRACT VERIFICATION FAILED");
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      bundle: "app/frontend/assets/index-DTKnr6h1.js",
      srcFiles: files.length,
      contractsChecked: requiredInSrc.length,
      routesChecked: routeFiles.length,
    },
    null,
    2,
  ),
);
