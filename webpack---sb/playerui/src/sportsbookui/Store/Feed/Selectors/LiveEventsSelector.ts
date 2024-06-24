import { createSelector } from "reselect";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { createSimpleSelector } from "@sb/utils";
import { type TSportId } from "../../MarketFilter/Model/MarketPreset";
import { type TAppState } from "../../InitialState";
import { isBaseSport, isEsport, sortByPriority } from "../Model/Sport";
import { sortEventIdsByStartTimeAndName } from "../Model/Event";
import { eventsSelector, sportsSelector, videoUrlByEventIdSelector } from "./FeedSelectors";

const liveEventsSelector = createSelector(
  eventsSelector,
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isLive(event.status)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const liveNotEsportEventsSelector = createSelector(
  liveEventsSelector,
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isBaseSport(event.sportId)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const sizeLiveNotEsportEventsSelector = createSelector(
  liveNotEsportEventsSelector,
  (events) => Object.keys(events).length,
);

const sizeLiveNotEsportEventsWithVideoSelector = createSimpleSelector(
  [liveNotEsportEventsSelector],
  (events) => Object.values(events).filter(({ extraInfo }) => extraInfo.videoUrl).length,
);

const liveEsportEventsSelector = createSelector(
  liveEventsSelector,
  (events) => {
    const map: Record<string, IFlatEvent> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (event && isEsport(event.sportId)) {
        map[eventId] = event;
      }
    });

    return map;
  },
);

const sizeLiveEsportEventsSelector = createSimpleSelector(
  [liveEsportEventsSelector],
  (events) => Object.keys(events).length,
);

const sizeLiveEsportEventsWithVideoSelector = createSimpleSelector(
  [liveEsportEventsSelector],
  (events) => Object.values(events).filter(({ extraInfo }) => extraInfo.videoUrl).length,
);

const liveEventsWithVideoIdsSelector = (state: TAppState) => (
  Object.keys(liveNotEsportEventsSelector(state))
    .filter((eventId) => videoUrlByEventIdSelector(state, eventId))
);

const sizeLiveEventBySportIdSelector = createSimpleSelector(
  [
    liveEventsSelector,
    (_, sportId): TSportId => sportId,
  ],
  (events, sportId) => Object.keys(events).filter(((eventId) => events[eventId]?.sportId === sportId)).length,
);

const sportsWithVideoIdsSelector = createSelector(
  sportsSelector,
  eventsSelector,
  liveEventsWithVideoIdsSelector,
  (sports, events, eventIds): string[] => sortByPriority(
    sports,
    Object.keys(sports)
      .filter((sportId) => eventIds.some((eventId) => events[eventId]?.sportId === sportId)),
  ),
);

const countEventsWithVideoBySportIdSelector = (state: TAppState, sportId: string) => {
  const eventIds = liveEventsWithVideoIdsSelector(state);
  const events = eventsSelector(state);

  return eventIds.filter((eventId) => events[eventId]?.sportId === sportId).length;
};

const countEventsWithVideoBySportIdsSelector = (state: TAppState, sportIds: string[]) => (
  sportIds.reduce((acc, id) => acc + countEventsWithVideoBySportIdSelector(state, id), 0)
);

const liveEventsWithVideoIdsBySportIdSelector = (state: TAppState, sportId: string) => {
  const events = eventsSelector(state);

  const eventIds = liveEventsWithVideoIdsSelector(state)
    .filter((eventId) => events[eventId]?.sportId === sportId);

  return sortEventIdsByStartTimeAndName(events)(eventIds);
};

export {
  liveEventsSelector,
  liveNotEsportEventsSelector,
  liveEsportEventsSelector,
  sizeLiveNotEsportEventsSelector,
  liveEventsWithVideoIdsSelector,
  sportsWithVideoIdsSelector,
  countEventsWithVideoBySportIdSelector,
  countEventsWithVideoBySportIdsSelector,
  liveEventsWithVideoIdsBySportIdSelector,
  sizeLiveEsportEventsSelector,
  sizeLiveEventBySportIdSelector,
  sizeLiveEsportEventsWithVideoSelector,
  sizeLiveNotEsportEventsWithVideoSelector,
};
