/* eslint-disable max-len */
import {
  sportsbookui_bonus_activateBonus_error_bonusEligibilityActivateRulesNotSatisfied,
  sportsbookui_bonus_activateBonus_error_playerBonusAlreadyFinished,
  sportsbookui_bonus_activateBonus_error_playerBonusPlayerAlreadyHasAnActivatedBonus,
  sportsbookui_bonus_activateBonus_error_playerBonusPlayerBonusHasAlreadyBeenActivated,
  sportsbookui_bonus_activateBonus_error_playerBonusPlayerHasBonusThatConflicts,
  sportsbookui_bonus_activateBonus_error_playerBonusPlayerIsNotVerified,
  sportsbookui_error_somethingWentWrong,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { type TErrorMap } from "@sb/translator";
import {
  EActivatePlayerBonusByPlayerCommandErrorCode,
  type IActivatePlayerBonusByPlayerErrorMapping,
} from "@sb/sdk/ErrorMapping/bonus/ActivatePlayerBonusByPlayerErrorMapping";

type TActivateBonusErrorMap = TErrorMap<
  TCommonTKeys,
  EActivatePlayerBonusByPlayerCommandErrorCode,
  IActivatePlayerBonusByPlayerErrorMapping
>;

const ACTIVATE_BONUS_ERROR_MAP: TActivateBonusErrorMap = {
  [EActivatePlayerBonusByPlayerCommandErrorCode.bonusEligibilityActivateRulesNotSatisfied]: () => [sportsbookui_bonus_activateBonus_error_bonusEligibilityActivateRulesNotSatisfied],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyFinished]: () => [sportsbookui_bonus_activateBonus_error_playerBonusAlreadyFinished],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusNotFound]: () => [sportsbookui_error_somethingWentWrong],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerAlreadyHasAnActivatedBonus]: () => [sportsbookui_bonus_activateBonus_error_playerBonusPlayerAlreadyHasAnActivatedBonus],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerBonusHasAlreadyBeenActivated]: () => [sportsbookui_bonus_activateBonus_error_playerBonusPlayerBonusHasAlreadyBeenActivated],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerHasBonusThatConflicts]: () => [sportsbookui_bonus_activateBonus_error_playerBonusPlayerHasBonusThatConflicts],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerIsNotVerified]: () => [sportsbookui_bonus_activateBonus_error_playerBonusPlayerIsNotVerified],
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusProviderUnknownProviderError]: () => [sportsbookui_error_somethingWentWrong],
  fallback: (error) => [sportsbookui_error_somethingWentWrong, { error }],
};
export { ACTIVATE_BONUS_ERROR_MAP };
