// @ts-nocheck
import { createSelector } from "reselect";
import { Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { EBetGroup } from "../../Model/BetGroup";
import { moneyBetByGroupSelector, notDisabledSingleBetsSelector } from "../BetSlipSelectors";
import { countOfParlayForMultiViewSelector, countOfParlayForSystemViewSelector } from "./CountOfParlayViewSelectors";

const totalStakeForSingleViewSelector = createSelector(
  notDisabledSingleBetsSelector,
  playerCurrencySelector,
  (singleBets, currency) => {
    const zero = Money.getZero(currency);

    return singleBets.reduce(
      (sum, [_, { money }]) => Money.add(sum, money),
      zero,
    );
  },
);

const totalStakeForMultiViewSelector = createSelector(
  moneyBetByGroupSelector(EBetGroup.multi),
  countOfParlayForMultiViewSelector,
  Money.multiply,
);

const totalStakeForSystemViewSelector = createSelector(
  moneyBetByGroupSelector(EBetGroup.system),
  countOfParlayForSystemViewSelector,
  Money.multiply,
);

export {
  totalStakeForSingleViewSelector,
  totalStakeForMultiViewSelector,
  totalStakeForSystemViewSelector,
};
