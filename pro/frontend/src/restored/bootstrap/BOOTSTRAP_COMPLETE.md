# Bootstrap unfry COMPLETE

Previously remaining: **42**
Now remaining in bootstrap list: **0**

## Restored in this pass

| Mangled | Restored | Role |
| --- | --- | --- |
| `yo` | `layoutRoute` | layout parent after update |
| `yVe` | `IndexRoute` | tree key IndexRoute |
| `wVe` | `LayoutDashboardStrategiesRoute` | tree key |
| `bVe` | `LayoutDashboardSettingsRoute` | tree key |
| `kVe` | `LayoutDashboardLoginRoute` | tree key |
| `SVe` | `LayoutDashboardAccountsRoute` | tree key |
| `vVe` | `LayoutDashboardBotIndexRoute` | tree key |
| `TVe` | `LayoutDashboardGridBotCreateRoute` | tree key |
| `OVe` | `LayoutDashboardGridBotIdRoute` | tree key |
| `xVe` | `LayoutDashboardDcaBotCreateRoute` | tree key |
| `PVe` | `LayoutDashboardDcaBotIdRoute` | tree key |
| `IVe` | `LayoutDashboardBotCreateRoute` | tree key |
| `CVe` | `LayoutDashboardBotIdRoute` | tree key |
| `_Ve` | `LayoutDashboardGridBotEditIdRoute` | tree key |
| `MVe` | `LayoutDashboardDcaBotEditIdRoute` | tree key |
| `LVe` | `layoutDashboardChildren` | children map |
| `BVe` | `layoutRouteWithChildren` | layout+children |
| `RVe` | `rootChildren` | Index+Layout map |
| `NVe` | `routeTree` | full tree |
| `EVe` | `history` | history instance |
| `DVe` | `router` | router instance |
| `W3` | `domRoot` | document.getElementById('root') |
| `nme` | `LayoutFileRoute` | ea("/_layout") |
| `ame` | `IndexFileRoute` | ea("/") |
| `swe` | `StrategiesFileRoute` | strategies |
| `owe` | `SettingsFileRoute` | settings |
| `cwe` | `LoginFileRoute` | login |
| `Ake` | `AccountsFileRoute` | accounts |
| `zke` | `BotIndexFileRoute` | bot index |
| `Qke` | `GridBotCreateFileRoute` | grid create lazy |
| `J7` | `GridBotIdFileRoute` | grid $id |
| `m5e` | `DcaBotCreateFileRoute` | dca create |
| `Dz` | `DcaBotIdFileRoute` | dca $id |
| `Xz` | `BotCreateFileRoute` | bot create |
| `Qz` | `BotIdFileRoute` | bot $id |
| `lVe` | `GridBotEditFileRoute` | grid edit lazy |
| `fVe` | `DcaBotEditFileRoute` | dca edit lazy |
| `KB` | `rootRoute` | createRootRoute |
| `NK` | `createBrowserHistory` | hash history factory |
| `XX` | `createRouter` | (opts) => new Router(opts) |
| `MK` | `ReactDOM` | createRoot host |
| `ZX` | `RouterProvider` | RouterProvider |

## Verify

```json
{
  "ok": true,
  "bootstrapBindingsTarget": 42,
  "bootstrapBindingsEmitted": 42,
  "remainingInBootstrapList": 0,
  "corePageAlreadyRestored": 11,
  "totalNamedInSnippetBootstrap": 53,
  "checks": [
    {
      "key": "IndexRoute",
      "path": "/",
      "ok": true
    },
    {
      "key": "LayoutDashboardStrategiesRoute",
      "path": "/dashboard/strategies",
      "ok": true
    },
    {
      "key": "LayoutDashboardSettingsRoute",
      "path": "/dashboard/settings",
      "ok": true
    },
    {
      "key": "LayoutDashboardLoginRoute",
      "path": "/dashboard/login",
      "ok": true
    },
    {
      "key": "LayoutDashboardAccountsRoute",
      "path": "/dashboard/accounts",
      "ok": true
    },
    {
      "key": "LayoutDashboardBotIndexRoute",
      "path": "/dashboard/bot/",
      "ok": true
    },
    {
      "key": "LayoutDashboardGridBotCreateRoute",
      "path": "/dashboard/grid-bot/create",
      "ok": true
    },
    {
      "key": "LayoutDashboardGridBotIdRoute",
      "path": "/dashboard/grid-bot/$id",
      "ok": true
    },
    {
      "key": "LayoutDashboardDcaBotCreateRoute",
      "path": "/dashboard/dca-bot/create",
      "ok": true
    },
    {
      "key": "LayoutDashboardDcaBotIdRoute",
      "path": "/dashboard/dca-bot/$id",
      "ok": true
    },
    {
      "key": "LayoutDashboardBotCreateRoute",
      "path": "/dashboard/bot/create",
      "ok": true
    },
    {
      "key": "LayoutDashboardBotIdRoute",
      "path": "/dashboard/bot/$id",
      "ok": true
    },
    {
      "key": "LayoutDashboardGridBotEditIdRoute",
      "path": "/dashboard/grid-bot/edit/$id",
      "ok": true
    },
    {
      "key": "LayoutDashboardDcaBotEditIdRoute",
      "path": "/dashboard/dca-bot/edit/$id",
      "ok": true
    },
    {
      "key": "LayoutDashboardBotEditIdRoute",
      "path": "/dashboard/bot/edit/$id",
      "ok": true
    }
  ]
}
```
