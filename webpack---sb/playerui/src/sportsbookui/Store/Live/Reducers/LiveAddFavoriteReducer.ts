import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveAddFavoriteAction } from "../LiveActions";

const liveAddFavoriteReducer: TReducer<IWithLiveState, typeof liveAddFavoriteAction> = (state, { payload: { id } }) => ({
  ...state,
  live: { ...state.live, favorites: [...state.live.favorites, id] },
});

export { liveAddFavoriteReducer };
