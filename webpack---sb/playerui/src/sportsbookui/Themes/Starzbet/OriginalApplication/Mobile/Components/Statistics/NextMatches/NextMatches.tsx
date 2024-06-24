import { memo } from "react";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { type TEventStatistics } from "@sb/statistics-core";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { selectTeamByType } from "../../../../../../../Store/Statistics/Selectors/StatisticsViewSelector";
import { Matches, MatchesShort } from "../Matches/Matches";

interface INextMatchesProps {
  statistics: TEventStatistics;
  disableShowMore?: boolean;
}

const NextMatches = memo<INextMatchesProps>(({ statistics, disableShowMore = false }) => {
  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  return (
    <Matches
      header={EStatisticsWidget.nextMatches}
      matches={statistics.nextMatches}
      team1={team1}
      team2={team2}
      disableShowMore={disableShowMore}
    />
  );
});
NextMatches.displayName = "NextMatches";

const NextMatchesShort = memo<INextMatchesProps>(({ statistics, disableShowMore = false }) => {
  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  return (
    <MatchesShort
      header={EStatisticsWidget.nextMatches}
      matches={statistics.nextMatches}
      team1={team1}
      team2={team2}
      disableShowMore={disableShowMore}
    />
  );
});
NextMatchesShort.displayName = "NextMatchesShort";

export { NextMatches, NextMatchesShort };
