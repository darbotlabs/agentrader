/**
 * @evidence index-DTKnr6h1.js:249635–249677 LVe/RVe tree
 * LayoutDashboard*Route keys are explicit survivors.
 */
import { Route as rootRoute } from "./routes/__root";
import { Route as indexRoute } from "./routes/index";
import { Route as layoutRoute } from "./routes/_layout";
import { Route as loginRoute } from "./routes/_layout/dashboard/login";
import { Route as settingsRoute } from "./routes/_layout/dashboard/settings";
import { Route as accountsRoute } from "./routes/_layout/dashboard/accounts";
import { Route as strategiesRoute } from "./routes/_layout/dashboard/strategies";
import { Route as botIndexRoute } from "./routes/_layout/dashboard/bot/index";
import { Route as botIdRoute } from "./routes/_layout/dashboard/bot/$id";
import { Route as botCreateRoute } from "./routes/_layout/dashboard/bot/create";
import { Route as botEditIdRoute } from "./routes/_layout/dashboard/bot/edit.$id";
import { Route as gridBotCreateRoute } from "./routes/_layout/dashboard/grid-bot/create";
import { Route as gridBotIdRoute } from "./routes/_layout/dashboard/grid-bot/$id";
import { Route as gridBotEditIdRoute } from "./routes/_layout/dashboard/grid-bot/edit.$id";
import { Route as dcaBotCreateRoute } from "./routes/_layout/dashboard/dca-bot/create";
import { Route as dcaBotIdRoute } from "./routes/_layout/dashboard/dca-bot/$id";
import { Route as dcaBotEditIdRoute } from "./routes/_layout/dashboard/dca-bot/edit.$id";

const LayoutDashboardAccountsRoute = accountsRoute;
const LayoutDashboardLoginRoute = loginRoute;
const LayoutDashboardSettingsRoute = settingsRoute;
const LayoutDashboardStrategiesRoute = strategiesRoute;
const LayoutDashboardBotIdRoute = botIdRoute;
const LayoutDashboardBotCreateRoute = botCreateRoute;
const LayoutDashboardDcaBotIdRoute = dcaBotIdRoute;
const LayoutDashboardDcaBotCreateRoute = dcaBotCreateRoute;
const LayoutDashboardGridBotIdRoute = gridBotIdRoute;
const LayoutDashboardGridBotCreateRoute = gridBotCreateRoute;
const LayoutDashboardBotIndexRoute = botIndexRoute;
const LayoutDashboardBotEditIdRoute = botEditIdRoute;
const LayoutDashboardDcaBotEditIdRoute = dcaBotEditIdRoute;
const LayoutDashboardGridBotEditIdRoute = gridBotEditIdRoute;

const layoutRouteWithChildren = layoutRoute.addChildren([
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
]);

export const routeTree = rootRoute.addChildren([indexRoute, layoutRouteWithChildren]);
