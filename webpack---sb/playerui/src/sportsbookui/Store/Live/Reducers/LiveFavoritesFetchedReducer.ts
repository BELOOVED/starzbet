import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveFavoritesFetchedAction } from "../LiveActions";

const liveFavoritesFetchedReducer: TReducer<IWithLiveState, typeof liveFavoritesFetchedAction> = (
  state,
  { payload: { favorites } },
) => ({
  ...state,
  live: {
    ...state.live,
    favorites,
  },
});

export { liveFavoritesFetchedReducer };
