import { createSimpleSelector } from "@sb/utils";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { eventsSelector, tournamentToEventMapSelector } from "./FeedSelectors";

const eventCountByTournamentIdSelector = createSimpleSelector(
  [
    tournamentToEventMapSelector,
    eventsSelector,
    (_, tournamentId: string) => tournamentId,
    (_, __, eventFilter?: (status: EEventStatus) => boolean) => eventFilter,
  ],
  (tournamentToEventMap, events, tournamentId, eventFilter) => {
    const tournamentEventIds = tournamentToEventMap[tournamentId] || [];
    if (eventFilter) {
      return tournamentEventIds.filter((eventId) => {
        const event = events[eventId];

        return event && eventFilter(event.status);
      }).length;
    } else {
      return tournamentEventIds.length;
    }
  },
);

export {
  eventCountByTournamentIdSelector,
};
