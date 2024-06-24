/* eslint-disable max-len */
import {
  sportsbookui_bonus_cancelBonus_error_playerBonusAlreadyCancelled,
  sportsbookui_bonus_cancelBonus_error_playerBonusAlreadyFinished,
  sportsbookui_bonus_cancelBonus_error_playerBonusNotFound,
  sportsbookui_error_somethingWentWrong,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { type TErrorMap } from "@sb/translator";
import {
  ECancelPlayerBonusByPlayerCommandErrorCode,
  type ICancelPlayerBonusByPlayerErrorMapping,
} from "@sb/sdk/ErrorMapping/bonus/CancelPlayerBonusByPlayerErrorMapping";

type TCancelBonusErrorMap = TErrorMap<
  TCommonTKeys,
  ECancelPlayerBonusByPlayerCommandErrorCode,
  ICancelPlayerBonusByPlayerErrorMapping
>;

const CANCEL_BONUS_ERROR_MAP: TCancelBonusErrorMap = {
  [ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyCancelled]: () => [sportsbookui_bonus_cancelBonus_error_playerBonusAlreadyCancelled],
  [ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyFinished]: () => [sportsbookui_bonus_cancelBonus_error_playerBonusAlreadyFinished],
  [ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusNotFound]: () => [sportsbookui_bonus_cancelBonus_error_playerBonusNotFound],
  fallback: (error) => [sportsbookui_error_somethingWentWrong, { error }],
};
export { CANCEL_BONUS_ERROR_MAP };
