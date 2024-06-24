// @ts-nocheck
import { createSelector } from "reselect";
import { isLive, isPreLive } from "@sb/betting-core/EEventStatusUtils";
import { createSimpleSelector, isNotEmpty } from "@sb/utils";
import { sortBy } from "../../../Utils/SortBy";
import { isBaseSport, isEsport, isVirtual, sortSportByPriority, virtualSportIdOrder } from "../Model/Sport";
import { eventsSelector, outrightsSelector, sportsSelector } from "../Selectors/FeedSelectors";

const sportMapSelectorFactory = (filterEvent) => createSelector(
  sportsSelector,
  eventsSelector,

  (sports, events) => {
    const sportMap = {};

    Object.keys(events).filter(filterEvent(events))
      .forEach((eventId) => {
        const { sportId } = events[eventId];

        if (!sportMap.hasOwnProperty(sportId)) {
          sportMap[sportId] = { id: sportId, ...sports[sportId], eventCount: 0 };
        }

        sportMap[sportId].eventCount += 1;
      });

    return sportMap;
  },
);

const sportsSelectorFactory = (filterEvent) => createSelector(
  sportMapSelectorFactory(filterEvent),
  (sportMap) => sortSportByPriority(Object.values(sportMap)),
);

const sportsWithOutrightsSelectorFactory = (filterEvent) => createSelector(
  sportMapSelectorFactory(filterEvent),
  sportsSelector,
  outrightsSelector,
  (sportMap, sports, outrights) => {
    const map = { ...sportMap };

    Object.values(outrights).forEach(({ sportId }) => {
      if (!map.hasOwnProperty(sportId)) {
        map[sportId] = { id: sportId, ...sports[sportId], eventCount: 0 };
      }

      map[sportId].eventCount = map[sportId].eventCount + 1;
    });

    return sortSportByPriority(Object.values(map));
  },
);

const withoutEsportsPreLiveSelector = sportsWithOutrightsSelectorFactory(
  (events) => (eventId) => isPreLive(events[eventId].status) && isBaseSport(events[eventId].sportId),
);

const withoutEsportsAndVirtualPreLiveSelector = sportsWithOutrightsSelectorFactory(
  (events) => (eventId) => isPreLive(events[eventId].status) && isBaseSport(events[eventId].sportId) && !isVirtual(events[eventId].sportId),
);

const virtualSportsSelectorFactory = (filterEvent) => createSelector(
  sportMapSelectorFactory(filterEvent),
  (sportMap) => sortBy(
    ({ id }) => virtualSportIdOrder.indexOf(id),
    Object.values(sportMap),
  ),
);

const virtualSportSortedSelector = virtualSportsSelectorFactory(
  (events) => (eventId) => isVirtual(events[eventId].sportId),
);

const isVirtualSportExistSelector = createSimpleSelector(
  [virtualSportSortedSelector],
  isNotEmpty,
);

const esportsSelector = sportsSelectorFactory(
  (events) => (eventId) => isEsport(events[eventId].sportId),
);

const esportsPreLiveSelector = sportsSelectorFactory(
  (events) => (eventId) => isPreLive(events[eventId].status) && isEsport(events[eventId].sportId),
);

const esportsLiveSelector = sportsSelectorFactory(
  (events) => (eventId) => isLive(events[eventId].status) && isEsport(events[eventId].sportId),
);

export {
  withoutEsportsPreLiveSelector,
  esportsSelector,
  esportsPreLiveSelector,
  esportsLiveSelector,
  withoutEsportsAndVirtualPreLiveSelector,
  virtualSportSortedSelector,
  isVirtualSportExistSelector,
};
