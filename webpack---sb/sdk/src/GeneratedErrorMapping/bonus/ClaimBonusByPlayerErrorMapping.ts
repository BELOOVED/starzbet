/**
 * ⚠️ GENERATED CODE - DO NOT MODIFY BY HAND
 *
 * 🔨️ GENERATED BY kotlin/tools/code-generator-common/src/main/kotlin/com/sumstats/codegenerator/common/sdk/typescript/TSErrorMappingGenerator.kt
 */
export enum EClaimBonusByPlayerCommandErrorCode {
  bonusEligibilityClaimRulesNotSatisfied = "bonus.eligibility_claim_rules_not_satisfied",
  bonusNotFound = "bonus.not_found",
  bonusPlayerAffiliateDoesntMatch = "bonus.player_affiliate_doesnt_match",
  bonusPlayerDaysSinceRegistrationDoesntMatch = "bonus.player_days_since_registration_doesnt_match",
  bonusPlayerGroupDoesntMatch = "bonus.player_group_doesnt_match",
  bonusPlayerRegisterDateDoesntMatch = "bonus.player_register_date_doesnt_match",
  bonusPlayerVipClubLevelCriteriaDoesntMatch = "bonus.player_vip_club_level_criteria_doesnt_match",
  bonusPlayerWithDepositCriteriaDoesntMatch = "bonus.player_with_deposit_criteria_doesnt_match",
  bonusTotalLimitExceeded = "bonus.total_limit_exceeded",
  bonusUserLimitExceeded = "bonus.user_limit_exceeded",
  bonusTagValidationAlreadyUsedBonusWithNewCustomerTag = "bonus_tag_validation.already_used_bonus_with_new_customer_tag",
  bonusTagValidationAlreadyUsedBonusWithNewCustomerTagAndProducts = "bonus_tag_validation.already_used_bonus_with_new_customer_tag_and_products",
  bonusTagValidationAlreadyUsedWithOnePerPlayerTag = "bonus_tag_validation.already_used_with_one_per_player_tag",
  bonusTagValidationDuplicatedByEmailWithOtherPlayers = "bonus_tag_validation.duplicated_by_email_with_other_players",
  bonusTagValidationDuplicatedByIpWithOtherPlayers = "bonus_tag_validation.duplicated_by_ip_with_other_players",
  bonusTagValidationDuplicatedByPhoneNumberWithOtherPlayers = "bonus_tag_validation.duplicated_by_phone_number_with_other_players",
  playerBonusCashBackAmountShouldBeGreaterThanZero = "player_bonus.cash_back_amount_should_be_greater_than_zero",
  playerBonusPlayerBalanceShouldBeEqualOrLess = "player_bonus.player_balance_should_be_equal_or_less",
  playerBonusPlayerHasAlreadyClaimedThisBonus = "player_bonus.player_has_already_claimed_this_bonus",
  playerBonusPlayerShouldNotHaveActiveBonuses = "player_bonus.player_should_not_have_active_bonuses",
  playerBonusPlayerShouldNotHaveOpenBets = "player_bonus.player_should_not_have_open_bets",
  playerBonusPlayerShouldNotHaveOpenGameRounds = "player_bonus.player_should_not_have_open_game_rounds",
  playerBonusPlayerShouldNotHaveOpenWithdrawals = "player_bonus.player_should_not_have_open_withdrawals",
}

export interface IBonusEligibilityClaimRulesNotSatisfiedContext {
  bonusId: string,
  operation: string,
}

export interface IBonusNotFoundContext {
  bonusId: string,
  operation: string,
}

export interface IBonusPlayerAffiliateDoesntMatchContext {
  operation: string,
}

export interface IBonusPlayerDaysSinceRegistrationDoesntMatchContext {
  operation: string,
}

export interface IBonusPlayerGroupDoesntMatchContext {
  operation: string,
}

export interface IBonusPlayerRegisterDateDoesntMatchContext {
  operation: string,
}

export interface IBonusPlayerVipClubLevelCriteriaDoesntMatchContext {
  operation: string,
}

export interface IBonusPlayerWithDepositCriteriaDoesntMatchContext {
  lastDepositsPeriod: string,
  maxDepositsSum: string,
  minDepositsSum: string,
  operation: string,
}

export interface IBonusTotalLimitExceededContext {
  bonusId: string,
  left: string,
  limit: string,
  playerId: string,
}

