/** @evidence index-DTKnr6h1.js:37878 nme + rme */
import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { AppShell } from "@/components/AppShell";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  id: "/_layout",
  component: AppShell,
});
