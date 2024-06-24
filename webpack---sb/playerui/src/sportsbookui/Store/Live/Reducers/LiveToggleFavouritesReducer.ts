import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveToggleFavouriteAction } from "../LiveActions";

const liveToggleFavouritesReducer: TReducer<IWithLiveState, typeof liveToggleFavouriteAction> = (
  state,
  { payload: { tournamentId } },
) => ({
  ...state,
  live: {
    ...state.live,
    favorites: !state.live.favorites.includes(tournamentId)
      ? [...state.live.favorites, tournamentId]
      : state.live.favorites.filter(
        (id) => id !== tournamentId,
      ),
  },
});

export { liveToggleFavouritesReducer };
