/**
 * ⚠️ GENERATED CODE - DO NOT MODIFY BY HAND
 *
 * 🔨️ GENERATED BY kotlin/tools/code-generator-common/src/main/kotlin/com/sumstats/codegenerator/common/sdk/typescript/TSErrorMappingGenerator.kt
 */
export enum EGetLiveSpinsStreamSettingsCommandErrorCode {
  gameProviderIsInactive = "game.provider_is_inactive",
}

export interface IGameProviderIsInactiveContext {
  provider: string,
}

export interface IGetLiveSpinsStreamSettingsCommandErrorMapping {
  [EGetLiveSpinsStreamSettingsCommandErrorCode.gameProviderIsInactive]: IGameProviderIsInactiveContext,
}
