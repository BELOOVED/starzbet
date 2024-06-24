// @ts-nocheck
import { shared_outcomeEnumValue_draw } from "@sb/translates/shared/SharedTKeys";
import { createMemoSelector, useParamSelector } from "@sb/utils";
import { sortBy } from "../../../Utils/SortBy";
import { getTeamShortIdList } from "../Model/Event";
import { outcomeIdListByMarketIdSelector, outcomesSelector, participantsByMarketIdSelector } from "../Selectors/FeedSelectors";

const correctScoreGroupByMarketHashSelector = createMemoSelector(
  [
    outcomeIdListByMarketIdSelector,
    participantsByMarketIdSelector,
    outcomesSelector,
  ],
  (outcomeIdList, participants, outcomes) => {
    const team1 = [];
    const draw = [];
    const team2 = [];

    const [team1Id, team2Id] = getTeamShortIdList(participants);

    const paramMap = {};

    outcomeIdList.forEach((id) => {
      if (!paramMap.hasOwnProperty(id)) {
        paramMap[id] = outcomes[id].parameters;
      }

      const team1Score = paramMap[id][team1Id];

      const team2Score = paramMap[id][team2Id];

      if (team1Score < team2Score) {
        team2.push(id);
      } else if (team2Score < team1Score) {
        team1.push(id);
      } else {
        draw.push(id);
      }
    });

    const byTeamScores = (id) => `${paramMap[id][team1Id]}:${paramMap[id][team2Id]}`;

    return [
      [team1Id, sortBy(byTeamScores, team1)],
      draw.length && [
        shared_outcomeEnumValue_draw,
        sortBy((id) => +paramMap[id][team1Id], draw),
      ],
      [team2Id, sortBy(byTeamScores, team2)],
    ].filter(Boolean);
  },
);

const useCorrectScoreGroupByMarketHashSelector = (marketId) => useParamSelector(
  correctScoreGroupByMarketHashSelector,
  [marketId],
);

export { useCorrectScoreGroupByMarketHashSelector };
