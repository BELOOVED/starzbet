// @ts-nocheck
import { createElement, memo } from "react";
import { useParamSelector } from "@sb/utils";
import { EWidgetThemes } from "@sb/widget-controller/EWidgetThemes";
import { eventByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { widgetType } from "../../../../../../Store/Widget/Model/WidgetController";
import { VideoPlayer } from "../../../../../../Components/VideoPlayer/VideoPlayer";
import { useWidgets } from "../../../../../../Store/Widget/Model/UseWidgets";
import { SumstatsWidget } from "../SumstatsWidget/SumstatsWidget";

const Widgets = memo(({ widgets, activeWidget, widgetMap }) => {
  if (widgets.length === 0) {
    return null;
  }

  if (widgets.length > 1) {
    return widgetMap[activeWidget];
  }

  return widgetMap[widgets[0]];
});
Widgets.displayName = "Widgets";

const WidgetContainer = ({
  eventId,
  overallView,
  videoOptions,
  children,
  ...rest
}) => {
  const { sportId, participants } = useParamSelector(eventByIdSelector, [eventId]);

  const [widgets, activeWidget, activeHandler] = useWidgets(eventId, EWidgetThemes.e);

  const widgetMap = {
    [widgetType.live]: (
      <SumstatsWidget
        eventId={eventId}
      />
    ),
    [widgetType.video]: (
      <VideoPlayer
        eventId={eventId}
        {...videoOptions}
      />
    ),
    [widgetType.stats]: createElement(overallView, { eventId, sportId, participants }),
  };

  return (
    <div {...rest}>
      {children(widgets, activeWidget, activeHandler)}

      <Widgets
        widgets={widgets}
        activeWidget={activeWidget}
        widgetMap={widgetMap}
      />
    </div>
  );
};
WidgetContainer.displayName = "WidgetContainer";

export { WidgetContainer };
