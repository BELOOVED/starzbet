import { type TReducer } from "@sb/utils";
import { type IWithPreLive } from "../PreLiveState";
import { type preLiveFavoritesFetchedAction } from "../PreLiveActions";

const preLiveFavoritesFetchedReducer: TReducer<IWithPreLive, typeof preLiveFavoritesFetchedAction> = (
  state,
  { payload: { favourites } },
) => ({
  ...state,
  preLive: {
    ...state.preLive,
    favourites,
  },
});

export { preLiveFavoritesFetchedReducer };
