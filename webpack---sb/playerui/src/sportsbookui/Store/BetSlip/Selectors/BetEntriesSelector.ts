import { isNotEmpty } from "@sb/utils";
import { type TAppState } from "../../InitialState";
import { currentBetHashViewSelector } from "./ViewSelectors/BetSlipViewSelectors";
import { betSlipBetsPerGroupSelector, betSlipBetsSelector } from "./BetSlipSelectors";

const betEntriesSelector = (state: TAppState, byGroup: string) => {
  if (isNotEmpty(byGroup)) {
    const hash: string = currentBetHashViewSelector(state);
    const bet = betSlipBetsPerGroupSelector(state)[byGroup];

    return bet
      ? [[hash, bet]] as const
      : [];
  }
  const bets = betSlipBetsSelector(state);

  return Object.entries(bets);
};

export { betEntriesSelector };
