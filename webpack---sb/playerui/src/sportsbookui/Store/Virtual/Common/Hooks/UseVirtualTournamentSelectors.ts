import { isFinished, isLive } from "@sb/betting-core/EEventStatusUtils";
import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { eventIdListByTournamentIdSelector, eventsSelector } from "../../../Feed/Selectors/FeedSelectors";

const virtualTournamentStatusSelector = createSimpleSelector(
  [
    eventIdListByTournamentIdSelector,
    eventsSelector,
  ],
  (eventIds, events) => {
    if (!eventIds.length) {
      return null;
    }

    return events[eventIds[0]].status;
  },
);

const useVirtualTournamentStatusSelector = (tournamentId) => useParamSelector(
  virtualTournamentStatusSelector,
  [tournamentId],
);

const virtualTournamentStartTimeSelector = createSimpleSelector(
  [
    eventIdListByTournamentIdSelector,
    eventsSelector,
  ],
  (eventIds, events) => {
    if (!eventIds.length) {
      return null;
    }

    return Math.min(...eventIds.map((eventId) => events[eventId].startTime));
  },
);

const useVirtualTournamentStartTimeSelector = (tournamentId) => useParamSelector(
  virtualTournamentStartTimeSelector,
  [tournamentId],
);

const isLiveOrFinishedVirtualTournamentSelector = (tournamentId: string) => (state) => {
  const status = virtualTournamentStatusSelector(state, tournamentId);

  return isFinished(status) || isLive(status);
};

export { useVirtualTournamentStartTimeSelector, useVirtualTournamentStatusSelector, isLiveOrFinishedVirtualTournamentSelector };
