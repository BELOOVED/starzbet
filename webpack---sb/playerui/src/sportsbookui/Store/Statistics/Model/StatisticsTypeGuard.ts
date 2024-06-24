import { type IEventKironStatistics, type TEventStatistics } from "@sb/statistics-core";
import { type TEventStatisticsCommon } from "../StatisticState";

const isKironEventStatistic = (statistic: TEventStatisticsCommon): statistic is IEventKironStatistics => "EntryForm" in statistic;
const isBaseEventStatistic = (statistic: TEventStatisticsCommon): statistic is TEventStatistics => !("EntryForm" in statistic);

export { isKironEventStatistic, isBaseEventStatistic };
