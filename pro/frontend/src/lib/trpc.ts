/**
 * Self-hosted AgentTrader: open access by default.
 * Optional Authorization only when ADMIN_PASSWORD is set in localStorage
 * (used if operator enables AGENTTRADER_REQUIRE_AUTH on the daemon).
 */
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { getAdminPassword, getAppUrl } from "./storage";
import { TRPC_PATH } from "./contracts";

// Untyped client until AppRouter is linked via workspace build of @agentrader/trpc.
// Procedure names match packages/trpc appRouter (verified against dist).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc: any = createTRPCReact();

export function createTrpcClient() {
  const url = `${getAppUrl().replace(/\/$/, "")}${TRPC_PATH}`;
  return trpc.createClient({
    links: [
      httpBatchLink({
        url,
        transformer: superjson,
        headers() {
          // Default open self-host: no Authorization.
          // If user stored a password (optional lock mode), send it.
          const password = getAdminPassword();
          return password ? { Authorization: password } : {};
        },
      }),
    ],
  });
}
