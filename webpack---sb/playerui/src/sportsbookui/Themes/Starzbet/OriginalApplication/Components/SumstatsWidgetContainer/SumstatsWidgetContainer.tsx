// @ts-nocheck
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { EWidgetCodes } from "@sb/widget-controller/EWidgetCodes";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { EWidgetThemes } from "@sb/widget-controller/EWidgetThemes";
import { Logger } from "../../../../../../common/Utils/Logger";
import { sportIdByEventIdSelector } from "../../../../../Store/Feed/Selectors/FeedSelectors";
import { localeSelector } from "../../../../../Store/Locale/LocaleSelector";
import { widgetController } from "../../../../../Store/Widget/Model/WidgetController";

const createParameters = (eventId, sportId, locale, code, container) => ({
  sportCode: sportIdToCodeMap[sportId],
  widgetCode: code,
  locale,
  matchId: eventId,
  container,
});

const SumstatsWidgetContainer = ({ eventId, children }) => {
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

  const locale = useSelector(localeSelector);

  const visualRef = createRef();
  const statisticsRef = createRef();
  const timelineRef = createRef();

  const widgetTheme = EWidgetThemes.e;

  useEffect(
    () => {
      const widgetControls = [];

      const widgets = [
        widgetController
          .getInstance()
          .createWidget({ ...createParameters(eventId, sportId, locale, EWidgetCodes.a, visualRef.current), widgetTheme }),
        widgetController
          .getInstance()
          .createWidget({ ...createParameters(eventId, sportId, locale, EWidgetCodes.b, statisticsRef.current), widgetTheme }),
        widgetController
          .getInstance()
          .createWidget({ ...createParameters(eventId, sportId, locale, EWidgetCodes.c, timelineRef.current), widgetTheme }),
      ];

      Promise
        .all(widgets.map(({ promise }) => promise))
        .then((list) => {
          widgetControls.push(...list);
        })
        .catch((e) => {
          Logger.warn.app("Failed to create widget", e);
        });

      return () => {
        widgets.forEach((it) => it.abort());

        widgetControls.forEach((it) => widgetController.getInstance().destroyWidget(it));
      };
    },
    [],
  );

  return (
    children(visualRef, statisticsRef, timelineRef)
  );
};
SumstatsWidgetContainer.displayName = "SumstatsWidgetContainer";

export { SumstatsWidgetContainer };
