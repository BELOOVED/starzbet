import { memo, type ReactNode } from "react";
import { useParamSelector } from "@sb/utils";
import { isCurrentEventMinuteValid } from "@sb/betting-core/IsCurrentEventMinuteValid";
import { type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { type IWithEventId, type IWithSportId } from "../../../common/IWith";
import { eventByIdNotNilSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { hasViewMinute } from "../../Store/Feed/Model/Event";
import { type TBetHistoryEventPick } from "../../Store/MyBets/Model/TBet";
import { FullScopeName } from "../ScopeName/ScopeName";

const selectMinute = (event: IFlatEvent) => {
  if (!hasViewMinute(event)) {
    return null;
  }

  return event.extraInfo.currentMinute;
};

interface IFullEventStatusProps extends IWithEventId {
  noop?: ReactNode;
}

const FullEventStatus = memo<IFullEventStatusProps>(({ eventId, noop }) => {
  const event = useParamSelector(eventByIdNotNilSelector, [eventId]);

  const minute = selectMinute(event);

  return (
    minute
      ? (
        <>
          {`${minute}' - `}

          <FullScopeName scope={event.currentScope} sportId={event.sportId} />
        </>
      )
      : <FullScopeName scope={event.currentScope} sportId={event.sportId} noop={noop} />
  );
});
FullEventStatus.displayName = "FullEventStatus";

interface IBetFullEventStatusProps extends IWithSportId {
  eventInfo: TBetHistoryEventPick["eventInfo"];
}

const BetFullEventStatus = memo<IBetFullEventStatusProps>(({ eventInfo, sportId }) => {
  const { currentMinute, eventScope } = eventInfo;

  return isCurrentEventMinuteValid(currentMinute, sportId)
    ? (
      <>
        {`${currentMinute}’ - `}

        <FullScopeName scope={eventScope} sportId={sportId} />
      </>
    )
    : <FullScopeName scope={eventScope} sportId={sportId} />;
});
BetFullEventStatus.displayName = "BetFullEventStatus";

export {
  FullEventStatus,
  BetFullEventStatus,
};
