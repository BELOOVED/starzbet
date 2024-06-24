import { createOptionalPropertySelector, createSimpleSelector, isNil, isNotEmpty, isNotNil, isNotVoid } from "@sb/utils";
import { type IPerformance, type TStatisticsParticipants } from "@sb/statistics-core";
import { callManagerFailedSelector, callManagerStartedSelector } from "@sb/call-manager";
import { getTeamNumber } from "../../Virtual/ScoreRacingSport/Model/GetTeamNumber";
import { EStatisticsWidget } from "../Model/Statistics";
import { type IWithStatisticState } from "../StatisticState";
import { isBaseEventStatistic, isKironEventStatistic } from "../Model/StatisticsTypeGuard";
import { STATISTIC_PARSER_LOAD_SYMBOL } from "../Model/Variables";

const selectAllStatistics = (state: IWithStatisticState) => state.statistics;

const statisticsByEventIdSelector = (state: IWithStatisticState, eventId: string) => {
  const statisticsState = selectAllStatistics(state)[eventId];

  if (isNil(statisticsState) || isNil(statisticsState.statistics)) {
    return {
      ...statisticsState,
      statistics: null,
    };
  }

  const { statistics, ...rest } = statisticsState;

  if (isBaseEventStatistic(statistics)) {
    return { statistics, ...rest };
  }

  throw new Error(`Unexpected statistic type by statisticsByEventIdSelector for ${eventId}`);
};

const notEmptyPerformance = (performance: Record<TStatisticsParticipants, IPerformance>) =>
  Object.values(performance).some((obj) => Object.values(obj).flat().length !== 0);

const notEmptyArraysInObject = (matches: Record<string, unknown[]>) =>
  Object.values(matches).some(isNotEmpty);

const availableStatsWidgetSelector = createSimpleSelector(
  [statisticsByEventIdSelector],
  (stats) => {
    const widgets: EStatisticsWidget[] = [];

    if (isNil(stats.statistics)) {
      return widgets;
    }

    const {
      performance,
      headToHead,
      lastMatches,
      nextMatches,
      participants,
      tournamentTable,
    } = stats.statistics;

    const firstTable = tournamentTable[0]?.table;

    const table = {
      home: isNotNil(firstTable) ? firstTable.home : [],
      away: isNotNil(firstTable) ? firstTable.away : [],
      total: isNotNil(firstTable) ? firstTable.total : [],
    };

    if (notEmptyPerformance(performance)) {
      widgets.push(EStatisticsWidget.currentForm);
    }

    if (isNotVoid(headToHead)) {
      widgets.push(EStatisticsWidget.headToHead, EStatisticsWidget.lastMeetings);
    }

    if (notEmptyArraysInObject(lastMatches)) {
      widgets.push(EStatisticsWidget.lastMatches);
    }

    if (notEmptyArraysInObject(nextMatches)) {
      widgets.push(EStatisticsWidget.nextMatches);
    }

    if (Object.values(participants).some(({ players }) => players.length !== 0)) {
      widgets.push(EStatisticsWidget.playerStatistics);
    }

    if (isNotNil(tournamentTable) && notEmptyArraysInObject(table)) {
      widgets.push(EStatisticsWidget.leaguePosition);
    }

    return widgets;
  },
);

const isCurrentFormAvailable = createSimpleSelector(
  [statisticsByEventIdSelector],
  (stats) => {
    if (isNil(stats.statistics)) {
      return false;
    }

    return notEmptyPerformance(stats.statistics.performance);
  },
);

const selectStatisticIsLoadingOrLoaded = (state: IWithStatisticState, eventId: string) => {
  const eventStats = statisticsByEventIdSelector(state, eventId);
  const widgets = availableStatsWidgetSelector(state, eventId);

  if (!eventStats || (!eventStats?.loading && widgets.length === 0)) {
    return false;
  }

  return eventStats.statistics || eventStats.loading;
};

const expandedStatisticsSelector = createOptionalPropertySelector(
  statisticsByEventIdSelector,
  "expanded",
);

const virtualRacingStatisticsEntryFormSelector = (state: IWithStatisticState, eventId: string) => {
  const statisticsState = selectAllStatistics(state)[eventId];

  if (isNil(statisticsState) || isNil(statisticsState.statistics)) {
    return null;
  }

  const { statistics } = statisticsState;

  if (isKironEventStatistic(statistics)) {
    return statistics.EntryForm;
  }

  throw new Error(`Unexpected statistic type by virtualRacingStatisticsEntryFormSelector for ${eventId}`);
};

const virtualRacingStatisticsByShortIdSelector = (state: IWithStatisticState, eventId: string, shortId: string) => {
  const statistics = virtualRacingStatisticsEntryFormSelector(state, eventId);

  if (statistics) {
    return statistics.find((statistic) => statistic._attributes.Draw === getTeamNumber(shortId))._attributes;
  }

  return void 0;
};

const statisticsLoadingSelector = callManagerStartedSelector.with.symbol(STATISTIC_PARSER_LOAD_SYMBOL);

const statisticsErrorSelector = callManagerFailedSelector.with.symbol(STATISTIC_PARSER_LOAD_SYMBOL);

export {
  selectAllStatistics,
  statisticsByEventIdSelector,
  availableStatsWidgetSelector,
  selectStatisticIsLoadingOrLoaded,
  expandedStatisticsSelector,
  virtualRacingStatisticsByShortIdSelector,
  statisticsLoadingSelector,
  statisticsErrorSelector,
  isCurrentFormAvailable,
};
