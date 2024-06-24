import { type IFavourites } from "./FavouritesState";

const toggleFavouriteEventIdAction = (eventId: string) => ({
  type: "@FAVOURITES/TOGGLE_EVENT_ID",
  payload: {
    eventId,
  },
});

const restoreFavouritesAction = (favourites: IFavourites) => ({
  type: "@FAVOURITES/RESTORE",
  payload: {
    favourites,
  },
});

const toggleFavouriteTournamentIdAction = (tournamentId: string) => ({
  type: "@FAVOURITES/TOGGLE_TOURNAMENT_ID",
  payload: {
    tournamentId,
  },
});

export {
  toggleFavouriteEventIdAction,
  restoreFavouritesAction,
  toggleFavouriteTournamentIdAction,
};
