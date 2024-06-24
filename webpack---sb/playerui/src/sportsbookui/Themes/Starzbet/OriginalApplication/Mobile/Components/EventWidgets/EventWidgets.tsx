// @ts-nocheck

import Carousel from "nuka-carousel";
import clsx from "clsx";
import { createElement, memo, useCallback } from "react";
import { useParamSelector, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_eventWidget_watch,
  sportsbookui_starzbet_eventWidget_widget,
  sportsbookui_starzbet_liveEvent_button_overall,
  sportsbookui_starzbet_statistics_button_statistics,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./EventWidgets.module.css";
import { eventByIdSelector, hasStatisticsByEventIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { widgetType } from "../../../../../../Store/Widget/Model/WidgetController";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { InfoIcon } from "../../../Components/Icons/InfoIcon/InfoIcon";
import { StatsIcon } from "../../../Components/Icons/StatsIcon/StatsIcon";
import { WidgetIcon } from "../../../Components/Icons/WidgetIcon/WidgetIcon";
import { PlayLinkIcon } from "../../../Components/Icons/PlayLinkIcon/PlayLinkIcon";
import { LiveEventOverall, PreLiveEventOverall } from "../EventOverall/EventOverall";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const Button = memo(({
  slideHandler,
  widgetHandler,
  type,
  tKey,
  active,
  setStatisticsOff,
  icon,
}) => {
  const [t] = useTranslation();

  const clickHandler = useCallback(
    () => {
      setStatisticsOff();
      slideHandler();

      widgetHandler(type);
    },
    [],
  );

  return (
    <div className={clsx(classes.button, type === active && classes.active)} onClick={clickHandler}>
      {createElement(icon)}

      <Ellipsis>
        {t(tKey)}
      </Ellipsis>
    </div>
  );
});
Button.displayName = "Button";

const LiveWidgetButton = withProps(Button)({
  type: widgetType.live,
  tKey: sportsbookui_starzbet_eventWidget_widget,
  icon: WidgetIcon,
});

const StreamingButton = withProps(Button)({
  type: widgetType.video,
  tKey: sportsbookui_starzbet_eventWidget_watch,
  icon: PlayLinkIcon,
});

const OverallButton = withProps(Button)({
  type: widgetType.stats,
  tKey: sportsbookui_starzbet_liveEvent_button_overall,
  icon: InfoIcon,
});

const buttons = {
  [widgetType.stats]: OverallButton,
  [widgetType.video]: StreamingButton,
  [widgetType.live]: LiveWidgetButton,
};

const WidgetCarousel = memo(({
  widgets,
  active,
  handler,
  statistics,
  setStatistics,
  eventId,
}) => {
  const hasStatistics = useParamSelector(hasStatisticsByEventIdSelector, [eventId]);
  const [t] = useTranslation();
  const setStatisticsOn = () => {
    handler("");
    setStatistics(true);
  };
  const setStatisticsOff = () => setStatistics(false);
  const renderCenterLeftControls = useCallback(
    () => (
      widgets.length && (
        <div className={classes.tabsWrapper}>
          {
            widgets.map(
              (widget, i) => (
                <div className={classes.buttonWrapper} key={i}>
                  {
                    createElement(
                      buttons[widget],
                      {
                        slideHandler: handler,
                        widgetHandler: handler,
                        active: active,
                        setStatisticsOff: setStatisticsOff,
                      },
                    )
                  }
                </div>
              ),
            )
          }

          {
            hasStatistics && (
              <div
                className={clsx(classes.button, statistics && classes.active)}
                onClick={setStatisticsOn}
              >
                <StatsIcon />

                <div>{t(sportsbookui_starzbet_statistics_button_statistics)}</div>
              </div>
            )
          }
        </div>
      )
    ),
    [widgets, active, handler],
  );

  return (
    <div className={classes.carousel}>
      <Carousel
        slidesToShow={1}
        wrapAround
        renderCenterLeftControls={renderCenterLeftControls}
        renderBottomCenterControls={null}
        renderCenterRightControls={null}
      >
        {widgets.map((widget) => (<div key={widget} />))}
      </Carousel>
    </div>
  );
});
WidgetCarousel.displayName = "WidgetCarousel";

const PreLiveEventWidgets = memo(({ eventId, setStatistics, statistics }) => {
  const { participants, sportId } = useParamSelector(eventByIdSelector, [eventId]);

  return (
    <PreLiveEventOverall
      eventId={eventId}
      sportId={sportId}
      participants={participants}
      setStatistics={setStatistics}
      statistics={statistics}
    />
  );
});
PreLiveEventWidgets.displayName = "PreLiveEventWidgets";

const videoOptions = { height: 205 };

const LiveEventWidgets = memo(({ eventId, setStatistics, statistics }) => (
  <div>
    <WidgetContainer
      key={eventId}
      eventId={eventId}
      overallView={withProps(LiveEventOverall)({ setStatistics, statistics })}
      videoOptions={videoOptions}
      className={classes.container}
    >
      {
        (widgets, active, handler) => widgets.length > 1
          ? (
            <WidgetCarousel
              eventId={eventId}
              setStatistics={setStatistics}
              statistics={statistics}
              widgets={widgets}
              active={active}
              handler={handler}
            />
          )
          : null
      }
    </WidgetContainer>
  </div>
));
LiveEventWidgets.displayName = "LiveEventWidgets";

export { PreLiveEventWidgets, LiveEventWidgets };
