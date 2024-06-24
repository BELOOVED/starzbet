import {
  sportsbookui_betStatus_canceled,
  sportsbookui_betStatus_cashedOut,
  sportsbookui_betStatus_lost,
  sportsbookui_betStatus_partialLost,
  sportsbookui_betStatus_partialWon,
  sportsbookui_betStatus_pending,
  sportsbookui_betStatus_return,
  sportsbookui_betStatus_unknown,
  sportsbookui_betStatus_won,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { ESportsbook_BetStatusEnum } from "@sb/graphql-client";

/**
 * @deprecated
 * todo replace on ESportsbook_BetStatusEnum
 */
const betStatusEnum = {
  pending: "pending",
  win: "win",
  loss: "loss",
  partialWin: "partial_win",
  partialLoss: "partial_loss",
  return: "return",
  cashOuted: "cash_outed",
  canceled: "canceled",
};

const betStatusTKeys: Record<ESportsbook_BetStatusEnum, TCommonTKeys> = {
  [ESportsbook_BetStatusEnum.pending]: sportsbookui_betStatus_pending,
  [ESportsbook_BetStatusEnum.win]: sportsbookui_betStatus_won,
  [ESportsbook_BetStatusEnum.loss]: sportsbookui_betStatus_lost,
  [ESportsbook_BetStatusEnum.partialWin]: sportsbookui_betStatus_partialWon,
  [ESportsbook_BetStatusEnum.partialLoss]: sportsbookui_betStatus_partialLost,
  [ESportsbook_BetStatusEnum.return]: sportsbookui_betStatus_return,
  [ESportsbook_BetStatusEnum.cashOuted]: sportsbookui_betStatus_cashedOut,
  [ESportsbook_BetStatusEnum.canceled]: sportsbookui_betStatus_canceled,
  [ESportsbook_BetStatusEnum.unknown]: sportsbookui_betStatus_unknown,
};

interface IWithBetStatus {
    betStatus: ESportsbook_BetStatusEnum;
}

const isCanceled = (bet: IWithBetStatus) => bet.betStatus === ESportsbook_BetStatusEnum.canceled;

const isCashOuted = (bet: IWithBetStatus) => bet.betStatus === ESportsbook_BetStatusEnum.cashOuted;

const isPending = (bet: IWithBetStatus) => bet.betStatus === ESportsbook_BetStatusEnum.pending;

export {
  betStatusEnum,
  betStatusTKeys,
  isCanceled,
  isCashOuted,
  isPending,
};
