// @ts-nocheck
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import classes from "./EventStatus.module.css";
import { eventByIdSelector } from "../../../../../Store/Feed/Selectors/FeedSelectors";
import { hasViewMinute } from "../../../../../Store/Feed/Model/Event";
import { FullScopeName } from "../../../../../Components/ScopeName/ScopeName";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";

const selectMinute = (event) => {
  if (!hasViewMinute(event)) {
    return null;
  }

  return event.extraInfo.currentMinute;
};

const FullEventStatus = memo(({ eventId, noop }) => {
  const event = useParamSelector(eventByIdSelector, [eventId]);

  const minute = selectMinute(event);

  return (
    minute
      ? (
        <div className={classes.eventStatusWrapper}>
          <div className={classes.minute}>
            {`${minute}'`}
          </div>

          <div className={classes.gamePeriod}>
            <Ellipsis>
              <FullScopeName
                scope={event.currentScope}
                sportId={event.sportId}
              />
            </Ellipsis>
          </div>
        </div>
      )
      : (
        <div className={classes.scopeName}>
          <Ellipsis>
            <FullScopeName
              scope={event.currentScope}
              sportId={event.sportId}
              noop={noop}
            />
          </Ellipsis>
        </div>
      )
  );
});
FullEventStatus.displayName = "FullEventStatus";

export { FullEventStatus };
