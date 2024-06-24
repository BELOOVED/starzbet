import { createRootReducer, type TReducer } from "@sb/utils";
import {
  betSlipAcceptChangesAction,
  betSlipCancelPlaceBetAction,
  betSlipChangeBetAction,
  betSlipChangeBetGroupAction,
  betSlipChangeDefaultAmountAction,
  betSlipChangeMultipleSingleAction,
  betSlipChangePromotionBonusAction,
  betSlipChangeRepetitionPickAction,
  betSlipChangeSystemHashAction,
  betSlipChangeTabAction,
  betSlipChangeTabWithResetAction,
  betSlipChangeVirtualGamePickAction,
  betSlipCompletePlaceBetAction,
  betSlipCreateBatchPickAction,
  betSlipCreatePickAction,
  betSlipDisablePickAction,
  betSlipDisableVisibleAction,
  betSlipEnableVisibleAction,
  betSlipFinishCompleteAction,
  betSlipPickAnyPlaceAction,
  betSlipPickPlaceAction,
  betSlipRejectPlaceBetAction,
  betSlipRemoveAllPickAction,
  betSlipRemoveAllVirtualGamePickAction,
  betSlipRemovePickAction,
  betSlipRemovePlaceAction,
  betSlipRemoveVirtualGamePickAction,
  betSlipSetFreeBetAction,
  betSlipSetFreeBetParlayAction,
  betSlipSetMinimizeAction,
  betSlipSetPositionAction,
  betSlipSetUseBonusBalanceAction,
  betSlipSetUseBonusBalanceForParlayAction,
  betSlipStartPlaceBetAction,
  betSlipToggleBankerAction,
  changeApplyBoostForBetAction,
} from "../BetSlipActions";
import { type IWithBetSlipState } from "../BetSlipState";
import { betSlipRemoveAllPickReducer } from "./BetSlipRemoveAllPickReducer";
import { betSlipChangeTabReducer, betSlipChangeTabWithResetReducer } from "./BetSlipChangeTabReducer";
import { betSlipCreatePickReducer } from "./BetSlipCreatePickReducer";
import { betSlipRemovePickReducer } from "./BetSlipRemovePickReducer";
import { betSlipChangeBetReducer } from "./BetSlipChangeBetReducer";
import { betSlipChangeMultipleSingleReducer } from "./BetSlipChangeMultipleSingleReducer";
import { betSlipStartPlaceBetReducer } from "./BetSlipStartPlaceBetReducer";
import { betSlipCompletePlaceBetReducer } from "./BetSlipCompletePlaceBetReducer";
import { betSlipRejectPlaceBetReducer } from "./BetSlipRejectPlaceBetReducer";
import { betSlipCancelPlaceBetReducer } from "./BetSlipCancelPlaceBetReducer";
import { changeApplyBoostForBetReducer } from "./ChangeApplyBoostForBetReducer";
import { betSlipDisableVisibleReducer } from "./BetSlipDisableVisibleReducer";
import { betSlipFinishCompleteReducer } from "./BetSlipFinishCompleteReducer";
import { betSlipAcceptChangesReducer } from "./BetSlipAcceptChangesReducer";
import { betSlipEnableVisibleReducer } from "./BetSlipEnableVisibleReducer";
import { betSlipChangeBetGroupReducer } from "./BetSlipChangeBetGroupReducer";
import { betSlipChangeDefaultAmountReducer } from "./BetSlipChangeDefaultAmountReducer";
import { betSlipDisablePickReducer } from "./BetSlipDisablePickReducer";
import { betSlipToggleBankerReducer } from "./BetSlipToggleBankerReducer";
import { betSlipSetMinimizeReducer } from "./BetSlipSetMinimizeReducer";
import { betSlipSetPositionReducer } from "./BetSlipSetPositionReducer";
import {
  betSlipSetFreeBetParlayReducer,
  betSlipSetFreeBetReducer,
  betSlipSetUseBonusBalanceParlayReducer,
  betSlipSetUseBonusBalanceReducer,
} from "./BetSlipSetFreeBetReducer";
import { betSlipChangeSystemHashReducer } from "./BetSlipChangeSystemHashReducer";
import { betSlipCastAnyPickReducer, betSlipCastPickReducer, betSlipCastRemoveReducer } from "./BetSlipCastPickReducer";
import { betSlipCreateBatchPickReducer } from "./BetSlipCreateBatchPickReducer";
import { betSlipChangeVirtualGamePickReducer } from "./BetSlipChangeVirtualGamePickReducer";
import { betSlipRemoveAllVirtualGamePickReducer } from "./BetSlipRemoveAllVirtualGamePickReducer";
import { betSlipRemoveVirtualGamePickReducer } from "./BetSlipRemoveVirtualGamePickReducer";
import { betSlipChangeRepetitionPickReducer } from "./BetSlipChangeRepetitionPickReducer";

