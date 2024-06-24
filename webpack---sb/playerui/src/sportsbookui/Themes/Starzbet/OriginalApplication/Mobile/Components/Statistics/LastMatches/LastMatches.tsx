import { memo } from "react";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { EStatisticsWidget } from "../../../../../../../Store/Statistics/Model/Statistics";
import { selectTeamByType } from "../../../../../../../Store/Statistics/Selectors/StatisticsViewSelector";
import { type IWithEventStatistics } from "../../../../../../../Store/Statistics/Model/IWithEventStatistics";
import { Matches, MatchesShort } from "../Matches/Matches";

interface ILastMatchesProps extends IWithEventStatistics {
  disableShowMore?: boolean;
}

const LastMatches = memo<ILastMatchesProps>(({ statistics, disableShowMore = false }) => {
  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  return (
    <Matches
      header={EStatisticsWidget.lastMatches}
      matches={statistics.lastMatches}
      team1={team1}
      team2={team2}
      disableShowMore={disableShowMore}
    />
  );
});
LastMatches.displayName = "LastMatches";

const LastMatchesShort = memo<ILastMatchesProps>(({ statistics, disableShowMore = false }) => {
  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  return (
    <MatchesShort
      header={EStatisticsWidget.lastMatches}
      matches={statistics.lastMatches}
      team1={team1}
      team2={team2}
      disableShowMore={disableShowMore}
    />
  );
});
LastMatchesShort.displayName = "LastMatchesShort";

export { LastMatches, LastMatchesShort };
