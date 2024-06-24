import {
  sportsbookui_betStatus_halfLost,
  sportsbookui_betStatus_halfWon,
  sportsbookui_betStatus_lost,
  sportsbookui_betStatus_pending,
  sportsbookui_betStatus_return,
  sportsbookui_betStatus_void,
  sportsbookui_betStatus_won,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";

const pickResultTKeys: Record<EOutcomeResult, TCommonTKeys> = {
  [EOutcomeResult.no_result]: sportsbookui_betStatus_pending,
  [EOutcomeResult.win]: sportsbookui_betStatus_won,
  [EOutcomeResult.loss]: sportsbookui_betStatus_lost,
  [EOutcomeResult.half_win]: sportsbookui_betStatus_halfWon,
  [EOutcomeResult.half_loss]: sportsbookui_betStatus_halfLost,
  [EOutcomeResult._return]: sportsbookui_betStatus_return,
  [EOutcomeResult.void]: sportsbookui_betStatus_void,
  [EOutcomeResult.partial_win]: sportsbookui_betStatus_halfWon, //todo change
};

export { pickResultTKeys };
