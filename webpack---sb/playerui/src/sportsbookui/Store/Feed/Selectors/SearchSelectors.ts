// @ts-nocheck
/* eslint-disable rulesdir/no-invalid-selectors */
import { createSelector } from "reselect";
import { createMemoSelector } from "@sb/utils";
import { themeLineTeamTranslateNs, themeLineTournamentTranslateNs } from "../../../../common/Constants/LineTranslates";
import { T } from "../../../Utils/Always";
import { identity } from "../../../Utils/Identity";
import { includesString } from "../../../Utils/IncludesString";
import {
  esportPreLiveFavouritesSelector,
  preLiveFavouritesSelector,
  preLiveFavouritesWithoutEsportsSelector,
} from "../../PreLive/Selectors/PreLiveSelectors";
import { fakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";
import { translateSelector } from "../../Translate/TranslateSelectors";
import { liveFavouritesEsportsSelector, liveFavouritesWithoutEsportsSelector } from "../../Live/Selectors/LiveSelectors";
import { findTournamentBySearchText } from "../Model/Tournament";
import { findTeamNameBySearchText } from "../Model/Event";
import { isBaseSport, isEsport, isVirtual } from "../Model/Sport";
import { sortedTournamentEntriesSelectorFactory } from "./SortedTournamentEntriesSelectorFactory";
import { preLiveEsportEventsSelector, preLiveEventsSelector, preLiveNotEsportEventsSelector } from "./PreLiveEventsSelector";
import { eventsSelector, tournamentsSelector, tournamentToEventMapSelector, tournamentToOutrightMapSelector } from "./FeedSelectors";
import { liveEsportEventsSelector, liveEventsSelector, liveNotEsportEventsSelector } from "./LiveEventsSelector";

const searchTournamentEntriesSelectorFactory = (
  [searchText, filterFn = T, sortFn = identity, groupFn = identity],
  evSelectors,
  withoutTournament = false,
) => createSelector(
  evSelectors,
  tournamentsSelector,
  (events, tournaments) => {
    const keys = Object.keys(events)
      .filter(
        (eventId) => {
          const tournamentList = withoutTournament
            ? null
            : findTournamentBySearchText(searchText)(tournaments[events[eventId].tournamentId]);
          const eventList = Object.values(events[eventId].participants).some(findTeamNameBySearchText(searchText));

          return tournamentList || eventList;
        },
      )
      .filter((eventId) => filterFn(events[eventId]));

    if (keys.length === 0) {
      return [];
    }

    return groupFn(events, sortFn(events)(keys));
  },
);

const preLiveSearchTournamentsEntriesSelectorFactory = (deps: unknown[]) => sortedTournamentEntriesSelectorFactory(
  preLiveFavouritesSelector,
  searchTournamentEntriesSelectorFactory(deps, preLiveEventsSelector),
  "preLiveSearchTournamentsEntriesSelectorFactory",
);

const preLiveSportSearchTournamentsEntriesSelectorFactory = (deps: unknown[]) => sortedTournamentEntriesSelectorFactory(
  preLiveFavouritesWithoutEsportsSelector,
  searchTournamentEntriesSelectorFactory(deps, preLiveNotEsportEventsSelector, true),
  "preLiveSportSearchTournamentsEntriesSelectorFactory",
);

const preLiveESportSearchTournamentsEntriesSelectorFactory = (deps: unknown[]) => sortedTournamentEntriesSelectorFactory(
  esportPreLiveFavouritesSelector,
  searchTournamentEntriesSelectorFactory(deps, preLiveEsportEventsSelector, true),
  "preLiveESportSearchTournamentsEntriesSelectorFactory",
);

const liveSportSearchTournamentsEntriesSelectorFactory = (deps: unknown[]) => sortedTournamentEntriesSelectorFactory(
  liveFavouritesWithoutEsportsSelector,
  searchTournamentEntriesSelectorFactory(deps, liveNotEsportEventsSelector, true),
  "liveSportSearchTournamentsEntriesSelectorFactory",
);

const liveESportSearchTournamentsEntriesSelectorFactory = (deps: unknown[]) => sortedTournamentEntriesSelectorFactory(
  liveFavouritesEsportsSelector,
  searchTournamentEntriesSelectorFactory(deps, liveEsportEventsSelector, true),
  "liveESportSearchTournamentsEntriesSelectorFactory",
);

const eventIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    eventsSelector,
    translateSelector,
    (_, searchText: string) => searchText,
  ],
  (events, translates, searchText) => {
    if (!searchText) {
      return [];
    }

    const result = {};

    const teamMap = {};

    Object.values(events).forEach(({ id, participants, sportId }) => {
      if (isVirtual(sportId)) {
        return;
      }

      Object.values(participants).forEach((participant) => {
        teamMap[participant.teamId] = id;

        if (findTeamNameBySearchText(searchText)(participant)) {
          result[id] = null;
        }
      });
    });

    Object.entries(translates).forEach(([key, value]) => {
      if (!key.startsWith(themeLineTeamTranslateNs)) {
        return;
      }

      if (includesString(value, searchText)) {
        const id = key.replace(`${themeLineTeamTranslateNs}.`, "");

        if (!teamMap[id]) {
          return;
        }

        result[teamMap[id]] = null;
      }
    });

    return Object.keys(result);
  },
);

const preLiveEventIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    eventIdListBySearchTextSelectorFactory,
    preLiveEventsSelector,
  ],
  (eventIdList, preLiveEvents) => eventIdList
    .filter((eventId) => preLiveEvents[eventId] && isBaseSport(preLiveEvents[eventId].sportId)),
);

const liveEventIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    eventIdListBySearchTextSelectorFactory,
    liveEventsSelector,
  ],
  (eventIdList, liveEvents) => eventIdList
    .filter((eventId) => liveEvents[eventId] && isBaseSport(liveEvents[eventId].sportId)),
);

const preLiveEsportEventIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    eventIdListBySearchTextSelectorFactory,
    preLiveEventsSelector,
  ],
  (eventIdList, preLiveEvents) => eventIdList
    .filter((eventId) => preLiveEvents[eventId] && isEsport(preLiveEvents[eventId].sportId)),
);

const liveEsportEventIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    eventIdListBySearchTextSelectorFactory,
    liveEventsSelector,
  ],
  (eventIdList, liveEvents) => eventIdList
    .filter((eventId) => liveEvents[eventId] && isEsport(liveEvents[eventId].sportId)),
);

const tournamentIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    tournamentsSelector,
    tournamentToEventMapSelector,
    tournamentToOutrightMapSelector,
    translateSelector,
    (_, searchText) => searchText,
  ],
  (tournaments, tournamentToEventMap, tournamentToOutrightMap, translates, searchText) => {
    if (!searchText) {
      return [];
    }

    const result = {};

    Object.keys(tournaments).forEach((tournamentId) => {
      if (isEsport(tournaments[tournamentId].sportId)) {
        return;
      }

      if (!findTournamentBySearchText(searchText)(tournaments[tournamentId])) {
        return;
      }

      if (tournamentToOutrightMap[tournamentId]) {
        result[fakeOutrightTournamentId(tournamentId)] = null;
      }

      if (!tournamentToEventMap[tournamentId]) {
        return;
      }

      if (tournamentToEventMap[tournamentId].length === 0) {
        return;
      }

      result[tournamentId] = null;
    });

    Object.entries(translates).forEach(([key, value]) => {
      if (!key.startsWith(themeLineTournamentTranslateNs)) {
        return;
      }

      if (includesString(value, searchText)) {
        const id = key.replace(`${themeLineTournamentTranslateNs}.`, "");

        if (!tournaments[id]) {
          return;
        }

        result[id] = null;
      }
    });

    return Object.keys(result);
  },
);

const preLiveTournamentIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    tournamentsSelector,
    tournamentToEventMapSelector,
    tournamentToOutrightMapSelector,
    preLiveEventsSelector,
    (_, searchText: string) => searchText,
  ],
  (tournaments, tournamentToEventMap, tournamentToOutrightMap, events, searchText) => {
    if (!searchText) {
      return [];
    }

    const map = {};

    Object.keys(tournaments).forEach((tournamentId) => {
      if (isEsport(tournaments[tournamentId].sportId)) {
        return;
      }

      if (!findTournamentBySearchText(searchText)(tournaments[tournamentId])) {
        return;
      }

      if (tournamentToOutrightMap[tournamentId]) {
        map[fakeOutrightTournamentId(tournamentId)] = null;
      }

      if (!tournamentToEventMap[tournamentId]) {
        return;
      }

      if (tournamentToEventMap[tournamentId].length === 0) {
        return;
      }

      if (tournamentToEventMap[tournamentId].every((eventId) => !events[eventId])) {
        return;
      }

      map[tournamentId] = null;
    });

    return Object.keys(map);
  },
);

const liveTournamentIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    tournamentsSelector,
    tournamentToEventMapSelector,
    liveEventsSelector,
    (_, searchText: string) => searchText,
  ],
  (tournaments, tournamentToEventMap, events, searchText) => {
    if (!searchText) {
      return [];
    }

    return Object
      .keys(tournaments)
      .filter((tournamentId) => (
        (tournamentToEventMap[tournamentId] || []).some((eventId) => events[eventId] && isBaseSport(events[eventId].sportId))
      ))
      .filter((tournamentId) => (
        (tournamentToEventMap[tournamentId] || []).length !== 0 && findTournamentBySearchText(searchText)(tournaments[tournamentId])
      ));
  },
);

const preLiveEsportTournamentIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    tournamentsSelector,
    tournamentToEventMapSelector,
    preLiveEventsSelector,
    (_, searchText: string) => searchText,
  ],
  (tournaments, tournamentToEventMap, events, searchText) => {
    if (!searchText) {
      return [];
    }

    return Object
      .keys(tournaments)
      .filter((tournamentId) => (
        (tournamentToEventMap[tournamentId] || []).some((eventId) => events[eventId] && isEsport(events[eventId].sportId))
      ))
      .filter((tournamentId) => (
        (tournamentToEventMap[tournamentId] || []).length !== 0 && findTournamentBySearchText(searchText)(tournaments[tournamentId])
      ));
  },
);

const liveEsportTournamentIdListBySearchTextSelectorFactory = createMemoSelector(
  [
    tournamentsSelector,
    tournamentToEventMapSelector,
    liveEventsSelector,
    (_, searchText: string) => searchText,
  ],
  (tournaments, tournamentToEventMap, events, searchText) => {
    if (!searchText) {
      return [];
    }

    return Object
      .keys(tournaments)
      .filter((tournamentId) => (
        (tournamentToEventMap[tournamentId] || []).some((eventId) => events[eventId] && isEsport(events[eventId].sportId))
      ))
      .filter((tournamentId) => (
        (tournamentToEventMap[tournamentId] || []).length !== 0 && findTournamentBySearchText(searchText)(tournaments[tournamentId])
      ));
  },
);

export {
  preLiveSearchTournamentsEntriesSelectorFactory,
  eventIdListBySearchTextSelectorFactory,
  preLiveEventIdListBySearchTextSelectorFactory,
  liveEventIdListBySearchTextSelectorFactory,
  preLiveEsportEventIdListBySearchTextSelectorFactory,
  liveEsportEventIdListBySearchTextSelectorFactory,
  tournamentIdListBySearchTextSelectorFactory,
  preLiveTournamentIdListBySearchTextSelectorFactory,
  liveTournamentIdListBySearchTextSelectorFactory,
  preLiveEsportTournamentIdListBySearchTextSelectorFactory,
  liveEsportTournamentIdListBySearchTextSelectorFactory,
  preLiveSportSearchTournamentsEntriesSelectorFactory,
  preLiveESportSearchTournamentsEntriesSelectorFactory,
  liveSportSearchTournamentsEntriesSelectorFactory,
  liveESportSearchTournamentsEntriesSelectorFactory,
};
