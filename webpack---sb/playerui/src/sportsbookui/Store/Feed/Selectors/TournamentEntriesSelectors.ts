// @ts-nocheck

import { createSelector } from "reselect";
import { Time } from "@sb/utils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { identity } from "../../../Utils/Identity";
import { T } from "../../../Utils/Always";
import { sortWith } from "../../../Utils/SortWith";
import { ascend } from "../../../Utils/Ascend";
import { getIndexTournamentIdInFavourites } from "../../../Utils/GetIndexTournamentIdInFavourites";
import { descend } from "../../../Utils/Descend";
import { liveFavoritesSelector, liveSelectedMapSelector, notLiveSelectedTournamentIdSelector } from "../../Live/Selectors/LiveSelectors";
import {
  notPreLiveSelectedTournamentIdSelector,
  preLiveFavouritesSelector,
  preLivePinnedEventsSelector,
  preLiveSelectedMapSelector,
} from "../../PreLive/Selectors/PreLiveSelectors";
import { sportPeriodEnum } from "../../SportMenu/Model/SportPeriod";
import { fakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";
import { allVirtualEventsSelector, preLiveEventsSelector } from "./PreLiveEventsSelector";
import { liveEventsSelector } from "./LiveEventsSelector";
import { sortedTournamentEntriesSelectorFactory } from "./SortedTournamentEntriesSelectorFactory";
import { eventsSelector, outrightsSelector, sportsSelector, tournamentsSelector, tournamentToOutrightMapSelector } from "./FeedSelectors";

const tournamentEntriesSelectorFactory = (eventsSelector) => ([
  filterFn = T,
  sortFn = identity,
  groupFn = identity,
  limit,
]) => createSelector(
  eventsSelector,
  (events) => {
    const keys = Object.keys(events);

    if (keys.length === 0) {
      return [];
    }

    const list = groupFn(
      events,
      sortFn(events)(
        keys.filter((eventId) => filterFn(events[eventId])),
      ),
    );

    return limit
      ? list.slice(0, limit)
      : list;
  },
);

const createTournamentEntriesSelectorFactory = (favoritesSelector, tournamentEntriesSelectorFactory) => (handlers) => (
  sortedTournamentEntriesSelectorFactory(
    favoritesSelector,
    tournamentEntriesSelectorFactory(handlers),
    "createTournamentEntriesSelectorFactory",
  )
);

const preLiveTournamentEntriesSelector = createTournamentEntriesSelectorFactory(
  preLiveFavouritesSelector,
  tournamentEntriesSelectorFactory(preLiveEventsSelector),
);

const liveTournamentEntriesSelector = (...args) => createSelector(
  createTournamentEntriesSelectorFactory(
    liveFavoritesSelector,
    tournamentEntriesSelectorFactory(liveEventsSelector),
  )(...args),
  tournamentsSelector,
  liveSelectedMapSelector,
  (tournamentEntries, tournaments, selectedMap) => {
    if (Object.keys(selectedMap).length === 0) {
      return tournamentEntries;
    }

    const list = [];

    tournamentEntries.forEach(([tournamentId]) => {
      const sportId = tournaments[tournamentId].sportId;

      if (notLiveSelectedTournamentIdSelector(sportId, tournamentId, selectedMap)) {
        return;
      }

      list.push(tournamentId);
    });

    return tournamentEntries.filter(([id]) => list.includes(id));
  },
);

const next3Days = (events) => (eventId) => {
  const diff = Time.differenceInDays(Time.addDays(+new Date(), 3), events[eventId].startTime);

  return diff >= 0 && diff <= 3;
};

const prioritySports = [
  sportCodeToIdMap[ESportCode.soccer],
  sportCodeToIdMap[ESportCode.basketball],
  sportCodeToIdMap[ESportCode.tennis],
  sportCodeToIdMap[ESportCode.golf],
];

const sortByNext3Days = (period, events, tournaments) => ([tournamentId, eventIdList]) => (
  prioritySports.includes(tournaments[tournamentId].sportId) && period === sportPeriodEnum.all
    ? Math.min(
      ...eventIdList.filter(next3Days(events)).map((eventId) => events[eventId].startTime),
    )
    : 0
);

const sortTournamentEntriesByPeriod = (period) => (tournaments, favourites, sports, events, tournamentEntries, pinnedEvents) => sortWith(
  [
    ascend(([_, eventIdList]) => pinnedEvents && pinnedEvents.some((eventId) => eventIdList.includes(eventId)) ? 0 : 1),
    ascend(([tournamentId]) => getIndexTournamentIdInFavourites(favourites, tournamentId)),
    descend(([tournamentId]) => sports[tournaments[tournamentId].sportId].priority),
    descend(([tournamentId]) => tournaments[tournamentId].priority),
    ascend(sortByNext3Days(period, events, tournaments)),
    ascend(([tournamentId]) => tournaments[tournamentId].name),
  ],
  tournamentEntries,
);

const sortTournamentEntriesByEventStartTime = (tournaments, sports, events, tournamentEntries, pinnedEvents) => sortWith(
  [
    ascend(([_, eventIdList]) => pinnedEvents && pinnedEvents.some((eventId) => eventIdList.includes(eventId)) ? 0 : 1),
    descend(([tournamentId]) => sports[tournaments[tournamentId].sportId].priority),
    descend(([tournamentId]) => tournaments[tournamentId].priority),
    ascend(([_, eventIdList]) => Math.max(...eventIdList.map((eventId) => events[eventId].startTime))),
    ascend(([tournamentId]) => tournaments[tournamentId].name),
  ],
  tournamentEntries,
);

const filterPreLiveTournamentEntriesBySelectedMap = (tournamentEntries, tournaments, period, selectedMap) => {
  if (Object.keys(selectedMap).length === 0) {
    return tournamentEntries;
  }

  const list = [];

  tournamentEntries.forEach(([tournamentId]) => {
    const sportId = tournaments[tournamentId].sportId;

    if (notPreLiveSelectedTournamentIdSelector(period, sportId, tournamentId, selectedMap)) {
      return;
    }

    list.push(tournamentId);
  });

  return tournamentEntries.filter(([id]) => list.includes(id));
};

const preLivePeriodTournamentEntriesSelector = (period) => (handlers) => createSelector(
  tournamentsSelector,
  preLiveFavouritesSelector,
  sportsSelector,
  eventsSelector,
  tournamentEntriesSelectorFactory(preLiveEventsSelector)(handlers),
  outrightsSelector,
  tournamentToOutrightMapSelector,
  preLiveSelectedMapSelector,
  preLivePinnedEventsSelector,
  (tournaments, favourites, sports, events, tournamentEntries, outrights, tournamentToOutrightMap, selectedMap, pinnedEvents) => {
    const entriesByEvents = sortTournamentEntriesByPeriod(period)(
      tournaments,
      favourites,
      sports,
      events,
      filterPreLiveTournamentEntriesBySelectedMap(tournamentEntries, tournaments, period, selectedMap),
      pinnedEvents,
    );

    return Object.entries(tournamentToOutrightMap).reduce(
      (acc, [tournamentId, outrightIds]) => {
        if (!outrightIds) {
          return acc;
        }

        if (
          notPreLiveSelectedTournamentIdSelector(
            period,
            tournaments[tournamentId].sportId,
            fakeOutrightTournamentId(tournamentId),
            selectedMap,
          )
        ) {
          return acc;
        }

        const filtered = handlers[0]
          ? outrightIds.filter((outrightId) => handlers[0](outrights[outrightId]))
          : outrightIds;

        if (filtered.length === 0) {
          return acc;
        }

        const sorted = sortWith([ascend((id) => outrights[id].startTime)], filtered);

        return [
          [fakeOutrightTournamentId(tournamentId), sorted],
          ...acc,
        ];
      },
      entriesByEvents,
    );
  },
);

const virtualTournamentEntriesSelector = (handlers) => createSelector(
  tournamentsSelector,
  sportsSelector,
  eventsSelector,
  tournamentEntriesSelectorFactory(allVirtualEventsSelector)(handlers),
  sortTournamentEntriesByEventStartTime,
);

export {
  preLiveTournamentEntriesSelector,
  liveTournamentEntriesSelector,
  sortTournamentEntriesByPeriod,
  preLivePeriodTournamentEntriesSelector,
  virtualTournamentEntriesSelector,
};
