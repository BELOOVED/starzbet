// @ts-nocheck
import { memo } from "react";
import { EventContainer } from "../../../../../../Containers/EventContainer/EventContainer";
import { StatisticPopup } from "../../Components/Statistics/StatisticPopup/StatisticPopup";
import { EventSuspended } from "../../Components/EventSuspended/EventSuspended";

const Statistics = memo(({ match: { params: { eventId } } }) => (
  <EventContainer
    eventId={eventId}
    contentView={StatisticPopup}
    emptyView={EventSuspended}
  />
));
Statistics.displayName = "Statistics";

export { Statistics };
