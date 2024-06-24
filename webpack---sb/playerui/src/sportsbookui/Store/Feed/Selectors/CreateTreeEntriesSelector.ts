// @ts-nocheck
import { createSelector, type Selector } from "reselect";
import { fakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";
import { type TAppState } from "../../InitialState";
import { eventsSelector, outrightsSelector } from "./FeedSelectors";

enum ECombineMode {
  separated = "separated",
  neighbor = "neighbor",
  merge = "merge",
}

interface ITreeEntriesOptions {
  sourceSelector: Selector<TAppState>;
  sortBy?: (map: Record<string, string>) => (ids: string[]) => string[];
}

const separated = (eventMap) => Object.entries(eventMap)
  .map(([eventId, tree]) => [eventId, ...tree].reduce((prev, next) => [next, [prev]]));

const neighbor = (entries) => {
  const result = [];

  entries.forEach(([id, children]) => {
    const last = result.at(-1);

    if (last && last[0] === id) {
      const flattened = children.every((it) => typeof it === "string");

      const lastChildren = result.pop().at(-1);

      result.push([
        id,
        flattened
          ? lastChildren.concat(children)
          : neighbor(lastChildren.concat(children)),
      ]);

      return;
    }

    result.push([id, children]);
  });

  return result;
};

const merge = (entries) => {
  const result = [];

  entries.forEach(([id, children]) => {
    const lastIndex = result.findIndex(([itemId]) => itemId === id);

    if (-1 === lastIndex) {
      result.push([id, children]);

      return;
    }

    const flattened = children.every((it) => typeof it === "string");

    const lastChildren = result.at(lastIndex).at(-1);

    result[lastIndex] = [
      id,
      flattened
        ? lastChildren.concat(children)
        : merge(lastChildren.concat(children)),
    ];
  });

  return result;
};

const combinerByMode = {
  [ECombineMode.separated]: separated,
  [ECombineMode.neighbor]: (eventMap) => neighbor(separated(eventMap)),
  [ECombineMode.merge]: (eventMap) => merge(separated(eventMap)),
};

const combineSelector = (combineMode, eventMapSelector) => createSelector(eventMapSelector, combinerByMode[combineMode]);

const createEventMapByTournament = (events, eventIdList) => {
  const map = {};

  eventIdList.forEach((eventId) => {
    if (!events[eventId]) {
      return;
    }

    if (!map.hasOwnProperty(eventId)) {
      map[eventId] = [];
    }

    map[eventId].push(events[eventId].tournamentId);
  });

  return map;
};

const createEventMapByCategory = (events, eventIdList) => {
  const map = {};

  eventIdList.forEach((eventId) => {
    if (!events[eventId]) {
      return;
    }

    if (!map.hasOwnProperty(eventId)) {
      map[eventId] = [];
    }

    map[eventId].push(events[eventId].categoryId);
  });

  return map;
};

const createEventMapBySport = (events, eventIdList) => {
  const map = {};

  eventIdList.forEach((eventId) => {
    if (!events[eventId]) {
      return;
    }

    if (!map.hasOwnProperty(eventId)) {
      map[eventId] = [];
    }

    map[eventId].push(events[eventId].sportId);
  });

  return map;
};

const createOutrightMapByTournament = (outrights, outrightIdList) => {
  const map = {};

  outrightIdList.forEach((outrightId) => {
    if (!outrights[outrightId]) {
      return;
    }

    if (!map.hasOwnProperty(outrightId)) {
      map[outrightId] = [];
    }

    map[outrightId].push(fakeOutrightTournamentId(outrights[outrightId].tournamentId));
  });

  return map;
};

const updateEventMapBySport = (events, eventMap) => {
  const map = {};

  Object.entries(eventMap).forEach(([eventId, tree]) => {
    map[eventId] = [...tree, events[eventId].sportId];
  });

  return map;
};

const updateEventMapByTournament = (events, eventMap) => {
  const map = {};

  Object.entries(eventMap).forEach(([eventId, tree]) => {
    map[eventId] = [...tree, events[eventId].tournamentId];
  });

  return map;
};

const updateOutrightMapBySport = (outrights, outrightMap) => {
  const map = {};

  Object.entries(outrightMap).forEach(([outrightId, tree]) => {
    map[outrightId] = [...tree, outrights[outrightId].sportId];
  });

  return map;
};

const combineSportIds = (events, eventIdList) => {
  const map = {};

  eventIdList.forEach((eventId) => {
    if (!events[eventId]) {
      return;
    }

    map[events[eventId].sportId] = true;
  });

  return Object.keys(map);
};

const combineCategoryIds = (sportId) => (events, eventIdList) => {
  const map = {};

  eventIdList.forEach((eventId) => {
    const event = events[eventId];

    if (!event || event.sportId !== sportId) {
      return;
    }

    map[event.categoryId] = true;
  });

  return Object.keys(map);
};

const combineTournamentIds = (categoryId) => (events, eventIdList) => {
  const map = {};

  eventIdList.forEach((eventId) => {
    const event = events[eventId];

    if (!event || event.categoryId !== categoryId) {
      return;
    }

    map[event.tournamentId] = true;
  });

  return Object.keys(map);
};

const getSize = (id: string) => (map) => Object.values(map).filter((it) => it.includes(id)).length;

const getKeys = (id: string) => (map) => Object.keys(map).filter((key) => map[key].includes(id));

const fromSport = (mapSelector) => ({
  values: (combineMode = ECombineMode.merge) => combineSelector(combineMode, mapSelector),
  concat: (selector, combineMode) => createSelector(
    fromSport(mapSelector).values(combineMode),
    selector,
    (prev, next) => [...prev, ...next],
  ),
  sizeById: (id: string) => createSelector(
    mapSelector,
    getSize(id),
  ),
  keysById: (id: string) => createSelector(
    mapSelector,
    getKeys(id),
  ),
  valuesById: (id: string) => createSelector(
    fromSport(mapSelector).values(),
    (entries) => {
      const entry = entries.find(([entryId]) => entryId === id);

      if (!entry) {
        return [];
      }

      return entry[1];
    },
  ),
});

const fromEventTournament = (eventMapSelector) => ({
  values: (combineMode = ECombineMode.merge) => combineSelector(combineMode, eventMapSelector),
  concat: (selector, combineMode) => createSelector(
    fromEventTournament(eventMapSelector).values(combineMode),
    selector,
    (prev, next) => [...prev, ...next],
  ),
  tournamentToSport: () => fromSport(createSelector(
    eventsSelector,
    eventMapSelector,
    updateEventMapBySport,
  )),
});

const fromEventCategory = (eventMapSelector) => ({
  values: (combineMode = ECombineMode.merge) => combineSelector(combineMode, eventMapSelector),
  categoryToTournament: () => fromEventTournament(createSelector(
    eventsSelector,
    eventMapSelector,
    updateEventMapByTournament,
  )),
  categoryToSport: () => fromSport(createSelector(
    eventsSelector,
    eventMapSelector,
    updateEventMapBySport,
  )),
  sizeById: (id: string) => createSelector(
    eventMapSelector,
    getSize(id),
  ),
});

const fromOutrightTournament = (outrightMapSelector) => ({
  values: (combineMode = ECombineMode.merge) => combineSelector(combineMode, outrightMapSelector),
  tournamentToSport: () => fromSport(createSelector(
    outrightsSelector,
    outrightMapSelector,
    updateOutrightMapBySport,
  )),
});

const fromEvent = (eventIdListSelector) => ({
  values: () => eventIdListSelector,
  eventToTournament: () => fromEventTournament(createSelector(
    eventsSelector,
    eventIdListSelector,
    createEventMapByTournament,
  )),
  eventToCategory: () => fromEventCategory(createSelector(
    eventsSelector,
    eventIdListSelector,
    createEventMapByCategory,
  )),
  eventToSport: () => fromSport(createSelector(
    eventsSelector,
    eventIdListSelector,
    createEventMapBySport,
  )),
  toSportsIds: () => createSelector(
    eventsSelector,
    eventIdListSelector,
    combineSportIds,
  ),
  toCategoryIdsBySportId: (sportId: string) => createSelector(
    eventsSelector,
    eventIdListSelector,
    combineCategoryIds(sportId),
  ),
  toTournamentIdsByCategoryId: (categoryId: string) => createSelector(
    eventsSelector,
    eventIdListSelector,
    combineTournamentIds(categoryId),
  ),
  size: () => createSelector(eventIdListSelector, (ids) => ids.length),
});

const fromOutright = (outrightIdListSelector) => ({
  values: () => outrightIdListSelector,
  outrightToTournament: () => fromOutrightTournament(createSelector(
    outrightsSelector,
    outrightIdListSelector,
    createOutrightMapByTournament,
  )),
});

const createTreeEntriesSelector = () => ({
  events: (options: ITreeEntriesOptions) => {
    const { sourceSelector, sortBy } = options;

    if (sortBy) {
      return fromEvent(createSelector(
        eventsSelector,
        sourceSelector,
        (events, ids) => sortBy(events)(ids),
      ));
    }

    return fromEvent(sourceSelector);
  },
  outrights: (options: ITreeEntriesOptions) => {
    const { sourceSelector, sortBy } = options;

    if (sortBy) {
      return fromOutright(createSelector(
        outrightsSelector,
        sourceSelector,
        (outrights, ids) => sortBy(outrights)(ids),
      ));
    }

    return fromOutright(sourceSelector);
  },
});

export { createTreeEntriesSelector, ECombineMode };
