import { createSelector } from "reselect";
import { getNotNil, createPropertySelector, type IMoney, isNil, Money, useParamSelector } from "@sb/utils";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { betSlipBetsSelector } from "../Selectors/BetSlipSelectors";
import { singleHash } from "../Model/BetHash";

interface ISingleStake {
  input: string | null;
  money: IMoney;
}

const singleStakeByIdSelectorFactory = createSelector(
  betSlipBetsSelector,
  playerCurrencySelector,
  (_: unknown, outcomeId: string) => outcomeId,
  (bets, currency, outcomeId): ISingleStake => {
    const stub = { input: null, money: Money.getZero(currency) };

    const bet = bets[singleHash];

    if (isNil(bet)) {
      return stub;
    }

    return getNotNil(bet[outcomeId], ["singleStakeByIdSelectorFactory"], "bet[outcomeId]");
  },
);

const singleStakeMoneyByIdSelector = createPropertySelector(singleStakeByIdSelectorFactory, "money");

const useSingleStakeByIdSelector = (id: string) => useParamSelector(singleStakeByIdSelectorFactory, [id]);

export { useSingleStakeByIdSelector, singleStakeByIdSelectorFactory, singleStakeMoneyByIdSelector };
