# Pro functionality — native in AgentTrader

## What “pro” means here

The commercial OpenTrader **pro** UI that was previously only shipped as a prebuilt Vite dist under `app/frontend/assets/index-DTKnr6h1.js`.

That UI is now a **first-class package**:

```text
pro/frontend/          ← native source (buildable)
  src/routes/**        ← all dashboard routes
  src/features/**      ← bot-edit, grid forms
  src/lib/contracts.ts ← dist survivors (paths, storage, copy)
  src/restored/**      ← unfry archive (not compiled)
  dist/                ← vite production build
app/frontend/          ← served by agentrader daemon (synced from dist)
```

## Verification performed

| Check | Result |
| --- | --- |
| `npm run verify` (contracts vs dist) | pass |
| `tsc --noEmit` | pass |
| `vite build` | pass (~702 kB app bundle) |
| Minifryer bootstrap unfry remaining | **0** of 42 |
| Unfry suite | 9/9 pass |

## Pro surfaces implemented natively

- Login (Welcome Trader!, ADMIN_PASSWORD, backend URL)
- Settings (backend URL, developer mode, logout)
- Exchange accounts (list/create/delete via tRPC)
- Strategies list → create grid/DCA/template
- Bots list (start/stop/open/edit)
- Bot detail + logs
- Bot edit (strategy + settings update)
- Grid bot create/edit (gridLines payload)
- DCA bot create/detail/edit shell
- Full LayoutDashboard* route tree

## Commands

```bash
cd pro/frontend
npm run check                 # verify + typecheck + build

# Serve via app (after build):
# copy dist → app/frontend  OR  pnpm ui:sync when moon is available
agentrader up                 # serves app/frontend on :8000
```

## Ongoing restore

Deep demangled units remain under `src/restored/` for continued fidelity work (charts, virtualized selects, full DCA panel). Native routes already implement pro **product workflows** against `packages/trpc`.
