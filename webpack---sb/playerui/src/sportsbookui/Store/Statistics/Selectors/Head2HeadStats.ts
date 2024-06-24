import { type TEventStatistics } from "@sb/statistics-core";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { avg, computeBest, inPtcString, selectTeamByType } from "./StatisticsViewSelector";

interface IHead2HeadStats {
  avgGoals: {
    home: string;
    away: string;
  };
  best: {
    home: [number, number];
    away: [number, number];
  };
  home: number;
  away: number;
  draw: number;
  total: number;
  ptc: {
    home: string;
    away: string;
    draw: string;
  };
}

const computeH2hStats = (statistics: TEventStatistics): IHead2HeadStats => {
  const homeId = selectTeamByType(EParticipantType.team1, statistics).teamId;
  const awayId = selectTeamByType(EParticipantType.team2, statistics).teamId;

  let home = 0;
  let away = 0;
  let draw = 0;

  const goalsScoredTeam1: number[] = [];
  const goalsScoredTeam2: number[] = [];

  let bestHomeWin: [number, number] | undefined;
  let bestAwayWin: [number, number] | undefined;

  statistics.headToHead.forEach((match) => {
    const full_eventScore = match.scores.full_event;

    if (full_eventScore) {
      const team1Score = full_eventScore[homeId];
      const team2Score = full_eventScore[awayId];

      goalsScoredTeam1.push(team1Score);
      goalsScoredTeam2.push(team2Score);

      if (team1Score > team2Score) {
        bestHomeWin = computeBest(bestHomeWin, team1Score, team2Score);

        home++;

        return;
      }

      if (team2Score > team1Score) {
        bestAwayWin = computeBest(bestAwayWin, team2Score, team1Score);

        away++;

        return;
      }

      draw++;
    }
  });

  const total = home + away + draw;

  return {
    avgGoals: {
      home: avg(goalsScoredTeam1).toFixed(2),
      away: avg(goalsScoredTeam2).toFixed(2),
    },
    best: {
      home: bestHomeWin,
      away: bestAwayWin,
    },
    home,
    away,
    draw,
    total,
    ptc: {
      home: inPtcString(home, total),
      away: inPtcString(away, total),
      draw: inPtcString(draw, total),
    },
  };
};

export { computeH2hStats };
export type {
  IHead2HeadStats,
};
