/**
 * ⚠️ GENERATED CODE - DO NOT MODIFY BY HAND
 *
 * 🔨️ GENERATED BY kotlin/tools/code-generator-common/src/main/kotlin/com/sumstats/codegenerator/common/sdk/typescript/TSErrorMappingGenerator.kt
 */
export enum ECancelPlayerBonusByPlayerCommandErrorCode {
  playerBonusAlreadyCancelled = "player_bonus.already_cancelled",
  playerBonusAlreadyFinished = "player_bonus.already_finished",
  playerBonusNotFound = "player_bonus.not_found",
}

export interface IPlayerBonusAlreadyCancelledContext {
  operation: string,
  playerBonusId: string,
}

export interface IPlayerBonusAlreadyFinishedContext {
  operation: string,
  playerBonusId: string,
}

export interface IPlayerBonusNotFoundContext {
  operation: string,
  playerBonusId: string,
}

export interface ICancelPlayerBonusByPlayerErrorMapping {
  [ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyCancelled]: IPlayerBonusAlreadyCancelledContext,
  [ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyFinished]: IPlayerBonusAlreadyFinishedContext,
  [ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusNotFound]: IPlayerBonusNotFoundContext,
}
