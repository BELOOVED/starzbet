import type { IEventKironStatistics, TEventStatistics } from "@sb/statistics-core";

type TEventStatisticsCommon = TEventStatistics | IEventKironStatistics

interface IStatistic {
  loading?: boolean;
  error?: boolean;
  fullScreen?: boolean;
  expanded?: boolean;
  statistics?: TEventStatisticsCommon;
}

interface IWithStatisticState {
  statistics: {
    [eventId: string]: IStatistic;
  };
}

const statisticState: IWithStatisticState = {
  statistics: {},
};

export type { IWithStatisticState, TEventStatisticsCommon };
export { statisticState };
