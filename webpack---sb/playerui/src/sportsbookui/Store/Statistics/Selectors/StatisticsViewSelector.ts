// [string] -> Object -> Any
import { type IParticipant as IParticipantStats, type IPlayer, type TEventStatistics, type TScore, type TStatisticsParticipants } from "@sb/statistics-core";
import { type IParticipant as IParticipantBase } from "@sb/betting-core/Feed/Types";
import { entries, isNil, isNotEmpty, isNotNil, Time } from "@sb/utils";

type TStatisticParticipant = Omit<IParticipantBase, "shortId" | "teamId"> & IParticipantStats & {
  teamId: TStatisticsParticipants;
}

const path2 = (path, data) => path.reduce((data, pathItem) => (data || {})[pathItem], data);

// return {name, type, id}
const selectTeamByType = (type: TStatisticsParticipants, statistics: TEventStatistics): TStatisticParticipant => {
  for (const [teamId, participant] of entries(statistics.participants)) {
    if (teamId === type) {
      return {
        ...participant,
        name: participant.name ?? "",
        teamId,
      };
    }
  }

  throw new Error(`Id for participant with type ${type} not resolved.`);
};

const inPtc = (v: number, total: number) => +((v / total) * 100).toFixed(0);
const inPtcArray = (v: number, arr: unknown[]) => isNotNil(v) && isNotEmpty(arr) && v !== 0 ? inPtc(v, arr.length) : 0;
const inPtcString = (v: number, total: number) => `${inPtc(v, total)}%`;

const selectTeamIdByType = (type: TStatisticsParticipants, statistics: TEventStatistics) => selectTeamByType(type, statistics).teamId;

const selectManager = (type: TStatisticsParticipants, statistics: TEventStatistics) => path2(["managers", selectTeamIdByType(type, statistics)], statistics);

const selectStadium = (statistics) => path2(["stadium"], statistics);

const selectTotalPerformance = (participantType: TStatisticsParticipants, statistics: TEventStatistics) =>
  statistics.performance[participantType].total as ("W" | "L" | "D")[];

const sum = (a: number, b: number) => a + b;

const avg = (arr: number[]) => arr.reduce(sum, 0) / arr.length || 0;
const calcGoalsPerMatch = (stats: IPlayer["stats"]) => {
  if (isNil(stats) || isNil(stats.goals) || isNil(stats.matches) || stats.matches === 0) {
    return 0;
  }

  const goalsPerMatch = stats.goals / stats.matches;

  return goalsPerMatch ? goalsPerMatch.toFixed(2) : 0;
};

const selectLastFullEventScoreByHeadToHead = (statistics: TEventStatistics) => {
  const lastMatch = statistics.headToHead[0];

  if (!lastMatch) {
    return null;
  }

  return lastMatch.scores.full_event;
};

const selectScoreForMatch = (scores: TScore, participantType: TStatisticsParticipants): number =>
  isNotNil(scores) &&
  isNotNil(scores.full_event) &&
  isNotNil(scores.full_event[participantType])
    ? scores.full_event[participantType]
    : null;

const computeBest = (currentBest: [number, number] | undefined, team1: number, team2: number): [number, number] => {
  if (!currentBest) {
    return [team1, team2];
  }

  const [prevScore1, prevScore2] = currentBest;

  const prevDiff = prevScore1 - prevScore2;
  const diff = team1 - team2;

  if (prevScore1 <= team1 && diff >= prevDiff) {
    return [team1, team2];
  }

  return currentBest;
};

const playerPositionNormalizer = (birthdate: number, position: string) => {
  if (!position) {
    return "";
  }

  return birthdate
    ? `${Time.differenceInYears(+new Date(), birthdate)}, ${position.toUpperCase()}`
    : position.toUpperCase();
};

export {
  selectTeamByType,
  inPtcArray,
  inPtcString,
  selectManager,
  selectStadium,
  selectTotalPerformance,
  avg,
  calcGoalsPerMatch,
  selectLastFullEventScoreByHeadToHead,
  selectScoreForMatch,
  computeBest,
  playerPositionNormalizer,
  type TStatisticParticipant,
};
