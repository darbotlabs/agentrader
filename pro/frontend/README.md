# @agentrader/frontend (Pro UI — native)

Native AgentTrader dashboard implementing **pro** functionality recovered from the production Vite dist (`app/frontend/assets/index-DTKnr6h1.js`).

## Status

| Layer | Status |
| --- | --- |
| Route tree (all LayoutDashboard* paths) | ✅ native `src/routeTree.ts` |
| Login / settings / accounts / strategies / bots | ✅ |
| Grid bot create/edit | ✅ |
| DCA bot create/detail | ✅ |
| Template bot edit (strategy + settings) | ✅ |
| Unfry evidence archive | `src/restored/` (not compiled) |
| Dist contract verification | `npm run verify` |

## Develop

```bash
cd pro/frontend
npx --yes pnpm@10.12.1 install   # from monorepo root preferred
npm run dev                      # http://localhost:5173
```

Backend: `agentrader up` (port 8000). Open `/dashboard/login`.

## Build & sync into app

```bash
cd pro/frontend
npm run check          # verify + typecheck + build
# then from monorepo root (when moon/pnpm available):
# pnpm ui:sync   # copies pro/frontend/dist → app/frontend
```

Manual sync:

```bash
rm -rf app/frontend
cp -r pro/frontend/dist app/frontend
# ensure index.html + assets present; logos under public/exchanges copy into dist/public
```

## Architecture

- **TanStack Router** file-style route tree matching dist `LVe` keys  
- **tRPC** client → `{backend}/api/trpc` + `Authorization: ADMIN_PASSWORD`  
- **MUI Joy** shell (nav: Bots, Strategies, Exchange Accounts, Settings)  
- **Redux** slices `gridBotForm` / `dcaBotForm`  

Evidence notes: `FIDELITY.md`, `src/restored/README.md`, Minifryer `S:\minifryer`.
