import { useEffect, useReducer, useState } from "react";
import { type EWidgetThemes } from "@sb/widget-controller/EWidgetThemes";
import { useParamSelector } from "@sb/utils";
import { useCheckSumstatsWidget } from "../../../Components/Widget/SumstatsWidget/SumstatsWidget";
import { videoUrlByEventIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { getWidgets, type TTabsValues, widgetType } from "./WidgetController";

const selectActiveTabs = (tabs: TTabsValues[]) => {
  if (tabs.length === 0) {
    return null;
  }

  return tabs[0];
};

const selectPriorityTabs = (tabs: TTabsValues[], priorityTab: string) => tabs.find((tab) => tab === priorityTab);

/**
 * @deprecated
 * use Store/Widget/Hooks/UseWidgets instead
 */
// eslint-disable-next-line rulesdir/no-truethly-default-assign
const useWidgets = (eventId: string, widgetTheme: EWidgetThemes, priorityTab = widgetType.video, hasStatistics = true) => {
  const liveWidget = useCheckSumstatsWidget(eventId, widgetTheme);

  const videoUrl = useParamSelector(videoUrlByEventIdSelector, [eventId]);

  const tabs = getWidgets(liveWidget, !!videoUrl, hasStatistics);

  const [firstChange, doFirstChange] = useReducer(() => true, false);

  const [activeTab, setActiveTab] = useState(selectActiveTabs(tabs));

  useEffect(
    () => {
      if (activeTab === null) {
        setActiveTab(selectActiveTabs(tabs));
      }

      if (!firstChange && selectPriorityTabs(tabs, priorityTab)) {
        doFirstChange();

        setActiveTab(selectActiveTabs(tabs));
      }
    },
    [tabs, activeTab],
  );

  const handler = (tab: TTabsValues) => {
    doFirstChange();

    setActiveTab(tab);
  };

  return [tabs, activeTab, handler];
};

export { useWidgets };
