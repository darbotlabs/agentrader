# AgentTrader · self-hosted open access

AgentTrader is **open source, self-hosted, and LLM-friendly**. By default there is **no login wall**.

## Defaults

| Surface | Behavior |
|---------|----------|
| tRPC (`/api/trpc/*`) | Local admin context for every request |
| UI (pro native) | Bots / Strategies / Accounts / Settings without password |
| `GET /api/health` | Public liveness (`authRequired: false`) |

## Optional lock (rare)

Only if you deliberately lock a shared host:

```bat
set AGENTTRADER_REQUIRE_AUTH=1
set ADMIN_PASSWORD=your-secret
```

Then the browser may store `ADMIN_PASSWORD` in localStorage and send `Authorization`.

## Pro UI (native)

Source of truth: `pro/frontend`

Build + install into the daemon static root:

```powershell
cd pro/frontend
npm run build
# sync:
Remove-Item -Recurse -Force ..\..\app\frontend -ErrorAction SilentlyContinue
Copy-Item -Recurse dist ..\..\app\frontend
```

Then rebuild the app bundle so server changes ship:

```powershell
cd app
npx tsup
```

Restart the daemon (`node app/dist/daemon.mjs`). UI is served from `app/frontend` at `http://127.0.0.1:8000`.

## Smoke (no Authorization)

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/health
Invoke-WebRequest http://127.0.0.1:8000/api/trpc/bot.list
Invoke-WebRequest http://127.0.0.1:8000/api/trpc/exchangeAccount.list
Invoke-WebRequest http://127.0.0.1:8000/api/trpc/bot.getStrategies
```

All must return HTTP 200 without `UNAUTHORIZED`.
