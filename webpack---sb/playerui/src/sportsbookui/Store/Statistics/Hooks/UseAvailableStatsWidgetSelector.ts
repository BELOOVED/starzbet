import { useParamSelector } from "@sb/utils";
import { availableStatsWidgetSelector } from "../Selectors/StatisticsSelectors";

const useAvailableStatsWidgetSelector = (eventId: string) => useParamSelector(availableStatsWidgetSelector, [eventId]);

export { useAvailableStatsWidgetSelector };
