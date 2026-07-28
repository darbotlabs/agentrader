# Iteration doctrine (standing)

Every AgentTrader / lab iteration must **advance real capability**, not only ship features.

## Always optimize for

| Axis | Meaning in practice |
|------|---------------------|
| **Hardening** | Fail closed only when intentional; open self-host by default; no silent auth walls |
| **Functionality** | End-to-end jobs work (list bots, add exchange, run strategy) without dead tabs |
| **Extensibility** | Custom/LLM strategies load via `CUSTOM_STRATEGIES_PATH`; stable tRPC contracts |
| **Robustness** | Daemon survives shell exit; SPA deep links; empty/error states; retries where safe |
| **Accuracy** | Strategy schemas, params, and backtest inputs match engine truth |
| **Reliability** | Health probe, PID file, restart script, smoke tests green |
| **Traceability** | Request IDs, health uptime/version, structured logs, proof scripts |
| **Responsiveness** | Fast health/status strip; UI does not block whole shell on one failed query |
| **Profitability** | Prefer strategies with clear runPolicy/history needs; expose backtest paths; paper first |

## Non-goals per iteration

- Vibe-only restyles without data contracts
- Auth/login walls on local OSS defaults
- Breaking pro-native UI contracts without migration

## Exit criteria for a hardening pass

1. `scripts/smoke-open-access.ps1` passes  
2. `/api/health` reports `ok` + useful diagnostics  
3. Bots / Strategies / Accounts / Settings usable without Authorization  
4. Document what improved (this file + commit/notes)

## Prefer

- Small, verified deltas over large untested rewrites  
- Rebuild + smoke after every server/UI change  
- Adversarial probes (no auth, wrong auth, deep link, empty DB)
