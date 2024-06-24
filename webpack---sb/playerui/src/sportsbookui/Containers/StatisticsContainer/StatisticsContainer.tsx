import { createElement, memo } from "react";
import { type TComponent, useParamSelector } from "@sb/utils";
import { type IWithEventId } from "../../../common/IWith";
import { useAvailableStatsWidgetSelector } from "../../Store/Statistics/Hooks/UseAvailableStatsWidgetSelector";
import {
  statisticsByEventIdSelector,
  statisticsErrorSelector,
  statisticsLoadingSelector,
} from "../../Store/Statistics/Selectors/StatisticsSelectors";
import { type EStatisticsWidget } from "../../Store/Statistics/Model/Statistics";
import type { IWithNotNilEventStatistics } from "../../Store/Statistics/Model/IWithEventStatistics";

interface IWidgetsProps {
  eventId: string;
  widgets: EStatisticsWidget[];
  stats: IWithNotNilEventStatistics;
}

interface IStatisticsContainerProps extends IWithEventId {
  loader: TComponent;
  error: TComponent;
  widgetsContainer: TComponent<IWidgetsProps>;
}

const StatisticsContainer = memo<IStatisticsContainerProps>(({
  eventId,
  loader,
  error,
  widgetsContainer,
}) => {
  const widgets = useAvailableStatsWidgetSelector(eventId);
  const stats = useParamSelector(statisticsByEventIdSelector, [eventId]);

  const isLoading = useParamSelector(statisticsLoadingSelector, [eventId]);
  const isError = useParamSelector(statisticsErrorSelector, [eventId]);

  if (isLoading && !stats.statistics) {
    return createElement(loader);
  }

  if (!stats.statistics || isError) {
    return createElement(error);
  }

  return createElement(widgetsContainer, { eventId: eventId, widgets: widgets, stats: stats });
});
StatisticsContainer.displayName = "StatisticsContainer";

export { StatisticsContainer, type IWidgetsProps };
