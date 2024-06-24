import { createCallManagerSymbol } from "@sb/call-manager";
import { type EBonusProductEnum, type EPlatform_PlayerBonusPhaseEnum } from "@sb/graphql-client";

const CLAIM_BONUS_CALL_SYMBOL = createCallManagerSymbol("claimBonus");
const ACTIVATE_BONUS_CALL_SYMBOL = createCallManagerSymbol("activateBonus");
const CANCEL_BONUS_CALL_SYMBOL = createCallManagerSymbol("cancelBonus");
const REQUEST_CASHBACK_SUM_CALL_SYMBOL = createCallManagerSymbol("requestCashbackSum");
const TRANSFER_CASHBACK_CALL_SYMBOL = createCallManagerSymbol("transferCashback");
const CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL = createCallManagerSymbol("claimBonusByPromoCode");
const REGISTRATION_BONUSES_CALL_SYMBOL = createCallManagerSymbol("registrationBonuses");
const GET_NOT_SETTLED_RESOURCES_CALL_SYMBOL = createCallManagerSymbol("getNotSettledResources");
const AVAILABLE_BONUS_CALL_SYMBOL = createCallManagerSymbol("availableBonus");
const AVAILABLE_BONUSES_CALL_SYMBOL = createCallManagerSymbol("availableBonuses");
const PLAYER_BONUS_CALL_SYMBOL = createCallManagerSymbol("playerBonus");
const PLAYER_BONUSES_CALL_SYMBOL = createCallManagerSymbol("playerBonuses");
const HISTORY_BONUS_CALL_SYMBOL = createCallManagerSymbol("historyBonus");
const HISTORY_BONUSES_CALL_SYMBOL = createCallManagerSymbol("historyBonuses");

const createBonusResourcesCallSymbol = (playerBonusId: string, phase: EPlatform_PlayerBonusPhaseEnum, product?: EBonusProductEnum) =>
  createCallManagerSymbol(`bonusResources_${playerBonusId}_${phase}_${product ?? "all"}`);

export {
  CLAIM_BONUS_CALL_SYMBOL,
  ACTIVATE_BONUS_CALL_SYMBOL,
  CANCEL_BONUS_CALL_SYMBOL,
  REQUEST_CASHBACK_SUM_CALL_SYMBOL,
  TRANSFER_CASHBACK_CALL_SYMBOL,
  CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL,
  REGISTRATION_BONUSES_CALL_SYMBOL,
  GET_NOT_SETTLED_RESOURCES_CALL_SYMBOL,
  AVAILABLE_BONUS_CALL_SYMBOL,
  AVAILABLE_BONUSES_CALL_SYMBOL,
  PLAYER_BONUS_CALL_SYMBOL,
  PLAYER_BONUSES_CALL_SYMBOL,
  HISTORY_BONUS_CALL_SYMBOL,
  HISTORY_BONUSES_CALL_SYMBOL,
  createBonusResourcesCallSymbol,
};
