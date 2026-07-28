import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { timingSafeEqual } from "node:crypto";

import { trpc, appRouter, type Context } from "@agentrader/trpc";

/**
 * Self-hosted AgentTrader is open by default (OSS / local / LLM-driven).
 * Optional lock: set AGENTTRADER_REQUIRE_AUTH=1 and ADMIN_PASSWORD.
 */
const localAdmin = {
  user: {
    id: 1,
    email: "onboarding@agentrader.pro",
    displayName: "agentrader",
    role: "Admin" as const,
  },
};

function authRequired(): boolean {
  const flag = (process.env.AGENTTRADER_REQUIRE_AUTH || process.env.REQUIRE_AUTH || "")
    .trim()
    .toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function extractPassword(header: string | string[] | undefined): string {
  if (!header) return "";
  const raw = Array.isArray(header) ? header[0] : header;
  if (!raw) return "";
  const trimmed = raw.trim();
  if (trimmed.toLowerCase().startsWith("bearer ")) {
    return trimmed.slice(7).trim();
  }
  return trimmed;
}

// created for each request
export const createContext = ({ req }: CreateFastifyContextOptions): Context => {
  // Default: open local admin — no browser login / Authorization required.
  if (!authRequired()) {
    return localAdmin;
  }

  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) {
    // Fail closed only when auth was explicitly requested without a password.
    return { user: null };
  }

  const provided = extractPassword(req.headers.authorization);
  if (provided && safeEqual(provided, expected)) {
    return localAdmin;
  }

  return { user: null };
};

const createCaller = trpc.createCallerFactory(appRouter);
export const tServer = createCaller(localAdmin); // @deprecated
