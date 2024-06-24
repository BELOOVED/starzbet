/* eslint-disable max-len */
import {
  sportsbookui_bonus_cashback_error_balanceToHigh,
  sportsbookui_bonus_cashback_error_hasActiveBonuses,
  sportsbookui_bonus_cashback_error_noCashbackAvailable,
  sportsbookui_bonus_cashback_error_openBetsFound,
  sportsbookui_bonus_cashback_error_openGamesFound,
  sportsbookui_bonus_cashback_error_openWithdrawalsFound,
  sportsbookui_bonus_claimBonus_error_bonusEligibilityClaimRulesNotSatisfied,
  sportsbookui_bonus_claimBonus_error_bonusHasAlreadyBeenClaimed,
  sportsbookui_bonus_claimBonus_error_bonusNotFound,
  sportsbookui_bonus_claimBonus_error_bonusPlayerVipClubLevelCriteriaDoesntMatch,
  sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_daily,
  sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_default,
  sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_monthly,
  sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_total,
  sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_weekly,
  sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_daily,
  sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_default,
  sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_monthly,
  sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_total,
  sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_weekly,
  sportsbookui_bonus_claimBonus_error_bonusWithDepositCriteriaDoesntMatch,
  sportsbookui_bonus_error_bonusIsNoLongerAvailable,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { type TErrorMap } from "@sb/translator";
import {
  EClaimBonusByPlayerCommandErrorCode,
  type IClaimBonusByPlayerErrorMapping,
} from "@sb/sdk/ErrorMapping/bonus/ClaimBonusByPlayerErrorMapping";

type TClaimBonusErrorMap = TErrorMap<
  TCommonTKeys,
  EClaimBonusByPlayerCommandErrorCode,
  IClaimBonusByPlayerErrorMapping
>;

enum ELimitPeriod {
  daily = "DAILY",
  weekly = "WEEKLY",
  monthly = "MONTHLY",
  total = "TOTAL",
}

/**
 * parse period
 * examples of limit: "daily numbers", "total amount", "weekly amount", "total numbers", "monthly amount"
 * kotlin/com/sumstats/platform/bonus/service/service/validator/limits/BonusLimitsValidationHelper.kt
 */
const getLimitPeriod = (limit: string): ELimitPeriod | null => {
  const period = limit.split(" ")[0];

  switch (period) {
    case "daily":
      return ELimitPeriod.daily;
    case "weekly":
      return ELimitPeriod.weekly;
    case "monthly":
      return ELimitPeriod.monthly;
    case "total":
      return ELimitPeriod.total;
    default:
      return null;
  }
};

const CLAIM_BONUS_ERROR_MAP: TClaimBonusErrorMap = {
  [EClaimBonusByPlayerCommandErrorCode.bonusEligibilityClaimRulesNotSatisfied]: () => [sportsbookui_bonus_claimBonus_error_bonusEligibilityClaimRulesNotSatisfied],
  [EClaimBonusByPlayerCommandErrorCode.bonusNotFound]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusTotalLimitExceeded]: ({ limit }) => {
    switch (getLimitPeriod(limit)) {
      case ELimitPeriod.daily: {
        return [sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_daily];
      }
      case ELimitPeriod.weekly: {
        return [sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_weekly];
      }
      case ELimitPeriod.monthly: {
        return [sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_monthly];
      }
      case ELimitPeriod.total: {
        return [sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_total];
      }
      default: {
        return [sportsbookui_bonus_claimBonus_error_bonusTotalLimitExceeded_default];
      }
    }
  },
  [EClaimBonusByPlayerCommandErrorCode.bonusUserLimitExceeded]: ({ limit }) => {
    switch (getLimitPeriod(limit)) {
      case ELimitPeriod.daily: {
        return [sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_daily];
      }
      case ELimitPeriod.weekly: {
        return [sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_weekly];
      }
      case ELimitPeriod.monthly: {
        return [sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_monthly];
      }
      case ELimitPeriod.total: {
        return [sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_total];
      }
      default: {
        return [sportsbookui_bonus_claimBonus_error_bonusUserLimitExceeded_default];
      }
    }
  },
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedBonusWithNewCustomerTag]: () => [sportsbookui_bonus_claimBonus_error_bonusHasAlreadyBeenClaimed],
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedBonusWithNewCustomerTagAndProducts]: () => [sportsbookui_bonus_claimBonus_error_bonusHasAlreadyBeenClaimed],
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedWithOnePerPlayerTag]: () => [sportsbookui_bonus_claimBonus_error_bonusHasAlreadyBeenClaimed],
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByEmailWithOtherPlayers]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByIpWithOtherPlayers]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByPhoneNumberWithOtherPlayers]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerHasAlreadyClaimedThisBonus]: () => [sportsbookui_bonus_claimBonus_error_bonusHasAlreadyBeenClaimed],

  // apply for
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerWithDepositCriteriaDoesntMatch]: () => [sportsbookui_bonus_claimBonus_error_bonusWithDepositCriteriaDoesntMatch],
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerAffiliateDoesntMatch]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerGroupDoesntMatch]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerDaysSinceRegistrationDoesntMatch]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerRegisterDateDoesntMatch]: () => [sportsbookui_bonus_claimBonus_error_bonusNotFound],
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerVipClubLevelCriteriaDoesntMatch]: () => [sportsbookui_bonus_claimBonus_error_bonusPlayerVipClubLevelCriteriaDoesntMatch],

  // cashback
  [EClaimBonusByPlayerCommandErrorCode.playerBonusCashBackAmountShouldBeGreaterThanZero]: () => [sportsbookui_bonus_cashback_error_noCashbackAvailable],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerBalanceShouldBeEqualOrLess]: ({ maxPlayerBalance }) => [sportsbookui_bonus_cashback_error_balanceToHigh, { money: maxPlayerBalance }],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveActiveBonuses]: () => [sportsbookui_bonus_cashback_error_hasActiveBonuses],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenBets]: () => [sportsbookui_bonus_cashback_error_openBetsFound],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenGameRounds]: () => [sportsbookui_bonus_cashback_error_openGamesFound],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenWithdrawals]: () => [sportsbookui_bonus_cashback_error_openWithdrawalsFound],
  fallback: (error) => [sportsbookui_bonus_error_bonusIsNoLongerAvailable, { error }],
};
export { CLAIM_BONUS_ERROR_MAP };
