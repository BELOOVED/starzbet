import { type TReducer } from "@sb/utils";
import { type IWithPreLive } from "../PreLiveState";
import { type preLiveToggleFavouriteAction } from "../PreLiveActions";

const preLiveToggleFavouriteReducer: TReducer<IWithPreLive, typeof preLiveToggleFavouriteAction> = (
  state,
  { payload: { tournamentId } },
) => ({
  ...state,
  preLive: {
    ...state.preLive,
    favourites: !state.preLive.favourites.includes(tournamentId)
      ? [...state.preLive.favourites, tournamentId]
      : state.preLive.favourites.filter(
        (id) => id !== tournamentId,
      ),
  },
});

export { preLiveToggleFavouriteReducer };
