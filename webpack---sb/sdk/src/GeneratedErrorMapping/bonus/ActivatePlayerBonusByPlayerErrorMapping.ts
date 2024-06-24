/**
 * ⚠️ GENERATED CODE - DO NOT MODIFY BY HAND
 *
 * 🔨️ GENERATED BY kotlin/tools/code-generator-common/src/main/kotlin/com/sumstats/codegenerator/common/sdk/typescript/TSErrorMappingGenerator.kt
 */
export enum EActivatePlayerBonusByPlayerCommandErrorCode {
  bonusEligibilityActivateRulesNotSatisfied = "bonus.eligibility_activate_rules_not_satisfied",
  playerBonusAlreadyFinished = "player_bonus.already_finished",
  playerBonusNotFound = "player_bonus.not_found",
  playerBonusPlayerAlreadyHasAnActivatedBonus = "player_bonus.player_already_has_an_activated_bonus",
  playerBonusPlayerBonusHasAlreadyBeenActivated = "player_bonus.player_bonus_has_already_been_activated",
  playerBonusPlayerHasBonusThatConflicts = "player_bonus.player_has_bonus_that_conflicts",
  playerBonusPlayerIsNotVerified = "player_bonus.player_is_not_verified",
  playerBonusProviderUnknownProviderError = "player_bonus_provider.unknown_provider_error",
}

export interface IBonusEligibilityActivateRulesNotSatisfiedContext {
  operation: string,
  playerBonusId: string,
  playerId: string,
}

export interface IPlayerBonusAlreadyFinishedContext {
  operation: string,
  playerBonusId: string,
}

export interface IPlayerBonusNotFoundContext {
  operation: string,
  playerBonusId: string,
}

export interface IPlayerBonusPlayerAlreadyHasAnActivatedBonusContext {
  operation: string,
  playerId: string,
}

export interface IPlayerBonusPlayerBonusHasAlreadyBeenActivatedContext {
  playerBonusId: string,
}

export interface IPlayerBonusPlayerHasBonusThatConflictsContext {
  operation: string,
  playerId: string,
}

export interface IPlayerBonusPlayerIsNotVerifiedContext {
  operation: string,
  playerId: string,
}

export interface IPlayerBonusProviderUnknownProviderErrorContext {
  operation: string,
  playerBonusId?: string,
}

export interface IActivatePlayerBonusByPlayerErrorMapping {
  [EActivatePlayerBonusByPlayerCommandErrorCode.bonusEligibilityActivateRulesNotSatisfied]: IBonusEligibilityActivateRulesNotSatisfiedContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyFinished]: IPlayerBonusAlreadyFinishedContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusNotFound]: IPlayerBonusNotFoundContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerAlreadyHasAnActivatedBonus]: IPlayerBonusPlayerAlreadyHasAnActivatedBonusContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerBonusHasAlreadyBeenActivated]: IPlayerBonusPlayerBonusHasAlreadyBeenActivatedContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerHasBonusThatConflicts]: IPlayerBonusPlayerHasBonusThatConflictsContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerIsNotVerified]: IPlayerBonusPlayerIsNotVerifiedContext,
  [EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusProviderUnknownProviderError]: IPlayerBonusProviderUnknownProviderErrorContext,
}
