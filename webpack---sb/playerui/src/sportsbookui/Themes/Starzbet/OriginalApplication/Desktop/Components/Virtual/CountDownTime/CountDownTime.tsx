// @ts-nocheck
import { memo } from "react";
import { useRouteMatch } from "@sb/react-router-compat";
import { useParamSelector } from "@sb/utils";
import classes from "./CountDownTime.module.css";
import { useCountdown } from "../../../../../../../../common/Hooks/UseCountDown";
import { eventStartTimeByIdSelector, nextEventBySportIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { routeMap } from "../../../../../../../RouteMap/RouteMap";

const CountDown = memo(({ startTime }) => {
  const {
    minutes,
    seconds,
  } = useCountdown(startTime);

  if (!minutes && !seconds) {
    return (
      <div className={classes.countDown}>
        {"00:00"}
      </div>
    );
  }

  return (
    <div className={classes.countDown}>
      {minutes}

      {":"}

      {seconds}
    </div>
  );
});
CountDown.displayName = "CountDown";

const CountDownTime = memo(() => {
  const match = useRouteMatch(routeMap.virtual.roulette);

  const eventId = useParamSelector(nextEventBySportIdSelector, [match?.params?.sportId]);
  const startTime = useParamSelector(eventStartTimeByIdSelector, [eventId]);

  if (!startTime) {
    return null;
  }

  return <CountDown startTime={startTime} />;
});
CountDownTime.displayName = "CountDownTime";

export { CountDownTime };
