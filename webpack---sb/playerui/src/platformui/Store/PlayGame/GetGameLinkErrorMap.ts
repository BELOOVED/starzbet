import {
  platformui_openGame_error_blockValidation_subTitle,
  platformui_openGame_error_blockValidation_title,
  platformui_openGame_error_gameDemoIsUnavailable_title,
  platformui_openGame_error_gameGameWithIdsNotFound_title,
  platformui_openGame_error_gameIsInactive_subTitle,
  platformui_openGame_error_gameIsInactive_title,
  platformui_openGame_error_insufficientBalance_subTitle,
  platformui_openGame_error_insufficientBalance_title,
  platformui_openGame_error_notAvailableForBonus_subTitle,
  platformui_openGame_error_notAvailableForBonus_title,
  platformui_openGame_error_providerNotActive_subTitle,
  platformui_openGame_error_providerNotActive_title,
  platformui_subTitle_wrong,
  platformui_title_wrong,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { type TErrorMap } from "@sb/translator";
import {
  EGetGameLinkCommandErrorCode,
  type IGetGameLinkCommandErrorMapping,
} from "@sb/sdk/ErrorMapping/gamemanager/GetGameLinkCommandErrorMapping";
import {
  EGetDemoGameLinkCommandErrorCode,
  type IGetDemoGameLinkCommandErrorMapping,
} from "@sb/sdk/ErrorMapping/gamemanager/GetDemoGameLinkCommandErrorMapping";

type TGetGameLinkErrorMap = TErrorMap<
  TCommonTKeys,
  EGetGameLinkCommandErrorCode | EGetDemoGameLinkCommandErrorCode,
  IGetGameLinkCommandErrorMapping & IGetDemoGameLinkCommandErrorMapping
>;

const getGameLinkErrorMap: TGetGameLinkErrorMap = {
  [EGetGameLinkCommandErrorCode.gamePlayerInsufficientBalance]: () => [platformui_openGame_error_insufficientBalance_title],
  [EGetGameLinkCommandErrorCode.gameGameUrlFailedProviderNotActive]: () => [platformui_openGame_error_providerNotActive_title],
  [EGetGameLinkCommandErrorCode.gameGameIsInactive]: () => [platformui_openGame_error_gameIsInactive_title],
  [EGetGameLinkCommandErrorCode.gameGetGameUrlProviderError]: () => [platformui_title_wrong],
  [EGetGameLinkCommandErrorCode.gameGameNotAvailableForBonusError]: () => [platformui_openGame_error_notAvailableForBonus_title],
  [EGetGameLinkCommandErrorCode.gameGameWithIdsNotFound]: () => [platformui_openGame_error_gameGameWithIdsNotFound_title],
  [EGetGameLinkCommandErrorCode.blockValidationError]: () => [platformui_openGame_error_blockValidation_title],
  [EGetDemoGameLinkCommandErrorCode.gameDemoIsUnavailable]: () => [platformui_openGame_error_gameDemoIsUnavailable_title],
  [EGetDemoGameLinkCommandErrorCode.gameGetDemoGameUrlProviderError]: () => [platformui_title_wrong],
  fallback: () => [platformui_title_wrong],
};

const getGameLinkAdditionalErrorMap: TGetGameLinkErrorMap = {
  [EGetGameLinkCommandErrorCode.gamePlayerInsufficientBalance]: () => [platformui_openGame_error_insufficientBalance_subTitle],
  [EGetGameLinkCommandErrorCode.gameGameUrlFailedProviderNotActive]: () => [platformui_openGame_error_providerNotActive_subTitle],
  [EGetGameLinkCommandErrorCode.gameGameIsInactive]: () => [platformui_openGame_error_gameIsInactive_subTitle],
  [EGetGameLinkCommandErrorCode.gameGetGameUrlProviderError]: () => [platformui_subTitle_wrong],
  [EGetGameLinkCommandErrorCode.gameGameNotAvailableForBonusError]: () => [platformui_openGame_error_notAvailableForBonus_subTitle],
  [EGetGameLinkCommandErrorCode.gameGameWithIdsNotFound]: () => [platformui_subTitle_wrong],
  [EGetGameLinkCommandErrorCode.blockValidationError]: () => [platformui_openGame_error_blockValidation_subTitle],
  [EGetDemoGameLinkCommandErrorCode.gameDemoIsUnavailable]: () => [platformui_subTitle_wrong],
  [EGetDemoGameLinkCommandErrorCode.gameGetDemoGameUrlProviderError]: () => [platformui_subTitle_wrong],
  fallback: () => [platformui_subTitle_wrong],
};

export { getGameLinkErrorMap, getGameLinkAdditionalErrorMap };
