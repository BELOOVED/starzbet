// @ts-nocheck
import { createSelector } from "reselect";
import { getNotNil, createMemoSelector, isEmpty } from "@sb/utils";
import { sortWith } from "../../../Utils/SortWith";
import { ascend } from "../../../Utils/Ascend";
import { descend } from "../../../Utils/Descend";
import { categoriesSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { isBaseSport, isEsport, isVirtual } from "../../Feed/Model/Sport";
import { unfakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";
import { preLiveEventsSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { tournamentTranslateSelector } from "../../Feed/Hooks/UseTournamentIdListByTranslateSelector";
import { livePinnedEventsSelector } from "../../Live/Selectors/LiveSelectors";
import { type IWithPreLive, type TSelectedMap } from "../PreLiveState";

const preLiveSelector = (state: IWithPreLive) => state.preLive;

const preLiveFavouritesSelector = (state: IWithPreLive) => preLiveSelector(state).favourites;

const preLivePinnedEventsSelector = (state: IWithPreLive) => preLiveSelector(state).pinnedEvents;

const preLiveCustomSelector = (state: IWithPreLive) => preLiveSelector(state).custom;

const pinnedPreLiveEventByIdSelector = (eventId: string) => (state: IWithPreLive) => preLiveSelector(state).pinnedEvents.includes(eventId);

const preLiveFavouritesWithoutEsportsSelector = createSelector(
  preLiveFavouritesSelector,
  tournamentsSelector,
  (tournamentIds, tournaments) => tournamentIds.filter(
    (id) =>
      isBaseSport(tournaments[unfakeOutrightTournamentId(id)]?.sportId) &&
      !isVirtual(tournaments[unfakeOutrightTournamentId(id)]?.sportId),
  ),
);

const esportPreLiveFavouritesSelector = createSelector(
  preLiveFavouritesSelector,
  tournamentsSelector,
  (tournamentIds, tournaments) => tournamentIds.filter((id) => isEsport(tournaments[id]?.sportId)),
);

const preLiveRootRouteSelector = (state: IWithPreLive) => preLiveSelector(state).rootRoute;

const preLiveSelectedMapSelector = (state: IWithPreLive) => preLiveSelector(state).selectedMap;

const isEmptyPreLiveSelectedMapSelector = (period: string, sportId: string, selectedMap: TSelectedMap) => {
  if (isEmpty(Object.keys(selectedMap))) {
    return true;
  }

  const map = selectedMap[period];

  if (!map || isEmpty(Object.keys(map))) {
    return true;
  }

  const sport = map[sportId];

  return !sport || isEmpty(Object.keys(sport));
};

const hasTournamentIdInPreLiveSelectedMapSelector = (period: string, sportId: string, tournamentId: string, selectedMap: TSelectedMap) => {
  const map = selectedMap[period];

  if (!map) {
    return false;
  }

  if (!map[sportId]) {
    return false;
  }

  return map[sportId]?.includes(tournamentId);
};

const isPreLiveSelectedTournamentIdSelector = ((period: string, sportId: string, tournamentId: string) => (state: IWithPreLive) => (
  hasTournamentIdInPreLiveSelectedMapSelector(period, sportId, tournamentId, preLiveSelectedMapSelector(state))
));

const countPreLiveSelectedTournamentIdByCategoryIdSelector = (period: string, sportId: string, tournamentIds: string[]) =>
  (state: IWithPreLive) =>
    tournamentIds.filter((tournamentId) => isPreLiveSelectedTournamentIdSelector(period, sportId, tournamentId)(state)).length;

const notPreLiveSelectedTournamentIdSelector = (period: string, sportId: string, tournamentId: string, selectedMap: TSelectedMap) => {
  const empty = isEmptyPreLiveSelectedMapSelector(period, sportId, selectedMap);

  return !empty && !hasTournamentIdInPreLiveSelectedMapSelector(period, sportId, tournamentId, selectedMap);
};

interface ITournaments {
  priority: unknown;
  name: string;
}

const sortTournaments = (tournaments: Record<string, ITournaments>) => sortWith(
  [
    descend((tournamentId: string) => getNotNil(tournaments[tournamentId], ["PreLive Selector"], "sortTournaments").priority),
    ascend((tournamentId: string) => getNotNil(tournaments[tournamentId], ["PreLive Selector"], "sortTournaments").name),
  ],
);

interface IEventFilter {
  sportId: string;
}

const categoriesEntriesByPreLivePeriodSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    categoriesSelector,
    tournamentsSelector,
    tournamentTranslateSelector,
    (_, sportId: string) => sportId,
    (_, __, searchText: string) => searchText,
    (_, __, ___, eventFilter: ({ sportId }: IEventFilter) => boolean) => eventFilter,
  ],
  (
    events,
    categories,
    tournaments,
    tournamentIdsBySearch,
    sportId,
    searchText,
    eventFilter,
  ) => {
    const filtered = Object.values(events).filter(
      (event) => eventFilter(event) && event.sportId === sportId,
    );

    const categoryMap: Record<string, Record<string, unknown>> = {};

    filtered.forEach((event) => {
      if (!!searchText && !tournamentIdsBySearch.includes(event.tournamentId)) {
        return;
      }

      if (!categoryMap[event.categoryId]) {
        categoryMap[event.categoryId] = {};
      }

      getNotNil(categoryMap[event.categoryId], ["PreLiveSelector"], "categoryMap[event.categoryId]")[event.tournamentId] = null;
    });

    return sortWith(
      [
        descend(([categoryId]: [string]) => categories[categoryId].priority),
        ascend(([categoryId]: [string]) => categories[categoryId].name),
      ],
      Object.entries(categoryMap).map(([categoryId, tournamentMap]) => [
        categoryId,
        sortTournaments(tournaments)(Object.keys(tournamentMap)),
      ]),
    );
  },
);

const allPinnedEventsSelector = createSelector(
  preLivePinnedEventsSelector,
  livePinnedEventsSelector,
  (preLiveEvents, liveEvents) => [...preLiveEvents, ...liveEvents],
);

const isFavouritePreLiveSelector = (tournamentId: string) => (state: IWithPreLive) => (
  preLiveFavouritesSelector(state).includes(tournamentId)
);

export {
  preLiveFavouritesSelector,
  preLiveFavouritesWithoutEsportsSelector,
  esportPreLiveFavouritesSelector,
  preLiveRootRouteSelector,
  preLiveSelectedMapSelector,
  isPreLiveSelectedTournamentIdSelector,
  countPreLiveSelectedTournamentIdByCategoryIdSelector,
  notPreLiveSelectedTournamentIdSelector,
  categoriesEntriesByPreLivePeriodSelector,
  preLivePinnedEventsSelector,
  pinnedPreLiveEventByIdSelector,
  allPinnedEventsSelector,
  isFavouritePreLiveSelector,
  preLiveCustomSelector,
};
