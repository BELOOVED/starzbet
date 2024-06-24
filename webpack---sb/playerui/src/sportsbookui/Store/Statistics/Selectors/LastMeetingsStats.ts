import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { type TEventStatistics } from "@sb/statistics-core";
import { isNotNil } from "@sb/utils";
import { selectTeamByType, type TStatisticParticipant } from "./StatisticsViewSelector";

interface ILastMeetingsStats {
  home: TStatisticParticipant;
  away: TStatisticParticipant;
  time: number;
  score: {
    home: number | string;
    away: number | string;
  };
  tournament: string;
}

const selectLastMeetingsStats = (index: number, statistics: TEventStatistics): ILastMeetingsStats => {
  const match = statistics.headToHead[index];

  const team1 = selectTeamByType(EParticipantType.team1, statistics);
  const team2 = selectTeamByType(EParticipantType.team2, statistics);

  // select home away
  const [home, away] = match.participants.team1 === team1.teamId
    ? [team1, team2]
    : [team2, team1];

  const full_eventScore = match.scores.full_event;
  const homeScore = isNotNil(full_eventScore) ? full_eventScore[home.teamId] : "-";
  const awayScore = isNotNil(full_eventScore) ? full_eventScore[away.teamId] : "-";

  return {
    home,
    away,
    time: match.time,
    score: {
      home: homeScore,
      away: awayScore,
    },
    tournament: match.tournament,
  };
};

export type { ILastMeetingsStats };
export {
  selectLastMeetingsStats,
};
