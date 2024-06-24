// @ts-nocheck
import { memo, useState } from "react";
import { EventContainer } from "../../../../../../Containers/EventContainer/EventContainer";
import { StatisticPage } from "../../../Desktop/Components/Statistics/StatisticPage/StatisticPage";
import { EventHeader } from "../../Components/EventHeader/EventHeader";
import { EventSuspended } from "../../Components/EventSuspended/EventSuspended";
import { PreLiveEventWidgets } from "../../Components/EventWidgets/EventWidgets";
import { EventButtons } from "../../Components/EventButtons/EventButtons";
import { MarketsWithTabs } from "../../Components/MarketsWithTabs/MarketsWithTabs";

const PreLiveEventContent = memo(({
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
      />

      {
        !statistics
          ? (
            <div>
              <PreLiveEventWidgets eventId={id} setStatistics={setStatistics} statistics={statistics} />

              <MarketsWithTabs
                eventId={id}
                sportId={sportId}
              />
            </div>
          )
          : (
            <>
              <EventButtons
                eventId={id}
                setStatistics={setStatistics}
                statistics={statistics}
                isFull={true}
              />

              <StatisticPage eventId={id} />
            </>
          )
      }
    </div>
  );
});
PreLiveEventContent.displayName = "PreLiveEventContent";

const PreLiveEvent = memo(({ match: { params: { eventId } } }) => (
  <EventContainer
    contentView={PreLiveEventContent}
    emptyView={EventSuspended}
    eventId={eventId}
  />
));
PreLiveEvent.displayName = "PreLiveEvent";

export { PreLiveEvent };
