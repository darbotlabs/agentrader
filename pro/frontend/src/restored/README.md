# Restored pro UI (from production dist)

**Source:** `app/frontend/assets/index-DTKnr6h1.js` (+ lazy `page-*.js` chunks)  
**Method:** Minifryer Unfry — multi-shot restore, not rewrite.

## Layout

| Path | Contents |
| --- | --- |
| `bot-edit/` | Passes 1–5: `gVe` page graph through schema fields |
| `bootstrap/` | Pass 6: **all 42** remaining bootstrap bindings → **0 left** |

## Complete the gVe snippet

```bash
node S:/minifryer/packages/cli/src/cli.js unfry \
  app/frontend/assets/index-DTKnr6h1.js \
  --unit bootstrap-complete \
  -o pro/frontend/src/restored/bootstrap
```

### Verification (automated)

- `VERIFY.json` → `ok: true`, `remainingInBootstrapList: 0`
- All **16** `ea("/…")` paths present in `06-routeTree-COMPLETE.tsx`
- All **14** layout tree keys + IndexRoute paths present
- Login survivors (`Welcome Trader!`, etc.) in `pages/LoginPage.tsx`
- Unfry suite: **9/9** tests green

### Status of the pasted bootstrap

| Bucket | Count | Status |
| --- | ---: | --- |
| Core page (`gVe`…`mVe`) | 11 | Restored (passes 1–2 + deps 3–5) |
| Route tree + factories + runtime | 42 | **Restored (pass 6) → 0 left** |
| **Bootstrap total** | **53** | **Complete** |
| Export ABI table | ~130 | ~103 still open (other features) |

## Still open (beyond this snippet)

See `bootstrap/LEDGER.json` → `nextGaps` (drawer chrome, provider internals, lazy chunk sources, export ABI).
