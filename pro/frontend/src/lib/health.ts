import { getAppUrl } from "./storage";

export type AgentTraderHealth = {
  ok: boolean;
  service?: string;
  version?: string;
  mode?: string;
  authRequired?: boolean;
  openAccess?: boolean;
  ui?: string;
  pid?: number;
  startedAt?: string;
  uptimeSec?: number;
  requestCount?: number;
  lastRequestAt?: string | null;
  lastTrpcPath?: string | null;
  host?: string;
  port?: number;
};

export async function fetchHealth(timeoutMs = 2500): Promise<AgentTraderHealth | null> {
  const base = getAppUrl().replace(/\/$/, "");
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${base}/api/health`, { signal: ctrl.signal });
    if (!res.ok) return null;
    return (await res.json()) as AgentTraderHealth;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}
