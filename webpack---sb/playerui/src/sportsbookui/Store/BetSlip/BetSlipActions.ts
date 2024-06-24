// @ts-nocheck

import { type TPickKind } from "./Model/BetPick";
import { type EBetGroup } from "./Model/BetGroup";

const betSlipCreatePickAction = (kind: TPickKind, id: string) => ({
  type: "@BET_SLIP/CREATE_PICK",
  payload: { kind, id },
});

const betSlipCreateBatchPickAction = (kind, ids) => ({
  type: "@BET_SLIP/CREATE_BATCH_PICK",
  payload: { kind, ids },
});

const betSlipRemovePickAction = (id) => ({
  type: "@BET_SLIP/REMOVE_PICK",
  payload: { id },
});

const betSlipRemoveAllPickAction = () => ({
  type: "@BET_SLIP/REMOVE_ALL_PICK",
});

const betSlipChangeTabAction = (tab) => ({
  type: "@BET_SLIP/CHANGE_TAB",
  payload: { tab },
});

const betSlipChangeTabWithResetAction = (tab) => ({
  type: "@BET_SLIP/CHANGE_TAB_WITH_RESET",
  payload: { tab },
});

const betSlipChangeBetAction = (hash, outcomeId, stake, input) => ({
  type: "@BET_SLIP/CHANGE_BET",
  payload: {
    hash,
    outcomeId,
    stake,
    input,
  },
});

const betSlipChangeMultipleSingleAction = (stake, input) => ({
  type: "@BET_SLIP/CHANGE_MULTIPLE_SINGLE",
  payload: { stake, input },
});

const betSlipPlaceBetAction = (keep = false, byGroup: string) => ({
  type: "@BET_SLIP/PLACE_BET",
  payload: { keep, byGroup },
});

const betSlipCompletePlaceBetAction = (keep: boolean) => ({
  type: "@BET_SLIP/COMPLETE_PLACE_BET",
  payload: { keep },
});

const betSlipRejectPlaceBetAction = (error) => ({
  type: "@BET_SLIP/REJECT_PLACE_BET",
  payload: { error },
});

const betSlipCancelPlaceBetAction = () => ({
  type: "@BET_SLIP/CANCEL_PLACE_BET",
});

const betSlipStartPlaceBetAction = () => ({
  type: "@BET_SLIP/START_PLACE_BET",
});

const betSlipShareAction = () => ({
  type: "@BET_SLIP/SHARE",
});

const changeApplyBoostForBetAction = (path) => ({
  type: "@BET_SLIP/CHANGE_APPLY_BOOST_FOR_BET",
  payload: { path },
});

const betSlipEnableVisibleAction = () => ({
  type: "@BET_SLIP/ENABLE_VISIBLE",
});

const betSlipDisableVisibleAction = () => ({
  type: "@BET_SLIP/DISABLE_VISIBLE",
});

const betSlipFinishCompleteAction = () => ({
  type: "@BET_SLIP/FINISH_COMPLETE",
});

const betSlipAcceptChangesAction = () => ({
  type: "@BET_SLIP/ACCEPT_CHANGES",
});

const betSlipChangeBetGroupAction = (group: EBetGroup) => ({
  type: "@BET_SLIP/CHANGE_BET_GROUP",
  payload: { group },
});

const betSlipChangeDefaultAmountAction = (changeAmount) => ({
  type: "@BET_SLIP/CHANGE_DEFAULT_AMOUNT",
  payload: { changeAmount },
});

const betSlipDisablePickAction = (outcomeId, disable) => ({
  type: "@BET_SLIP/DISABLE_PICK",
  payload: { outcomeId, disable },
});

const betSlipToggleBankerAction = (outcomeId) => ({
  type: "@BET_SLIP/TOGGLE_BANKER",
  payload: { outcomeId },
});

const betSlipSetMinimizeAction = (minimize) => ({
  type: "@BET_SLIP/SET_MINIMIZE",
  payload: { minimize },
});

const betSlipSetPositionAction = (x: number, y: number) => ({
  type: "@BET_SLIP/SET_POSITION",
  payload: { x, y },
});

const betSlipSetFreeBetAction = (outcomeId: string, isFreeBetChecked: boolean, hash?: string) => ({
  type: "@BET_SLIP/SET_FREE_BET",
  payload: { outcomeId, isFreeBetChecked, hash },
});

