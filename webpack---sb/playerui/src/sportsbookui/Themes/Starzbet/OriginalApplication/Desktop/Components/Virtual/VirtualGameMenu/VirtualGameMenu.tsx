// @ts-nocheck
import { memo } from "react";
import { useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_title_nextDraw,
  sportsbookui_starzbet_title_nextRace,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { useParamSelector } from "@sb/utils";
import classes from "./VirtualGameMenu.module.css";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { routeMap } from "../../../../../../../RouteMap/RouteMap";
import { nextEventBySportIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { useVirtualGameEventNumberIdSelector } from "../../../../../../../Store/Virtual/Common/Hooks/UseVirtualGameEventNameSelector";
import { CountDownTime } from "../CountDownTime/CountDownTime";
import { RepeatButtons } from "../RepeatButtons/RepeatButtons";

const EventName = memo(({ eventId }) => {
  const drawId = useVirtualGameEventNumberIdSelector(eventId);

  return (
    <div className={classes.eventName}>
      {drawId}
    </div>
  );
});
EventName.displayName = "EventName";

const VirtualGameMenu = ({
  children,
  className,
}) => {
  const [t] = useTranslation();

  const match = useRouteMatch(routeMap.virtual.roulette);
  const eventId = useParamSelector(nextEventBySportIdSelector, [match.params.sportId]);

  const title =
    match.params.sportId === sportCodeToIdMap[ESportCode.kiron_racing_roulette]
      ? sportsbookui_starzbet_title_nextRace
      : sportsbookui_starzbet_title_nextDraw;

  return (
    <div className={classes.menuContainer}>
      <div className={`${classes.menu} ${className}`}>
        <CountDownTime />

        <div className={classes.title}>
          <Ellipsis>
            {t(title)}
          </Ellipsis>

          {eventId && <EventName eventId={eventId} />}
        </div>

        <RepeatButtons />
      </div>

      {children}
    </div>
  );
};
VirtualGameMenu.displayName = "VirtualGameMenu";

export { VirtualGameMenu };
