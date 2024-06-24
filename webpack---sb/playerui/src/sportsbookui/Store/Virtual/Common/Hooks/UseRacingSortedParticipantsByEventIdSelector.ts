// @ts-nocheck

import { EMarketType } from "@sb/betting-core/MarketType";
import { createMemoSelector, useParamSelector } from "@sb/utils";
import { sortBy } from "../../../../Utils/SortBy";
import {
  marketIdByTypeSelector,
  marketToOutcomeMapSelector,
  outcomesSelector,
  participantsByEventIdSelector,
} from "../../../Feed/Selectors/FeedSelectors";

const racingSortedParticipantsByEventIdSelector = createMemoSelector(
  [
    participantsByEventIdSelector,
    marketIdByTypeSelector,
    marketToOutcomeMapSelector,
    outcomesSelector,
  ],
  (participants, marketId, outcomeMap, outcomes) => {
    const teamList = Object.values(participants);

    if (!outcomeMap[marketId]) {
      return teamList;
    }

    return sortBy(
      (team) => {
        const outcomeId = outcomeMap[marketId].find((outcomeId) => outcomes[outcomeId].parameters.outcome === team.shortId);

        return outcomes[outcomeId].coefficient;
      },
      teamList,
    );
  },
);

const useRacingSortedParticipantsByEventIdSelector = (eventId: string) => useParamSelector(
  racingSortedParticipantsByEventIdSelector,
  [eventId, EMarketType.place_number_race_winner],
);

export { useRacingSortedParticipantsByEventIdSelector };
