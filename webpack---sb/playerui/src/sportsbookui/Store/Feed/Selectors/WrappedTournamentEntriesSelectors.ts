// @ts-nocheck
import { createSelector } from "reselect";
import { Time } from "@sb/utils";
import { type IFlatTournament } from "@sb/betting-core/Feed/Types";
import {
  localClientTimeZoneOffsetSelector,
} from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { sortWith } from "../../../Utils/SortWith";
import { ascend } from "../../../Utils/Ascend";
import { preLiveFavouritesSelector } from "../../PreLive/Selectors/PreLiveSelectors";
import { fakeOutrightTournamentId, unfakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";
import { periodFilterFn, sportPeriodEnum } from "../../SportMenu/Model/SportPeriod";
import { favouriteEvenIdListSelector } from "../../Favourites/Selectors/FavouritesSelectors";
import { tournamentEntriesByCouponIdSelectorFactory } from "../../Coupon/Selectors/CouponsSelector";
import { batchEventFilters, groupEventsByTournamentId, sortEventIdsByFavourites } from "../Model/Event";
import { type TTournamentEntries } from "../Model/Tournament";
import {
  liveTournamentEntriesSelector,
  preLivePeriodTournamentEntriesSelector,
  preLiveTournamentEntriesSelector,
  sortTournamentEntriesByPeriod,
} from "./TournamentEntriesSelectors";
import {
  outrightsSelector,
  sportsSelector,
  tournamentsSelector,
  tournamentToOutrightMapSelector,
} from "./FeedSelectors";
import {
  allFavouriteEsportSelectorFactory,
  liveFavouriteEsportSelectorFactory,
  liveFavouriteWithoutEsportSelectorFactory,
  liveSportFavouriteEsportSelectorFactory,
  liveSportFavouriteWithoutEsportSelectorFactory,
  preLiveEventsFavouriteEsportSelectorFactory,
  preLiveEventsFavouriteWithoutEsportSelectorFactory,
  preLiveFavouriteEsportSelectorFactory,
  preLiveFavouriteWithoutEsportSelectorFactory,
} from "./PreLiveFavouriteSelectorFactory";
import {
  liveTournamentEntriesByMatchUrlSelectorFactory,
  tournamentEntriesByMatchUrlSelectorFactory,
} from "./TournamentEntriesByMatchUrlSelectorFactory";
import {
  liveESportSearchTournamentsEntriesSelectorFactory,
  liveSportSearchTournamentsEntriesSelectorFactory,
  preLiveESportSearchTournamentsEntriesSelectorFactory,
  preLiveSearchTournamentsEntriesSelectorFactory,
  preLiveSportSearchTournamentsEntriesSelectorFactory,
} from "./SearchSelectors";
import { preLiveEventsSelector } from "./PreLiveEventsSelector";

const combiner = (tournamentEntries: TTournamentEntries[], sports, tournaments: Record<string, IFlatTournament>) => {
  const map: Record<string, TTournamentEntries[]> = {};

  tournamentEntries.forEach(([id, entries]) => {
    const tournament = tournaments[id];

    if (!tournament) {
      return;
    }

    if (!map.hasOwnProperty(tournament.sportId)) {
      map[tournament.sportId] = [];
    }

    map[tournament.sportId]?.push([id, entries]);
  });

  return Object.entries(map);
};

const wrapSelectorFactory = (selectorFactory) => (deps) => createSelector(
  selectorFactory(deps),
  sportsSelector,
  tournamentsSelector,
  combiner,
);

// TODO: delete after refactor old themes
const removeFavouritePostfix = (sportId) => sportId?.replace("@favourite", "");
const newRemoveFavouritePostfix = (sportId: string) => sportId.replace("@favourite", "");
const isFavouritePostfix = (sportId) => sportId.includes("@favourite");

const wrapPreLiveSelectorFactory = (selectorFactory) => (deps) => createSelector(
  selectorFactory(deps),
  tournamentsSelector,
  preLiveFavouritesSelector,
  (tournamentEntries, tournaments, favourites) => {
    const map = {};

    tournamentEntries.forEach(([id, entries]) => {
      const { sportId } = tournaments[unfakeOutrightTournamentId(id)];

      const fixSportId = favourites.includes(id)
        ? `${sportId}@favourite`
        : sportId;

      if (!map.hasOwnProperty(fixSportId)) {
        map[fixSportId] = [];
      }

      map[fixSportId].push(entries
        ? [id, entries]
        : [id]);
    });

    return Object.entries(map);
  },
);

const liveTournamentEntriesPerSportSelectorFactory = wrapSelectorFactory(
  liveTournamentEntriesSelector,
);

const liveMatchTournamentEntriesPerSportSelectorFactory = wrapSelectorFactory(
  liveTournamentEntriesByMatchUrlSelectorFactory,
);

const liveFavouriteTournamentEntriesPerSportWithoutEsportSelectorFactory = wrapSelectorFactory(
  liveFavouriteWithoutEsportSelectorFactory,
);

const liveFavouriteEntriesPerSportWithoutEsportSelectorFactory = wrapSelectorFactory(
  liveSportFavouriteWithoutEsportSelectorFactory,
);

const preLiveTournamentEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveTournamentEntriesSelector,
);

const preLiveSearchTournamentEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveSearchTournamentsEntriesSelectorFactory,
);

const preLiveSportSearchEventsEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveSportSearchTournamentsEntriesSelectorFactory,
);

const preLiveESportSearchEventsEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveESportSearchTournamentsEntriesSelectorFactory,
);

const liveSportSearchEventsEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  liveSportSearchTournamentsEntriesSelectorFactory,
);

const liveESportSearchEventsEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  liveESportSearchTournamentsEntriesSelectorFactory,
);

const preLiveCouponTournamentEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  tournamentEntriesByCouponIdSelectorFactory,
);

const preLiveMatchTournamentEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  tournamentEntriesByMatchUrlSelectorFactory,
);

const preLiveFavouriteTournamentEntriesPerSportWithoutEsportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveFavouriteWithoutEsportSelectorFactory,
);

const preLiveFavouriteEntriesPerSportWithoutEsportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveEventsFavouriteWithoutEsportSelectorFactory,
);

const preLiveFavouriteTournamentEntriesEsportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveFavouriteEsportSelectorFactory,
);

const preLiveFavouriteEntriesEsportSelectorFactory = wrapPreLiveSelectorFactory(
  preLiveEventsFavouriteEsportSelectorFactory,
);

const allFavouriteTournamentEntriesEsportSelectorFactory = wrapPreLiveSelectorFactory(
  allFavouriteEsportSelectorFactory,
);

const liveFavouriteTournamentEntriesEsportSelectorFactory = wrapPreLiveSelectorFactory(
  liveFavouriteEsportSelectorFactory,
);

const liveFavouriteEntriesEsportSelectorFactory = wrapPreLiveSelectorFactory(
  liveSportFavouriteEsportSelectorFactory,
);

// todo
const preLivePeriodTournamentEntriesPerSportSelectorFactory = (period) => wrapPreLiveSelectorFactory(
  preLivePeriodTournamentEntriesSelector(period),
);

const preLiveDateMapTournamentEntriesPerSportSelectorFactory = wrapPreLiveSelectorFactory(
  ([dateMap, sportFilter]) => createSelector(
    preLiveEventsSelector,
    localClientTimeZoneOffsetSelector,
    tournamentsSelector,
    sportsSelector,
    favouriteEvenIdListSelector,
    outrightsSelector,
    tournamentToOutrightMapSelector,
    (events, offset, tournaments, sports, favourites, outrights, tournamentToOutrightMap) => {
      const todayFilter = periodFilterFn[sportPeriodEnum.nextTwoDays](offset);

      const filterByDate = (data) => {
        const date = dateMap[data.sportId];

        if (!date) {
          return false;
        }

        return Time.isWithinInterval(
          data.startTime,
          {
            start: Time.startOfDay(date),
            end: Time.endOfDay(Time.addDays(date, 1)),
          },
          { offset },
        );
      };

      const filter = Object.keys(dateMap).length === 0
        ? batchEventFilters([sportFilter, todayFilter])
        : batchEventFilters([sportFilter, filterByDate])
      ;

      const eventsByToday = Object.keys(events).filter((eventId) => filter(events[eventId]));

      const sortedEvents = sortEventIdsByFavourites(favourites)(events)(eventsByToday);

      const entriesByEvents = sortTournamentEntriesByPeriod(sportPeriodEnum.nextTwoDays)(
        tournaments,
        undefined,
        sports,
        events,
        groupEventsByTournamentId(events, sortedEvents),
      );

      return Object.entries(tournamentToOutrightMap).reduce(
        (acc, [tournamentId, outrightIds]) => {
          if (!outrightIds) {
            return acc;
          }

          const filtered = outrightIds.filter((outrightId) => filter(outrights[outrightId]));

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
  ),
);

export {
  removeFavouritePostfix,
  newRemoveFavouritePostfix,
  isFavouritePostfix,
  liveTournamentEntriesPerSportSelectorFactory,
  liveMatchTournamentEntriesPerSportSelectorFactory,
  liveFavouriteTournamentEntriesPerSportWithoutEsportSelectorFactory,
  preLiveTournamentEntriesPerSportSelectorFactory,
  preLiveSearchTournamentEntriesPerSportSelectorFactory,
  preLiveCouponTournamentEntriesPerSportSelectorFactory,
  preLiveMatchTournamentEntriesPerSportSelectorFactory,
  preLiveFavouriteTournamentEntriesPerSportWithoutEsportSelectorFactory,
  preLiveFavouriteTournamentEntriesEsportSelectorFactory,
  allFavouriteTournamentEntriesEsportSelectorFactory,
  liveFavouriteTournamentEntriesEsportSelectorFactory,
  preLivePeriodTournamentEntriesPerSportSelectorFactory,
  preLiveDateMapTournamentEntriesPerSportSelectorFactory,
  liveFavouriteEntriesPerSportWithoutEsportSelectorFactory,
  liveFavouriteEntriesEsportSelectorFactory,
  preLiveFavouriteEntriesPerSportWithoutEsportSelectorFactory,
  preLiveFavouriteEntriesEsportSelectorFactory,
  preLiveSportSearchEventsEntriesPerSportSelectorFactory,
  preLiveESportSearchEventsEntriesPerSportSelectorFactory,
  liveSportSearchEventsEntriesPerSportSelectorFactory,
  liveESportSearchEventsEntriesPerSportSelectorFactory,
};
