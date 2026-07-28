# AgentTrader — agent operating notes

## Product stance

Self-hosted, open source, LLM-driven trading lab. **Open access by default** (no browser password). Optional lock only via `AGENTTRADER_REQUIRE_AUTH=1` + `ADMIN_PASSWORD`.

## Iteration mandate

See [docs/ITERATION_DOCTRINE.md](docs/ITERATION_DOCTRINE.md).

On every session: **fix and improve** hardening, functionality, extensibility, robustness, accuracy, reliability, traceability, responsiveness, and strategy/model profitability — not just close the ticket.

## Layout

| Path | Role |
|------|------|
| `pro/frontend` | **Native pro UI** (source of truth) |
| `app/frontend` | Built static UI served by daemon |
| `app/dist` | Bundled daemon/CLI (`tsup`, includes `@agentrader/*`) |
| `packages/bot` | Platform + Fastify + open auth context |
| `packages/trpc` | API routers / view contracts |
| `packages/bot-templates` | Built-in + custom strategy templates |
| `~/.agentrader` | `dev.db`, `pass`, `settings.json`, logs, PID |

## Rebuild loop (Windows)

```powershell
# 1) Pro UI
cd pro/frontend; npm run build
Remove-Item -Recurse -Force ..\..\app\frontend -EA SilentlyContinue
Copy-Item -Recurse dist ..\..\app\frontend

# 2) Daemon bundle
cd ..\..\app; npx tsup

# 3) Durable start + smoke
..\scripts\Start-AgentTrader.ps1
..\scripts\smoke-open-access.ps1
```

## Default URL

http://127.0.0.1:8000 — tabs: Bots, Strategies, Exchange Accounts, Settings
