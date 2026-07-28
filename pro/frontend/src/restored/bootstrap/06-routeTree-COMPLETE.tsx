/**
 * RESTORED by Minifryer Unfry — bootstrap COMPLETE
 * @evidence index-DTKnr6h1.js:249624–249681 (assembly) + ea sites listed per route
 *
 * All 42 previously-open bootstrap bindings are named and wired here.
 * Page components live in ./pages/* with their own @evidence lines.
 */

import {
  createFileRoute,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "./history"; // NK @8565 — hash history for this build
import { DashboardBotEditIdPage } from "../bot-edit/01-page-DashboardBotEditIdPage";
import * as Pages from "./pages";

// --- Runtime (was NK, XX, MK, ZX) ---
/** @evidence index-DTKnr6h1.js:8565 NK — hash-based browser history */
export { createBrowserHistory };

/** @evidence index-DTKnr6h1.js:12875 XX */
export function createRouter(options) {
  return new Router(options); // QX extends rX
}

/** @evidence index-DTKnr6h1.js:12890 ZX */
export function RouterProvider({ router, ...rest }) {
  return jsx(RouterProviderInner, { router, ...rest });
}

/** @evidence index-DTKnr6h1.js:8140 MK */
export const ReactDOM = /* pT(_K) */ requireReactDom();

// --- File routes (ea path strings are EXPLICIT) ---
/** @evidence :37878 */
export const LayoutFileRoute = createFileRoute("/_layout")({
  component: Pages.DashboardLayout,
});
/** @evidence :37910 */
export const IndexFileRoute = createFileRoute("/")({
  component: Pages.IndexRedirectPage,
});
/** @evidence :43673 */
export const StrategiesFileRoute = createFileRoute("/_layout/dashboard/strategies")({
  component: Pages.StrategiesPage,
});
/** @evidence :43709 */
export const SettingsFileRoute = createFileRoute("/_layout/dashboard/settings")({
  component: Pages.SettingsPage,
});
/** @evidence :43778 */
export const LoginFileRoute = createFileRoute("/_layout/dashboard/login")({
  component: Pages.LoginPage,
});
/** @evidence :47013 */
export const AccountsFileRoute = createFileRoute("/_layout/dashboard/accounts")({
  component: Pages.AccountsPage,
});
/** @evidence :47368 */
export const BotIndexFileRoute = createFileRoute("/_layout/dashboard/bot/")({
  component: Pages.BotsPage,
});
/** @evidence :47455 + lazy Xke */
export const GridBotCreateFileRoute = createFileRoute("/_layout/dashboard/grid-bot/create")({
  component: Pages.GridBotCreatePageLazy,
});
/** @evidence :237281 */
export const GridBotIdFileRoute = createFileRoute("/_layout/dashboard/grid-bot/$id")({
  component: Pages.GridBotIdPage,
});
/** @evidence :243636 */
export const DcaBotCreateFileRoute = createFileRoute("/_layout/dashboard/dca-bot/create")({
  component: Pages.DcaBotCreatePage,
});
/** @evidence :243764 */
export const DcaBotIdFileRoute = createFileRoute("/_layout/dashboard/dca-bot/$id")({
  component: Pages.DcaBotIdPage,
});
/** @evidence :249353 validateSearch.strategy */
export const BotCreateFileRoute = createFileRoute("/_layout/dashboard/bot/create")({
  component: Pages.BotCreatePage,
  validateSearch: (search) => ({ strategy: search.strategy || undefined }),
});
/** @evidence :249545 */
export const BotIdFileRoute = createFileRoute("/_layout/dashboard/bot/$id")({
  component: Pages.BotIdPage,
});
/** @evidence :249552 lazy */
export const GridBotEditFileRoute = createFileRoute("/_layout/dashboard/grid-bot/edit/$id")({
  component: Pages.GridBotEditPageLazy,
});
/** @evidence :249554 lazy */
export const DcaBotEditFileRoute = createFileRoute("/_layout/dashboard/dca-bot/edit/$id")({
  component: Pages.DcaBotEditPageLazy,
});
/** @evidence :249634 + bot-edit unit */
export const DashboardBotEditIdRoute = createFileRoute("/_layout/dashboard/bot/edit/$id")({
  component: DashboardBotEditIdPage,
});
/** @evidence :35814 */
export const rootRoute = createRootRoute({
  component: Pages.RootProviders,
});

// --- Tree assembly (exact structure from :249635–249679) ---
/** was yo */
export const layoutRoute = LayoutFileRoute.update({
  id: "/_layout",
  getParentRoute: () => rootRoute,
});
/** was yVe */
export const IndexRoute = IndexFileRoute.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
});
/** was wVe…AVe — public paths EXPLICIT in dist */
export const LayoutDashboardStrategiesRoute = StrategiesFileRoute.update({
  id: "/dashboard/strategies",
  path: "/dashboard/strategies",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardSettingsRoute = SettingsFileRoute.update({
  id: "/dashboard/settings",
  path: "/dashboard/settings",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardLoginRoute = LoginFileRoute.update({
  id: "/dashboard/login",
  path: "/dashboard/login",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardAccountsRoute = AccountsFileRoute.update({
  id: "/dashboard/accounts",
  path: "/dashboard/accounts",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardBotIndexRoute = BotIndexFileRoute.update({
  id: "/dashboard/bot/",
  path: "/dashboard/bot/",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardGridBotCreateRoute = GridBotCreateFileRoute.update({
  id: "/dashboard/grid-bot/create",
  path: "/dashboard/grid-bot/create",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardGridBotIdRoute = GridBotIdFileRoute.update({
  id: "/dashboard/grid-bot/$id",
  path: "/dashboard/grid-bot/$id",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardDcaBotCreateRoute = DcaBotCreateFileRoute.update({
  id: "/dashboard/dca-bot/create",
  path: "/dashboard/dca-bot/create",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardDcaBotIdRoute = DcaBotIdFileRoute.update({
  id: "/dashboard/dca-bot/$id",
  path: "/dashboard/dca-bot/$id",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardBotCreateRoute = BotCreateFileRoute.update({
  id: "/dashboard/bot/create",
  path: "/dashboard/bot/create",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardBotIdRoute = BotIdFileRoute.update({
  id: "/dashboard/bot/$id",
  path: "/dashboard/bot/$id",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardGridBotEditIdRoute = GridBotEditFileRoute.update({
  id: "/dashboard/grid-bot/edit/$id",
  path: "/dashboard/grid-bot/edit/$id",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardDcaBotEditIdRoute = DcaBotEditFileRoute.update({
  id: "/dashboard/dca-bot/edit/$id",
  path: "/dashboard/dca-bot/edit/$id",
  getParentRoute: () => layoutRoute,
});
export const LayoutDashboardBotEditIdRoute = DashboardBotEditIdRoute.update({
  id: "/dashboard/bot/edit/$id",
  path: "/dashboard/bot/edit/$id",
  getParentRoute: () => layoutRoute,
});

/** was LVe — keys are EXPLICIT survivors */
export const layoutDashboardChildren = {
  LayoutDashboardAccountsRoute,
  LayoutDashboardLoginRoute,
  LayoutDashboardSettingsRoute,
  LayoutDashboardStrategiesRoute,
  LayoutDashboardBotIdRoute,
  LayoutDashboardBotCreateRoute,
  LayoutDashboardDcaBotIdRoute,
  LayoutDashboardDcaBotCreateRoute,
  LayoutDashboardGridBotIdRoute,
  LayoutDashboardGridBotCreateRoute,
  LayoutDashboardBotIndexRoute,
  LayoutDashboardBotEditIdRoute,
  LayoutDashboardDcaBotEditIdRoute,
  LayoutDashboardGridBotEditIdRoute,
} as const;

/** was BVe */
export const layoutRouteWithChildren = layoutRoute._addFileChildren(layoutDashboardChildren);
/** was RVe */
export const rootChildren = {
  IndexRoute,
  LayoutRoute: layoutRouteWithChildren,
} as const;
/** was NVe */
export const routeTree = rootRoute._addFileChildren(rootChildren)._addFileTypes();
/** was EVe = NK() */
export const history = createBrowserHistory();
/** was DVe */
export const router = createRouter({ routeTree, history });

/** was W3 + MK.createRoot mount @249680–249681 */
export function mountApp() {
  const domRoot = document.getElementById("root");
  if (domRoot && !domRoot.innerHTML) {
    ReactDOM.createRoot(domRoot).render(
      jsx(React.StrictMode, {
        children: jsx(RouterProvider, { router }),
      }),
    );
  }
}

export const PUBLIC_PATHS = {
  "IndexRoute": "/",
  "LayoutDashboardStrategiesRoute": "/dashboard/strategies",
  "LayoutDashboardSettingsRoute": "/dashboard/settings",
  "LayoutDashboardLoginRoute": "/dashboard/login",
  "LayoutDashboardAccountsRoute": "/dashboard/accounts",
  "LayoutDashboardBotIndexRoute": "/dashboard/bot/",
  "LayoutDashboardGridBotCreateRoute": "/dashboard/grid-bot/create",
  "LayoutDashboardGridBotIdRoute": "/dashboard/grid-bot/$id",
  "LayoutDashboardDcaBotCreateRoute": "/dashboard/dca-bot/create",
  "LayoutDashboardDcaBotIdRoute": "/dashboard/dca-bot/$id",
  "LayoutDashboardBotCreateRoute": "/dashboard/bot/create",
  "LayoutDashboardBotIdRoute": "/dashboard/bot/$id",
  "LayoutDashboardGridBotEditIdRoute": "/dashboard/grid-bot/edit/$id",
  "LayoutDashboardDcaBotEditIdRoute": "/dashboard/dca-bot/edit/$id",
  "LayoutDashboardBotEditIdRoute": "/dashboard/bot/edit/$id"
} as const;
