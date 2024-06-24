import clsx from "clsx";
import { memo } from "react";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { isFinished, isLive } from "@sb/betting-core/EEventStatusUtils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_finished, sportsbookui_starzbet_title_live } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./EventStatus.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { useCountdown } from "../../../../../../../../common/Hooks/UseCountDown";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";

const CountDownTime = memo<ITimeProps>(({ startTime }) => {
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
CountDownTime.displayName = "CountDownTime";

const PreLiveTime = memo<ITimeProps>(({ startTime }) => (
  <div className={classes.preLiveTime}>
    <DateFormat date={startTime} format={"HH:mm"} />
  </div>
));
PreLiveTime.displayName = "PreLiveTime";

const LiveLabel = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.liveLabel}>
      <Ellipsis>
        {t(sportsbookui_starzbet_title_live)}
      </Ellipsis>
    </div>
  );
});
LiveLabel.displayName = "LiveLabel";

const FinishedLabel = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.finishedLabel}>
      <Ellipsis>
        {t(sportsbookui_starzbet_title_finished)}
      </Ellipsis>
    </div>
  );
});
FinishedLabel.displayName = "FinishedLabel";

const EventLabel = memo<IEventStatusProps>(({ status, startTime }) => {
  if (isFinished(status)) {
    return (
      <FinishedLabel />
    );
  }

  if (isLive(status)) {
    return (
      <LiveLabel />
    );
  }

  return (
    <CountDownTime startTime={startTime} />
  );
});
EventLabel.displayName = "EventLabel";

interface IEventStatusProps {
  status: EEventStatus;
  startTime: number;
}

interface ITimeProps {
  startTime: number;
}

const EventStatus = memo<IEventStatusProps>(({ status, startTime }) => (
  <div className={clsx(classes.timeLabel, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
    <EventLabel status={status} startTime={startTime} />

    <PreLiveTime startTime={startTime} />
  </div>
));
EventStatus.displayName = "EventStatus";

export { EventStatus };
