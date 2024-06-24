import { isLive, isPreLive } from "@sb/betting-core/EEventStatusUtils";
import { createSimpleSelector, getNotNil } from "@sb/utils";
import { eventByIdSelector, eventsSelector, tournamentByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { isBaseSportEvent, isEsportEvent, sortEventIdsByStartTimeAndName } from "../../Feed/Model/Event";
import { type TAppState } from "../../InitialState";

const notNilEvent = (state: TAppState, eventId: string, entity: string) => getNotNil(
  eventsSelector(state)[eventId],
  ["FavouriteSelectors"],
  entity,
);

const favouritesSelector = ({ favourites }: TAppState) => favourites;

const favouritesEventsSelector = (state: TAppState) => favouritesSelector(state).events;

const favouritesTournamentsSelector = (state: TAppState) => favouritesSelector(state).tournaments;

const favouriteEvenIdListSelector = (state: TAppState) => favouritesEventsSelector(state)
  .filter((eventId) => eventByIdSelector(state, eventId));

const favouriteTournamentIdListSelector = (state: TAppState) => favouritesTournamentsSelector(state)
  .filter((tournamentId) => tournamentByIdSelector(state, tournamentId));

const preLiveFavouriteEvenIdListSelector = (state: TAppState) => favouriteEvenIdListSelector(state).filter((eventId) => {
  const event = notNilEvent(state, eventId, "preLiveFavouriteEvenIdListSelector");

  return isPreLive(event.status) && isBaseSportEvent(event);
});

const liveFavouriteEvenIdListSelector = (state: TAppState) => favouriteEvenIdListSelector(state).filter((eventId) => {
  const event = notNilEvent(state, eventId, "liveFavouriteEvenIdListSelector");

  return isLive(event.status) && isBaseSportEvent(event);
});

const esportFavouriteEvenIdListSelector = (state: TAppState) => favouriteEvenIdListSelector(state)
  .filter((eventId) => isEsportEvent(notNilEvent(state, eventId, "esportFavouriteEvenIdListSelector")));

const preLiveEsportFavouriteEvenIdListSelector = (state: TAppState) => favouriteEvenIdListSelector(state).filter((eventId) => {
  const event = notNilEvent(state, eventId, "preLiveEsportFavouriteEvenIdListSelector");

  return isPreLive(event.status) && isEsportEvent(event);
});

const liveEsportFavouriteEvenIdListSelector = (state: TAppState) => favouriteEvenIdListSelector(state).filter((eventId) => {
  const event = notNilEvent(state, eventId, "liveEsportFavouriteEvenIdListSelector");

  return isLive(event.status) && isEsportEvent(event);
});

const sizePreLiveFavouriteEvenIdListSelector = (state: TAppState) => preLiveFavouriteEvenIdListSelector(state).length;
const sizeLiveFavouriteEvenIdListSelector = (state: TAppState) => liveFavouriteEvenIdListSelector(state).length;
const sizePreLiveEsportFavouriteEvenIdListSelector = (state: TAppState) => preLiveEsportFavouriteEvenIdListSelector(state).length;
const sizeLiveEsportFavouriteEvenIdListSelector = (state: TAppState) => liveEsportFavouriteEvenIdListSelector(state).length;

const sizeFavouriteEvenIdListSelector = (state: TAppState) => favouriteEvenIdListSelector(state).length;

const activeFavouriteByEventIdSelector = (state: TAppState, eventId: string) => favouriteEvenIdListSelector(state).includes(eventId);
const isFavouriteTournament = (state: TAppState, tournamentId: string) => favouritesTournamentsSelector(state).includes(tournamentId);

const allFavoriteEventsSortedSelector = createSimpleSelector(
  [favouriteEvenIdListSelector, eventsSelector],
  (eventIdList, events) =>
    sortEventIdsByStartTimeAndName(events)(eventIdList),
);

export {
  favouritesSelector,
  favouriteEvenIdListSelector,
  preLiveFavouriteEvenIdListSelector,
  liveFavouriteEvenIdListSelector,
  sizePreLiveFavouriteEvenIdListSelector,
  sizeLiveFavouriteEvenIdListSelector,
  sizePreLiveEsportFavouriteEvenIdListSelector,
  sizeLiveEsportFavouriteEvenIdListSelector,
  sizeFavouriteEvenIdListSelector,
  activeFavouriteByEventIdSelector,
  preLiveEsportFavouriteEvenIdListSelector,
  liveEsportFavouriteEvenIdListSelector,
  favouriteTournamentIdListSelector,
  esportFavouriteEvenIdListSelector,
  isFavouriteTournament,
  allFavoriteEventsSortedSelector,
};