const betSlipSetFreeBetParlayAction = (isFreeBetChecked) => ({
  type: "@BET_SLIP/SET_FREE_BET_PARLAY",
  payload: { isFreeBetChecked },
});

const betSlipSetUseBonusBalanceAction = (outcomeId: string, useBonusBalance: boolean, hash?: string) => ({
  type: "@BET_SLIP/SET_USE_BONUS_BALANCE",
  payload: { outcomeId, useBonusBalance, hash },
});

const betSlipSetUseBonusBalanceForParlayAction = (useBonusBalance) => ({
  type: "@BET_SLIP/SET_USE_BONUS_BALANCE_PARLAY",
  payload: { useBonusBalance },
});

const betSlipChangeSystemHashAction = (systemHash) => ({
  type: "@BET_SLIP/CHANGE_SYSTEM_HASH",
  payload: { systemHash },
});

const betSlipChangePromotionBonusAction = (promotionBonusId: string | null) => ({
  type: "@BET_SLIP/CHANGE_PROMOTION_BONUS",
  payload: { promotionBonusId },
});

const betSlipPickPlaceAction = (marketId, shortId, spot) => ({
  type: "@BET_SLIP/PICK_PLACE",
  payload: {
    marketId,
    shortId,
    spot,
  },
});

const betSlipPickAnyPlaceAction = (marketId, shortId) => ({
  type: "@BET_SLIP/PICK_ANY_PLACE",
  payload: {
    marketId,
    shortId,
  },
});

const betSlipRacingAddBetSlip = (eventId) => ({
  type: "@BET_SLIP/RACING_ADD_BET_SLIP",
  payload: {
    eventId,
  },
});

const betSlipRemovePlaceAction = (eventId) => ({
  type: "@BET_SLIP/REMOVE_PLACE",
  payload: {
    eventId,
  },
});

const betSlipChangeVirtualGamePickAction = (sportId, key) => ({
  type: "@BET_SLIP/CHANGE_VIRTUAL_GAME_PICK",
  payload: {
    sportId,
    key,
  },
});

const betSlipRemoveVirtualGamePickAction = (sportId, key) => ({
  type: "@BET_SLIP/REMOVE_VIRTUAL_GAME_PICK",
  payload: {
    sportId,
    key,
  },
});

const betSlipRemoveAllVirtualGamePickAction = (sportId) => ({
  type: "@BET_SLIP/REMOVE_ALL_VIRTUAL_GAME_PICK",
  payload: {
    sportId,
  },
});

const betSlipChangeRepetitionPickAction = (repetition) => ({
  type: "@BET_SLIP/CHANGE_REPETITION_PICK",
  payload: {
    repetition,
  },
});

export {
  betSlipCreatePickAction,
  betSlipRemovePickAction,
  betSlipRemoveAllPickAction,
  betSlipChangeTabAction,
  betSlipChangeTabWithResetAction,
  betSlipChangeBetAction,
  betSlipChangeMultipleSingleAction,
  betSlipPlaceBetAction,
  betSlipCompletePlaceBetAction,
  betSlipRejectPlaceBetAction,
  betSlipCancelPlaceBetAction,
  betSlipStartPlaceBetAction,
  betSlipShareAction,
  changeApplyBoostForBetAction,
  betSlipEnableVisibleAction,
  betSlipDisableVisibleAction,
  betSlipFinishCompleteAction,
  betSlipAcceptChangesAction,
  betSlipChangeBetGroupAction,
  betSlipChangeDefaultAmountAction,
  betSlipDisablePickAction,
  betSlipToggleBankerAction,
  betSlipSetMinimizeAction,
  betSlipSetPositionAction,
  betSlipSetFreeBetAction,
  betSlipSetFreeBetParlayAction,
  betSlipSetUseBonusBalanceAction,
  betSlipSetUseBonusBalanceForParlayAction,
  betSlipChangeSystemHashAction,
  betSlipChangePromotionBonusAction,
  betSlipPickPlaceAction,
  betSlipRemovePlaceAction,
  betSlipCreateBatchPickAction,
  betSlipChangeVirtualGamePickAction,
  betSlipRemoveAllVirtualGamePickAction,
  betSlipRemoveVirtualGamePickAction,
  betSlipRacingAddBetSlip,
  betSlipChangeRepetitionPickAction,
  betSlipPickAnyPlaceAction,
};

