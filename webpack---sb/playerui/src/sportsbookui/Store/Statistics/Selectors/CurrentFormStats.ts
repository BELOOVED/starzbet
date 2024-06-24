import { type TEventStatistics, type TStatisticsParticipants } from "@sb/statistics-core";
import { inPtcArray, selectTeamByType, selectTotalPerformance, type TStatisticParticipant } from "./StatisticsViewSelector";

interface IPtc {
  win: number;
  loss: number;
  draw: number;
}

type TPerformance = "W" | "D" | "L";

interface ICurrentFormStats {
  team: TStatisticParticipant;
  performance: TPerformance[];
  ptc: IPtc;
}

const teamCurrentFormStatsSelector = (statistic: TEventStatistics, teamType: TStatisticsParticipants): ICurrentFormStats => {
  const team = selectTeamByType(teamType, statistic);

  const performance = selectTotalPerformance(team.teamId, statistic);

  const winCount = performance.filter((it) => it === "W").length;
  const lossCount = performance.filter((it) => it === "L").length;
  const drawCount = performance.filter((it) => it === "D").length;

  return {
    team,
    performance,
    ptc: {
      win: inPtcArray(winCount, performance),
      loss: inPtcArray(lossCount, performance),
      draw: inPtcArray(drawCount, performance),
    },
  };
};

export type{ TPerformance, ICurrentFormStats, IPtc };
export { teamCurrentFormStatsSelector };
