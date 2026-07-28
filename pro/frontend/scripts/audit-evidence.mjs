/**
 * Audit: every pro/frontend source claim must link to evidence from
 * app/frontend/assets/index-DTKnr6h1.js (and declared sibling chunks).
 *
 * Exit 1 on failure.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(ROOT, "evidence/EVIDENCE_MANIFEST.json");
const SRC = path.join(ROOT, "src");

if (!fs.existsSync(MANIFEST)) {
  console.error("Missing evidence/EVIDENCE_MANIFEST.json — run: node scripts/extract-evidence.mjs");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const claims = manifest.claims;

const missingClaims = Object.values(claims).filter((c) => c.status !== "ok");
if (missingClaims.length) {
  console.error("FAIL: evidence claims missing in bundle:");
  for (const c of missingClaims) console.error(`  - ${c.id} pattern=${c.pattern}`);
  process.exit(1);
}

// Verify every claim.line still matches excerpt substring or pattern in file
const assetsDir = path.resolve(ROOT, "../../app/frontend/assets");
const fileCache = new Map();
function loadLines(file) {
  if (!fileCache.has(file)) {
    const p = path.join(assetsDir, file);
    if (!fs.existsSync(p)) throw new Error(`Evidence file missing: ${p}`);
    fileCache.set(file, fs.readFileSync(p, "utf8").split(/\r?\n/));
  }
  return fileCache.get(file);
}

let stale = 0;
for (const c of Object.values(claims)) {
  if (!c.file || !c.line) continue;
  const lines = loadLines(c.file);
  const line = lines[c.line - 1] ?? "";
  const rx = new RegExp(c.pattern);
  if (!rx.test(line)) {
    // allow pattern to match nearby ±2 for formatting drift
    const window = lines.slice(Math.max(0, c.line - 3), c.line + 2).join("\n");
    if (!rx.test(window)) {
      console.error(`STALE: ${c.id} ref ${c.ref} no longer matches pattern`);
      stale++;
    }
  }
}
if (stale) {
  console.error(`FAIL: ${stale} stale evidence anchors`);
  process.exit(1);
}

// Scan source for @evidence:claimId annotations and ui("...") / CLAIMS usages
function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|jsx?)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

const files = walk(SRC);
const annotationRx = /@evidence:([a-zA-Z0-9_.]+)/g;
const uiCallRx = /\bui\(\s*["']([^"']+)["']/g;
const claimAccessRx = /CLAIMS\[\s*["']([^"']+)["']\s*\]/g;

const used = new Set();
const unknown = [];
const freehand = [];

// Banned freehand UI strings that must come from evidence
const BANNED = [
  "Welcome Trader",
  "Sign in to continue",
  "Bot created successfully",
  "Exchange Accounts",
  "App settings",
  "Grid Bot",
  "DCA Bot",
  "No logs yet",
  "Add exchange account",
];

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  // generated evidence module may embed the strings
  if (rel.includes("src/evidence/generated.ts")) continue;
  const text = fs.readFileSync(file, "utf8");

  for (const m of text.matchAll(annotationRx)) {
    const id = m[1];
    used.add(id);
    if (!claims[id]) unknown.push({ file: rel, id, kind: "annotation" });
  }
  for (const m of text.matchAll(uiCallRx)) {
    const id = m[1];
    used.add(id);
    if (!claims[id]) unknown.push({ file: rel, id, kind: "ui()" });
  }
  for (const m of text.matchAll(claimAccessRx)) {
    used.add(m[1]);
  }

  for (const ban of BANNED) {
    if (text.includes(ban) && !rel.includes("evidence/")) {
      // allow if same line has @evidence
      const lines = text.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(ban) && !lines[i].includes("@evidence") && !lines[i].includes("ui(")) {
          freehand.push({ file: rel, line: i + 1, string: ban });
        }
      }
    }
  }
}

// Required evidence coverage: every UI/route claim must be referenced at least once
const requiredPrefix = ["ui.", "route.path.", "route.key.", "storage.", "rpc.", "form.field.", "form.slice.", "meta."];
const required = Object.keys(claims).filter((id) =>
  requiredPrefix.some((p) => id.startsWith(p)),
);
const unreferenced = required.filter((id) => !used.has(id));

let failed = false;
if (unknown.length) {
  failed = true;
  console.error("FAIL: unknown evidence ids in source:");
  for (const u of unknown) console.error(`  ${u.file}: ${u.kind} ${u.id}`);
}
if (freehand.length) {
  failed = true;
  console.error("FAIL: freehand UI strings without @evidence/ui() link:");
  for (const f of freehand.slice(0, 40)) {
    console.error(`  ${f.file}:${f.line} "${f.string}"`);
  }
  if (freehand.length > 40) console.error(`  … +${freehand.length - 40} more`);
}
if (unreferenced.length) {
  failed = true;
  console.error("FAIL: evidence claims never referenced in src/:");
  for (const id of unreferenced) console.error(`  - ${id} (${claims[id].ref})`);
}

// Primary bundle path must be recorded
const primary = path.join(assetsDir, "index-DTKnr6h1.js");
if (!fs.existsSync(primary)) {
  console.error("FAIL: primary evidence bundle missing:", primary);
  failed = true;
}

if (failed) {
  console.error("\nAUDIT FAILED");
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      claims: Object.keys(claims).length,
      referenced: used.size,
      sourceFiles: files.length,
      primary: "app/frontend/assets/index-DTKnr6h1.js",
      sha256: manifest.source.sha256.slice(0, 16) + "…",
    },
    null,
    2,
  ),
);
