import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "@agentrader/trpc";
import { createContext } from "./trpc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STARTED_AT = Date.now();
const SERVICE_VERSION = process.env.AGENTTRADER_VERSION || "1.0.0-beta.29";

let requestCount = 0;
let lastRequestAt: number | null = null;
let lastTrpcPath: string | null = null;

export type CreateServerOptions = {
  frontendDistPath: string;
  port: number;
  host: string;
};

function isAuthRequired(): boolean {
  const flag = (process.env.AGENTTRADER_REQUIRE_AUTH || process.env.REQUIRE_AUTH || "")
    .trim()
    .toLowerCase();
  return flag === "1" || flag === "true" || flag === "yes";
}

/**
 * Fastify server: pro UI static + tRPC + public health/metrics.
 */
export const createServer = (params: CreateServerOptions) => {
  const fastify = Fastify({
    logger: false,
    maxParamLength: 1000,
    genReqId: (req) => {
      const incoming = req.headers["x-request-id"];
      if (typeof incoming === "string" && incoming.length > 0) return incoming;
      return randomUUID();
    },
  });
  const staticDir = path.join(__dirname, params.frontendDistPath);
  const indexHtml = path.join(staticDir, "index.html");

  fastify.register(fastifyCors, {
    origin: true,
  });

  // Traceability + light metrics on every request
  fastify.addHook("onRequest", async (request, reply) => {
    requestCount += 1;
    lastRequestAt = Date.now();
    const url = request.raw.url || "";
    if (url.startsWith("/api/trpc")) {
      lastTrpcPath = url.split("?")[0] || url;
    }
    reply.header("x-request-id", request.id);
    reply.header("x-agentrader-version", SERVICE_VERSION);
  });

  // Public liveness / readiness for launchers and UI status strip
  fastify.get("/api/health", async () => ({
    ok: true,
    service: "agentrader",
    version: SERVICE_VERSION,
    mode: "self-hosted",
    authRequired: isAuthRequired(),
    ui: "pro-native",
    pid: process.pid,
    startedAt: new Date(STARTED_AT).toISOString(),
    uptimeSec: Math.floor((Date.now() - STARTED_AT) / 1000),
    requestCount,
    lastRequestAt: lastRequestAt ? new Date(lastRequestAt).toISOString() : null,
    lastTrpcPath,
    host: params.host,
    port: params.port,
    openAccess: !isAuthRequired(),
  }));

  // Lightweight metrics (same as health, stable path for scrapers)
  fastify.get("/api/metrics", async (_req, reply) => {
    reply.type("application/json");
    return {
      ok: true,
      requestCount,
      uptimeSec: Math.floor((Date.now() - STARTED_AT) / 1000),
      lastTrpcPath,
    };
  });

  fastify.register(fastifyStatic, {
    root: staticDir,
    prefix: "/",
    wildcard: false,
  });

  fastify.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });

  // Pro UI SPA deep-link support
  fastify.setNotFoundHandler((request, reply) => {
    const url = request.raw.url || "";
    if (url.startsWith("/api/")) {
      return reply.code(404).send({
        ok: false,
        error: "not_found",
        path: url,
        requestId: request.id,
      });
    }
    if (existsSync(indexHtml)) {
      const html = readFileSync(indexHtml, "utf8");
      return reply.type("text/html").send(html);
    }
    return reply
      .code(404)
      .send("UI not found - build pro/frontend and sync to app/frontend");
  });

  return {
    app: fastify,
    server: fastify.server,
    listen: async () => {
      await fastify.listen({ port: params.port, host: params.host });
    },
    close: async () => {
      await fastify.close();
    },
  };
};
