import clsx from "clsx";
import { memo } from "react";
import { type TVoidFn, useParamSelector } from "@sb/utils";
import {
  sportsbookui_starzbet_liveEvent_button_overall,
  sportsbookui_starzbet_statistics_title_statistics,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./EventButtons.module.css";
import { When } from "../../../../../../../common/Components/When";
import { hasStatisticsByEventIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { InfoIcon } from "../../../Components/Icons/InfoIcon/InfoIcon";
import { StatsIcon } from "../../../Components/Icons/StatsIcon/StatsIcon";

interface IEventButtons {
  eventId: string;
  statistics: boolean;
  setStatistics: TVoidFn;
  isFull?: boolean;
  isLive?: boolean;
}

const EventButtons = memo<IEventButtons>(({
  eventId,
  statistics,
  setStatistics,
  isFull,
  isLive,
}) => {
  const hasStatistics = useParamSelector(hasStatisticsByEventIdSelector, [eventId]);
  const [t] = useTranslation();

  const setStatisticsOn = () => setStatistics(true);
  const setStatisticsOff = () => setStatistics(false);

  return (
    <When condition={hasStatistics}>
      <div className={clsx(classes.eventButtonsWrapper, !isLive && statistics && classes.activeStatistics)}>
        <div
          className={clsx(classes.eventButton, statistics && classes.active, isFull && classes.eventButtonFull)}
          onClick={setStatisticsOn}
        >
          <StatsIcon />

          {isFull && <div>{t(sportsbookui_starzbet_statistics_title_statistics)}</div>}
        </div>

        <div
          className={clsx(classes.eventButton, !statistics && classes.active, isFull && classes.eventButtonFull)}
          onClick={setStatisticsOff}
        >
          <InfoIcon />

          {isFull && <div>{t(sportsbookui_starzbet_liveEvent_button_overall)}</div>}
        </div>
      </div>
    </When>
  );
});
EventButtons.displayName = "EventButtons";

export { EventButtons };
