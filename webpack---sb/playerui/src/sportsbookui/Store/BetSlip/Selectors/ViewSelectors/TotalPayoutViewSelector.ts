// @ts-nocheck
import { createSelector } from "reselect";
import { type IMoney, Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { computePayoutByFreeBet } from "../../../MyBets/BetUtils";
import { EBetGroup } from "../../Model/BetGroup";
import {
  betSlipCoefficientByOutcomeIdSelector,
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipIsUseFreeBetCheckedSelector,
  moneyBetByGroupSelector,
  notDisabledSingleBetsSelector,
} from "../BetSlipSelectors";
import { totalCoefficientForMultiViewSelector, totalCoefficientForSystemViewSelector } from "./TotalCoefficientViewSelectors";

const totalPayoutForSingleViewSelector = (state) => {
  const singleBets = notDisabledSingleBetsSelector(state);
  const currency = playerCurrencySelector(state);

  const zero = Money.getZero(currency);

  const sum = Money.sum(
    ...singleBets.map(([outcomeId, { money }]) => {
      const coefficient = Number(betSlipCoefficientByOutcomeIdSelector(outcomeId)(state));

      const payout = Money.multiply(money, coefficient);

      const freebet = betSlipIsUseFreeBetCheckedSelector(state, outcomeId);

      return computePayoutByFreeBet(payout, money, freebet);
    }),
  );

  return sum
    ? Money.add(zero, sum)
    : zero;
};

const totalPayoutForMultiViewSelector = createSelector(
  moneyBetByGroupSelector(EBetGroup.multi),
  totalCoefficientForMultiViewSelector,
  betSlipIsFreeBetParlayCheckedSelector,
  (stake, coefficient, freebet): IMoney => computePayoutByFreeBet(Money.multiply(stake, coefficient), stake, freebet),
);

const totalPayoutForSystemViewSelector = createSelector(
  moneyBetByGroupSelector(EBetGroup.system),
  totalCoefficientForSystemViewSelector,
  Money.multiply,
);

export {
  totalPayoutForSingleViewSelector,
  totalPayoutForMultiViewSelector,
  totalPayoutForSystemViewSelector,
};
