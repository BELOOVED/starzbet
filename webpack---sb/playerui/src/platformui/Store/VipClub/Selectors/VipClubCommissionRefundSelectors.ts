import { callManagerFailedSelector, callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { createMemoSelector, createSimpleSelector, getNotNil, Money, numberToComma } from "@sb/utils";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL } from "../VipClubVariables";
import { type IWithVipClubState } from "../VipClubInitialState";
import { EVipClubCommissionRefundState, EVipClubDoCommissionRefundState } from "../VipClubModels";
import { vipClubPlayerStateAvailablePointsForCashBackSelector } from "./VipClubPlayerStateSelectors";
import { vipClubLevelRulesLoadingSelector, vipClubPlayerLevelRuleCashbackPerPointsSelector } from "./VipClubLevelRulesSelectors";

const vipClubDoCommissionRefundSucceededSelector = callManagerSucceededSelector.with.symbol(VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL);

const vipClubDoCommissionRefundFailedSelector = callManagerFailedSelector.with.symbol(VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL);

const vipClubDoCommissionRefundLoadingSelector = callManagerStartedSelector.with.symbol(VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL);

const vipClubCommissionRefundStateSelector = (state: TPlatformAppState) => {
  const levelRulesLoading = vipClubLevelRulesLoadingSelector(state);
  if (levelRulesLoading) {
    return EVipClubCommissionRefundState.loading;
  }

  const commission = vipClubPlayerLevelRuleCashbackPerPointsSelector(state);
  if (!commission || Number(commission) <= 0) {
    return EVipClubCommissionRefundState.noCommission;
  }

  return EVipClubCommissionRefundState.full;
};

const vipClubMinAmountToRefundSelector = createSimpleSelector(
  [playerCurrencySelector],
  (currency) => {
    const precision = Money.getPrecision(currency);

    return 1 / Math.pow(10, precision);
  },
);

const vipClubRefundDisabledSelector = (state: IWithVipClubState & TPlatformAppState) => {
  const cashbackPerPoints = vipClubPlayerLevelRuleCashbackPerPointsSelector(state);
  if (!cashbackPerPoints) {
    return true;
  }
  const availablePointsForCashBack = vipClubPlayerStateAvailablePointsForCashBackSelector(state);
  if (!availablePointsForCashBack) {
    return true;
  }

  const minAmount = vipClubMinAmountToRefundSelector(state);

  return Number(cashbackPerPoints) * Number(availablePointsForCashBack) < minAmount;
};

const vipClubRefundValueStringSelector = createMemoSelector(
  [
    vipClubPlayerStateAvailablePointsForCashBackSelector,
    vipClubPlayerLevelRuleCashbackPerPointsSelector,
    playerCurrencySelector,
  ],
  (availablePoints, cashbackPerPoints, currency) => {
    const precision = Money.getPrecision(currency);

    const availablePointsNumber = availablePoints ? Number(availablePoints) : 0;

    const separatedResultString = String(parseFloat((availablePointsNumber * Number(cashbackPerPoints)).toFixed(6))).split(".");
    const [beforeDot, afterDot] = separatedResultString;

    const precisionTail = new Array(precision).fill(0).join("");
    const tail = afterDot ? `${afterDot}${precisionTail.slice(afterDot.length)}` : precisionTail;

    return {
      availablePoints: numberToComma(availablePointsNumber, 2),
      cashbackPerPoints: getNotNil(cashbackPerPoints, ["vipClubRefundValueStringSelector"], "cashbackPerPoints"),
      currency,
      refundValue: {
        beforeDot: numberToComma(Number(beforeDot)),
        afterDotInPrecision: tail.slice(0, precision),
        afterDotOverPrecision: tail.slice(precision),
      },
    };
  },
);

const vipClubDoCommissionRefundStateSelector = (state: TPlatformAppState) => {
  const doRefundLoading = vipClubDoCommissionRefundLoadingSelector(state);
  if (doRefundLoading) {
    return EVipClubDoCommissionRefundState.loading;
  }

  const doRefundSuccess = vipClubDoCommissionRefundSucceededSelector(state);
  if (doRefundSuccess) {
    return EVipClubDoCommissionRefundState.success;
  }

  const doRefundFailed = vipClubDoCommissionRefundFailedSelector(state);
  if (doRefundFailed) {
    return EVipClubDoCommissionRefundState.failed;
  }

  const disabled = vipClubRefundDisabledSelector(state);
  if (disabled) {
    return EVipClubDoCommissionRefundState.notAvailableForRefund;
  }

  return EVipClubDoCommissionRefundState.availableForRefund;
};

export {
  vipClubCommissionRefundStateSelector,
  vipClubRefundDisabledSelector,
  vipClubMinAmountToRefundSelector,
  vipClubRefundValueStringSelector,
  vipClubDoCommissionRefundStateSelector,
};
