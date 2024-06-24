// @ts-nocheck
import { memo, useState } from "react";
import { EventContainer } from "../../../../../../Containers/EventContainer/EventContainer";
import { StatisticPage } from "../../../Desktop/Components/Statistics/StatisticPage/StatisticPage";
import { MarketsWithTabs } from "../../Components/MarketsWithTabs/MarketsWithTabs";
import { EventHeader } from "../../Components/EventHeader/EventHeader";
import { EventSuspended } from "../../Components/EventSuspended/EventSuspended";
import { LiveEventWidgets } from "../../Components/EventWidgets/EventWidgets";

const LiveEventContent = memo(({
  event: {
    id,
    tournamentId,
    sportId,
  },
}) => {
  const [statistics, setStatistics] = useState(false);

  return (
    <div>
      <EventHeader
        tournamentId={tournamentId}
        eventId={id}
        live
      />

      <LiveEventWidgets
        eventId={id}
        statistics={statistics}
        setStatistics={setStatistics}
      />

      {
        !statistics
          ? (
            <div>
              <MarketsWithTabs
                eventId={id}
                sportId={sportId}
              />
            </div>
          )
          : (<StatisticPage eventId={id} />)
      }
    </div>
  );
});
LiveEventContent.displayName = "LiveEventContent";

const LiveEvent = memo(({ match: { params: { eventId } } }) => (
  <EventContainer
    contentView={LiveEventContent}
    emptyView={EventSuspended}
    eventId={eventId}
  />
));
LiveEvent.displayName = "LiveEvent";

export { LiveEvent };