const betSlipChangePromotionBonusReducer: TReducer<IWithBetSlipState, typeof betSlipChangePromotionBonusAction> = (
  state,
  { payload: { promotionBonusId } },
) => ({ ...state, betSlip: { ...state.betSlip, promotionBonusId } });

const betSlipRootReducer = createRootReducer([
  [betSlipRemoveAllPickReducer, betSlipRemoveAllPickAction],
  [betSlipChangeTabReducer, betSlipChangeTabAction],
  [betSlipChangeTabWithResetReducer, betSlipChangeTabWithResetAction],
  [betSlipCreatePickReducer, betSlipCreatePickAction],
  [betSlipRemovePickReducer, betSlipRemovePickAction],
  [betSlipChangeBetReducer, betSlipChangeBetAction],
  [betSlipChangeMultipleSingleReducer, betSlipChangeMultipleSingleAction],
  [betSlipStartPlaceBetReducer, betSlipStartPlaceBetAction],
  [betSlipCompletePlaceBetReducer, betSlipCompletePlaceBetAction],
  [betSlipRejectPlaceBetReducer, betSlipRejectPlaceBetAction],
  [betSlipCancelPlaceBetReducer, betSlipCancelPlaceBetAction],
  [changeApplyBoostForBetReducer, changeApplyBoostForBetAction],
  [betSlipDisableVisibleReducer, betSlipDisableVisibleAction],
  [betSlipFinishCompleteReducer, betSlipFinishCompleteAction],
  [betSlipAcceptChangesReducer, betSlipAcceptChangesAction],
  [betSlipEnableVisibleReducer, betSlipEnableVisibleAction],
  [betSlipChangeBetGroupReducer, betSlipChangeBetGroupAction],
  [betSlipChangeDefaultAmountReducer, betSlipChangeDefaultAmountAction],
  [betSlipDisablePickReducer, betSlipDisablePickAction],
  [betSlipToggleBankerReducer, betSlipToggleBankerAction],
  [betSlipSetMinimizeReducer, betSlipSetMinimizeAction],
  [betSlipSetPositionReducer, betSlipSetPositionAction],
  [betSlipSetFreeBetReducer, betSlipSetFreeBetAction],
  [betSlipSetFreeBetParlayReducer, betSlipSetFreeBetParlayAction],
  [betSlipSetUseBonusBalanceReducer, betSlipSetUseBonusBalanceAction],
  [betSlipSetUseBonusBalanceParlayReducer, betSlipSetUseBonusBalanceForParlayAction],
  [betSlipChangeSystemHashReducer, betSlipChangeSystemHashAction],
  [betSlipChangePromotionBonusReducer, betSlipChangePromotionBonusAction],
  [betSlipCastPickReducer, betSlipPickPlaceAction],
  [betSlipCastAnyPickReducer, betSlipPickAnyPlaceAction],
  [betSlipCastRemoveReducer, betSlipRemovePlaceAction],
  [betSlipCreateBatchPickReducer, betSlipCreateBatchPickAction],
  [betSlipChangeVirtualGamePickReducer, betSlipChangeVirtualGamePickAction],
  [betSlipRemoveVirtualGamePickReducer, betSlipRemoveVirtualGamePickAction],
  [betSlipRemoveAllVirtualGamePickReducer, betSlipRemoveAllVirtualGamePickAction],
  [betSlipChangeRepetitionPickReducer, betSlipChangeRepetitionPickAction],
]);

export { betSlipRootReducer };