export interface IBonusUserLimitExceededContext {
  bonusId: string,
  left: string,
  limit: string,
  playerId: string,
}

export interface IBonusTagValidationAlreadyUsedBonusWithNewCustomerTagContext {
  bonusId: string,
  operation: string,
}

export interface IBonusTagValidationAlreadyUsedBonusWithNewCustomerTagAndProductsContext {
  bonusId: string,
  operation: string,
}

export interface IBonusTagValidationAlreadyUsedWithOnePerPlayerTagContext {
  operation: string,
}

export interface IBonusTagValidationDuplicatedByEmailWithOtherPlayersContext {
  duplicatedPlayerId: string,
  operation: string,
  playerId: string,
}

export interface IBonusTagValidationDuplicatedByIpWithOtherPlayersContext {
  duplicatedPlayerId: string,
  operation: string,
  playerId: string,
}

export interface IBonusTagValidationDuplicatedByPhoneNumberWithOtherPlayersContext {
  duplicatedPlayerId: string,
  operation: string,
  playerId: string,
}

export interface IPlayerBonusCashBackAmountShouldBeGreaterThanZeroContext {
}

export interface IPlayerBonusPlayerBalanceShouldBeEqualOrLessContext {
  maxPlayerBalance: string,
}

export interface IPlayerBonusPlayerHasAlreadyClaimedThisBonusContext {
  bonusId: string,
  playerId: string,
}

export interface IPlayerBonusPlayerShouldNotHaveActiveBonusesContext {
}

export interface IPlayerBonusPlayerShouldNotHaveOpenBetsContext {
}

export interface IPlayerBonusPlayerShouldNotHaveOpenGameRoundsContext {
}

export interface IPlayerBonusPlayerShouldNotHaveOpenWithdrawalsContext {
}

export interface IClaimBonusByPlayerErrorMapping {
  [EClaimBonusByPlayerCommandErrorCode.bonusEligibilityClaimRulesNotSatisfied]: IBonusEligibilityClaimRulesNotSatisfiedContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusNotFound]: IBonusNotFoundContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerAffiliateDoesntMatch]: IBonusPlayerAffiliateDoesntMatchContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerDaysSinceRegistrationDoesntMatch]: IBonusPlayerDaysSinceRegistrationDoesntMatchContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerGroupDoesntMatch]: IBonusPlayerGroupDoesntMatchContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerRegisterDateDoesntMatch]: IBonusPlayerRegisterDateDoesntMatchContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerVipClubLevelCriteriaDoesntMatch]: IBonusPlayerVipClubLevelCriteriaDoesntMatchContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusPlayerWithDepositCriteriaDoesntMatch]: IBonusPlayerWithDepositCriteriaDoesntMatchContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTotalLimitExceeded]: IBonusTotalLimitExceededContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusUserLimitExceeded]: IBonusUserLimitExceededContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedBonusWithNewCustomerTag]: IBonusTagValidationAlreadyUsedBonusWithNewCustomerTagContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedBonusWithNewCustomerTagAndProducts]: IBonusTagValidationAlreadyUsedBonusWithNewCustomerTagAndProductsContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedWithOnePerPlayerTag]: IBonusTagValidationAlreadyUsedWithOnePerPlayerTagContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByEmailWithOtherPlayers]: IBonusTagValidationDuplicatedByEmailWithOtherPlayersContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByIpWithOtherPlayers]: IBonusTagValidationDuplicatedByIpWithOtherPlayersContext,
  [EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByPhoneNumberWithOtherPlayers]: IBonusTagValidationDuplicatedByPhoneNumberWithOtherPlayersContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusCashBackAmountShouldBeGreaterThanZero]: IPlayerBonusCashBackAmountShouldBeGreaterThanZeroContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerBalanceShouldBeEqualOrLess]: IPlayerBonusPlayerBalanceShouldBeEqualOrLessContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerHasAlreadyClaimedThisBonus]: IPlayerBonusPlayerHasAlreadyClaimedThisBonusContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveActiveBonuses]: IPlayerBonusPlayerShouldNotHaveActiveBonusesContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenBets]: IPlayerBonusPlayerShouldNotHaveOpenBetsContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenGameRounds]: IPlayerBonusPlayerShouldNotHaveOpenGameRoundsContext,
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenWithdrawals]: IPlayerBonusPlayerShouldNotHaveOpenWithdrawalsContext,
}