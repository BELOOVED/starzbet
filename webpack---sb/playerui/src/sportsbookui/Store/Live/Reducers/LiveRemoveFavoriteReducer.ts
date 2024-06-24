import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveRemoveFavoriteAction } from "../LiveActions";

const liveRemoveFavoriteReducer: TReducer<IWithLiveState, typeof liveRemoveFavoriteAction> = (state, { payload: { id } }) => {
  const isNotEqualId = (fav: string) => fav !== id;

  return {
    ...state,
    live: {
      ...state.live,
      favorites: state.live.favorites.filter(isNotEqualId),
    },
  };
};

export { liveRemoveFavoriteReducer };
