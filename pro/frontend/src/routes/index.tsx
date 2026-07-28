/** @evidence index-DTKnr6h1.js:37911 ome → navigate Js("bot") */
import { createRoute, redirect } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { PATHS } from "@/lib/contracts";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: PATHS.botIndex });
  },
});
