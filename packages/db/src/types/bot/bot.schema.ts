import { z } from "zod";
import { zt } from "@agentrader/prisma";
import { ZBotSettings, ZBotState, ZDcaBotSettings, ZGridBotSettings } from "@agentrader/types";

export const ZBot = zt.BotSchema.extend({
  settings: ZBotSettings,
  state: ZBotState,
});
export type TBot = z.infer<typeof ZBot>;

export const ZDcaBot = zt.BotSchema.extend({
  settings: ZDcaBotSettings,
  state: ZBotState,
});
export type TDcaBot = z.infer<typeof ZDcaBot>;

export const ZGridBot = zt.BotSchema.extend({
  settings: ZGridBotSettings,
  state: ZBotState,
});
export type TGridBot = z.infer<typeof ZGridBot>;
