// @ts-nocheck
import { createRef, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { EWidgetThemes } from "@sb/widget-controller/EWidgetThemes";
import { EWidgetCodes } from "@sb/widget-controller/EWidgetCodes";
import classes from "./SumstatsWidget.module.css";
import { Logger } from "../../../../common/Utils/Logger";
import { sportIdByEventIdSelector } from "../../../Store/Feed/Selectors/FeedSelectors";
import { localeSelector } from "../../../Store/Locale/LocaleSelector";
import { widgetController } from "../../../Store/Widget/Model/WidgetController";
import { widgetControllerInitializeSelector } from "../../../Store/Widget/Selectos/WidgetSelectos";

const useCheckSumstatsWidget = (eventId, theme = EWidgetThemes.a, checkCodes = [EWidgetCodes.a, EWidgetCodes.b, EWidgetCodes.c]) => {
  const [checked, setChecked] = useState(false);

  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

  const initialize = useSelector(widgetControllerInitializeSelector);

  useEffect(
    () => {
      if (initialize) {
        const checks = checkCodes
          .map((code) => widgetController.getInstance().checkWidget({
            widgetTheme: theme,
            sportCode: sportIdToCodeMap[sportId],
            widgetCode: code,
            matchId: eventId,
          }));

        Promise
          .all(checks.map(({ promise }) => promise))
          .then(() => setChecked(true))
          .catch((e) => {
            Logger.warn.app(`failed to check widget: ${e.message || e.error || e}`);
          });

        return () => checks.forEach((it) => it.abort());
      }

      return void 0;
    },
    [initialize],
  );

  return checked;
};

const SumstatsWidget = memo(({ eventId, theme = EWidgetThemes.a, code = EWidgetCodes.a }) => {
  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

  const locale = useSelector(localeSelector);

  const containerRef = createRef();

  useEffect(
    () => {
      let widgetControl;

      const { promise, abort } = widgetController.getInstance().createWidget({
        widgetTheme: theme,
        sportCode: sportIdToCodeMap[sportId],
        widgetCode: code,
        locale,
        matchId: eventId,
        container: containerRef.current,
      });

      promise
        .then((control) => {
          widgetControl = control;
        })
        .catch((e) => {
          Logger.warn.app(`failed to create widget: ${e.message || e.error || e}`);
        });

      return () => {
        abort();

        widgetControl && widgetController.getInstance().destroyWidget(widgetControl);
      };
    },
    [],
  );

  return (
    <div
      className={classes.widgetContainer}
      ref={containerRef}
    />
  );
});
SumstatsWidget.displayName = "SumstatsWidget";

export { useCheckSumstatsWidget, SumstatsWidget };
