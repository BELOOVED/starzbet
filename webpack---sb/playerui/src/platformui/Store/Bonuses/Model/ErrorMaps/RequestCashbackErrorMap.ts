import {
  sportsbookui_bonus_cashback_error_balanceToHigh,
  sportsbookui_bonus_cashback_error_hasActiveBonuses,
  sportsbookui_bonus_cashback_error_noCashbackAvailable,
  sportsbookui_bonus_cashback_error_openBetsFound,
  sportsbookui_bonus_cashback_error_openGamesFound,
  sportsbookui_bonus_cashback_error_openWithdrawalsFound,
  sportsbookui_bonus_cashback_error_transferFailed,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import {
  EGetCashbackSumByPlayerCommandErrorCode,
  type IGetCashbackSumByPlayerCommandErrorMapping,
} from "@sb/sdk/ErrorMapping/bonus/GetCashbackSumByPlayerCommandErrorMapping";
import { type TErrorMap } from "@sb/translator";
import { EClaimBonusByPlayerCommandErrorCode } from "@sb/sdk/ErrorMapping/bonus/ClaimBonusByPlayerErrorMapping";

type TRequestCashbackErrorMap = TErrorMap<
  TCommonTKeys,
  EGetCashbackSumByPlayerCommandErrorCode,
  IGetCashbackSumByPlayerCommandErrorMapping
>;

const REQUEST_CASHBACK_ERROR_MAP: TRequestCashbackErrorMap = {
  [EGetCashbackSumByPlayerCommandErrorCode.bonusNotFound]:
    () => [sportsbookui_bonus_cashback_error_transferFailed],
  [EGetCashbackSumByPlayerCommandErrorCode.playerBonusCashBackAmountShouldBeGreaterThanZero]:
    () => [sportsbookui_bonus_cashback_error_noCashbackAvailable],
  [EGetCashbackSumByPlayerCommandErrorCode.playerBonusPlayerBalanceShouldBeEqualOrLess]:
    ({ maxPlayerBalance }) => [sportsbookui_bonus_cashback_error_balanceToHigh, { money: maxPlayerBalance }],
  [EGetCashbackSumByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveActiveBonuses]:
    () => [sportsbookui_bonus_cashback_error_hasActiveBonuses],
  [EGetCashbackSumByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenBets]:
    () => [sportsbookui_bonus_cashback_error_openBetsFound],
  [EGetCashbackSumByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenGameRounds]:
    () => [sportsbookui_bonus_cashback_error_openGamesFound],
  [EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenWithdrawals]:
    () => [sportsbookui_bonus_cashback_error_openWithdrawalsFound],
  fallback: () => [sportsbookui_bonus_cashback_error_transferFailed],
};

export { REQUEST_CASHBACK_ERROR_MAP };
