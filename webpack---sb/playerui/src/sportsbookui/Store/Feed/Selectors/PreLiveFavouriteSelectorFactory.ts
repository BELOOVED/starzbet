// @ts-nocheck
/* eslint-disable rulesdir/no-invalid-selectors */

import { createSelector } from "reselect";
import { createSimpleSelector } from "@sb/utils";
import { identity } from "../../../Utils/Identity";
import { esportPreLiveFavouritesSelector, preLiveFavouritesWithoutEsportsSelector } from "../../PreLive/Selectors/PreLiveSelectors";
import { liveFavouritesEsportsSelector, liveFavouritesWithoutEsportsSelector } from "../../Live/Selectors/LiveSelectors";
import {
  liveEsportFavouriteEvenIdListSelector,
  liveFavouriteEvenIdListSelector,
  preLiveEsportFavouriteEvenIdListSelector,
  preLiveFavouriteEvenIdListSelector,
} from "../../Favourites/Selectors/FavouritesSelectors";
import { combineTournamentEntries } from "../CombineTournamentEntries";
import { eventsSelector, outrightsSelector, tournamentToEventMapSelector, tournamentToOutrightMapSelector } from "./FeedSelectors";
import { preLiveEventsSelector } from "./PreLiveEventsSelector";
import { liveEventsSelector } from "./LiveEventsSelector";
import { combineTournamentEntriesWithOutrights } from "./CombineTournamentEntriesWithOutrights";

const tournamentEntriesSelectorFactory = (favouritesSelector, eventsSelector, handlers) => createSelector(
  favouritesSelector,
  eventsSelector,
  tournamentToEventMapSelector,
  combineTournamentEntries(handlers),
);

const liveFavouriteWithoutEsportSelectorFactory = (handlers) => tournamentEntriesSelectorFactory(
  liveFavouritesWithoutEsportsSelector,
  liveEventsSelector,
  handlers,
);

const liveFavouriteEsportSelectorFactory = (handlers) => tournamentEntriesSelectorFactory(
  liveFavouritesEsportsSelector,
  liveEventsSelector,
  handlers,
);

const liveSportFavouriteWithoutEsportSelectorFactory = ([sortFn = identity, groupFn = identity]) => createSimpleSelector(
  [liveFavouriteEvenIdListSelector, liveEventsSelector],
  (eventIdList, events) => groupFn(events, sortFn(events)(eventIdList)),
);

const liveSportFavouriteEsportSelectorFactory = ([sortFn = identity, groupFn = identity]) => createSimpleSelector(
  [liveEsportFavouriteEvenIdListSelector, liveEventsSelector],
  (eventIdList, events) => groupFn(events, sortFn(events)(eventIdList)),
);

const combineByEvents = ([
  filterFn,
  sortFn = identity,
  groupFn = identity,
]) => (tournamentIdList, events, tournamentToEventMap) => {
  const eventIdList = [];

  tournamentIdList.forEach((tournamentId) => {
    if (tournamentToEventMap.hasOwnProperty(tournamentId)) {
      const byTournament = tournamentToEventMap[tournamentId].filter((id) => events.hasOwnProperty(id));

      const filtered = filterFn
        ? byTournament.filter((eventId) => filterFn(events[eventId]))
        : byTournament;

      eventIdList.push(
        ...filtered,
      );
    }
  });

  return groupFn(events, sortFn(events)(eventIdList));
};

// todo
const tournamentEntriesWithFilterSelectorFactory = (favouritesSelector, eventsSelector, rest) => createSelector(
  favouritesSelector,
  eventsSelector,
  tournamentToEventMapSelector,
  tournamentToOutrightMapSelector,
  outrightsSelector,
  combineTournamentEntriesWithOutrights(combineByEvents(rest), rest[0]),
);

const preLiveFavouriteEsportSelectorFactory = (handlers) => tournamentEntriesWithFilterSelectorFactory(
  esportPreLiveFavouritesSelector,
  preLiveEventsSelector,
  handlers,
);

const preLiveEventsFavouriteEsportSelectorFactory = ([sortFn = identity, groupFn = identity]) => createSimpleSelector(
  [preLiveEsportFavouriteEvenIdListSelector, preLiveEventsSelector],
  (eventIdList, events) => groupFn(events, sortFn(events)(eventIdList)),
);

const allFavouriteEsportSelectorFactory = (handlers) => tournamentEntriesWithFilterSelectorFactory(
  esportPreLiveFavouritesSelector,
  eventsSelector,
  handlers,
);

const preLiveFavouriteWithoutEsportSelectorFactory = (handlers) => tournamentEntriesWithFilterSelectorFactory(
  preLiveFavouritesWithoutEsportsSelector,
  preLiveEventsSelector,
  handlers,
);

const preLiveEventsFavouriteWithoutEsportSelectorFactory = ([sortFn = identity, groupFn = identity]) => createSimpleSelector(
  [preLiveFavouriteEvenIdListSelector, preLiveEventsSelector],
  (eventIdList, events) => groupFn(events, sortFn(events)(eventIdList)),
);
export {
  liveFavouriteWithoutEsportSelectorFactory,
  liveFavouriteEsportSelectorFactory,
  liveSportFavouriteWithoutEsportSelectorFactory,
  liveSportFavouriteEsportSelectorFactory,
  preLiveFavouriteEsportSelectorFactory,
  allFavouriteEsportSelectorFactory,
  preLiveFavouriteWithoutEsportSelectorFactory,
  preLiveEventsFavouriteWithoutEsportSelectorFactory,
  preLiveEventsFavouriteEsportSelectorFactory,
};
