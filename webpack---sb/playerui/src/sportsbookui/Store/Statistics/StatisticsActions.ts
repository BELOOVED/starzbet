import { type IEventKironStatistics, type TEventStatistics } from "@sb/statistics-core";

const statisticViewMountedAction = (eventId: string, fullScreen = false) => ({
  type: "@STATISTICS/STATISTIC_VIEW_MOUNTED",
  payload: { eventId, fullScreen },
});

const closeStatisticAction = (eventId: string) => ({
  type: "@STATISTICS/CLOSE_STATISTIC",
  payload: { eventId },
});

const toggleFullScreeStatisticAction = (eventId: string) => ({
  type: "@STATISTICS/FULL_SCREE_STATISTIC",
  payload: { eventId },
});

const statisticsLoadedAction = (eventId: string, statistics: TEventStatistics | IEventKironStatistics) => ({
  type: "@STATISTICS/STATISTIC_LOADED",
  payload: { eventId, statistics },
});

const statisticsLoadFailedAction = (eventId: string) => ({
  type: "@STATISTICS/STATISTIC_FAILED",
  payload: { eventId },
});

const setExpandedStatisticsAction = (eventId: string, expanded: boolean) => ({
  type: "@STATISTICS/SET_EXPANDED",
  payload: { eventId, expanded },
});

const virtualRacingLoadStatisticsAction = (eventId: string) => ({
  type: "@STATISTICS/VIRTUAL_RACING_LOAD_STATISTICS",
  payload: { eventId },
});

export {
  statisticViewMountedAction,
  closeStatisticAction,
  toggleFullScreeStatisticAction,
  statisticsLoadedAction,
  statisticsLoadFailedAction,
  setExpandedStatisticsAction,
  virtualRacingLoadStatisticsAction,
};
