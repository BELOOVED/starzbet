// @ts-nocheck
import { createMemoSelector } from "@sb/utils";
import { isBaseSport, isVirtual, sortSportByPriority } from "../Model/Sport";
import { sportsSelector } from "../Selectors/FeedSelectors";
import { liveEventsSelector } from "../Selectors/LiveEventsSelector";

// todo
const liveSportsSelectorFactory = (filterEvent) => createMemoSelector(
  [
    sportsSelector,
    liveEventsSelector,
  ],
  (sports, events) => {
    const sportMap = {};

    const eventIdList = filterEvent
      ? Object.keys(events).filter(filterEvent(events))
      : Object.keys(events);

    eventIdList.forEach((eventId) => {
      const { sportId } = events[eventId];

      if (!sportMap.hasOwnProperty(sportId)) {
        sportMap[sportId] = { id: sportId, ...sports[sportId], eventCount: 0 };
      }

      sportMap[sportId].eventCount += 1;
    });

    return sortSportByPriority(Object.values(sportMap));
  },
);

const withoutEsportsLiveSelector = liveSportsSelectorFactory(
  (events) => (eventId) => isBaseSport(events[eventId].sportId) && !isVirtual(events[eventId].sportId),
);

export {
  withoutEsportsLiveSelector,
};
