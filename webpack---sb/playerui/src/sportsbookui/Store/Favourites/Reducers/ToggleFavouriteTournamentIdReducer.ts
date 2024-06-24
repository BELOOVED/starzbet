import { type TReducer } from "@sb/utils";
import { type IWithFavourites } from "../FavouritesState";
import { type toggleFavouriteTournamentIdAction } from "../FavouritesActions";

const toggleFavouriteTournamentIdReducer: TReducer<
  IWithFavourites, typeof toggleFavouriteTournamentIdAction
> = (state, { payload: { tournamentId } }) => ({
  ...state,
  favourites: {
    ...state.favourites,
    tournaments: state.favourites.tournaments.includes(tournamentId)
      ? state.favourites.tournaments.filter((id) => id !== tournamentId)
      : [...state.favourites.tournaments, tournamentId],
  },
});

export { toggleFavouriteTournamentIdReducer };
