// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { createMemoSelector, useParamSelector } from "@sb/utils";
import { sortBy } from "../../../../Utils/SortBy";
import { marketsSelector, participantsByMarketIdSelector } from "../../../Feed/Selectors/FeedSelectors";
import { racingRouletteFindParticipants } from "../Model/RacingRoulettte";

const outcomeParametersSelector = createMemoSelector(
  [
    marketsSelector,
    participantsByMarketIdSelector,
    (_, marketId: string) => marketId,
    (_, __, filterList) => filterList,
  ],
  (markets, participants, marketId, filterList) => {
    let result;
    const marketType = markets[marketId].type;

    if (marketType === EMarketType.place_number_racing_roulette_first) {
      result = racingRouletteFindParticipants(filterList.slice(0, 1), participants);
    }

    if (
      marketType === EMarketType.place_number_racing_roulette_in_first_three ||
      marketType === EMarketType.place_number_racing_roulette_two_from_three
    ) {
      result = [racingRouletteFindParticipants(sortBy((it) => +it, filterList), participants).join(",")];
    }

    if (marketType === EMarketType.place_number_racing_roulette_first_second) {
      result = racingRouletteFindParticipants(filterList.slice(0, 2), participants);
    }

    if (marketType === EMarketType.place_number_racing_roulette_first_second_third) {
      result = racingRouletteFindParticipants(filterList, participants);
    }

    return result;
  },
);

const useRacingRouletteOutcomeParameters = (marketId, filterList) => useParamSelector(
  outcomeParametersSelector,
  [marketId, filterList],
);

export { useRacingRouletteOutcomeParameters };
