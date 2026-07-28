import type { SmartTradeEntity_Order_Order } from "@agentrader/db";
import { toSmartTradeEntity, xprisma } from "@agentrader/db";
import { XEntityType, XOrderStatus } from "@agentrader/types";
import type { Context } from "../../../../utils/context.js";
import type { TGetCompletedSmartTradesInputSchema } from "./schema.js";

type Options = {
  ctx: {
    user: NonNullable<Context["user"]>;
  };
  input: TGetCompletedSmartTradesInputSchema;
};

export async function getCompletedSmartTrades({ ctx, input }: Options) {
  const smartTrades = await xprisma.smartTrade.findMany({
    where: {
      entryType: "Order",
      takeProfitType: "Order",
      owner: { id: ctx.user.id },
      bot: { id: input.botId },
      orders: {
        some: {
          OR: [
            { entityType: XEntityType.TakeProfitOrder, status: XOrderStatus.Filled },
            { entityType: XEntityType.StopLossOrder, status: XOrderStatus.Filled },
          ],
        },
      },
    },
    include: {
      orders: true,
      exchangeAccount: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const smartTradesDto = smartTrades.map(toSmartTradeEntity) as SmartTradeEntity_Order_Order[]; // more concrete type (need to add a generic prop to "toSmartTradeEntity()")

  return smartTradesDto;
}
