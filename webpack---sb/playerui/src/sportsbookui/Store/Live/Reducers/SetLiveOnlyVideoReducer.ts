import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type setLiveOnlyVideoAction } from "../LiveActions";

const setLiveOnlyVideoReducer: TReducer<IWithLiveState, typeof setLiveOnlyVideoAction> = (state, { payload: { onlyVideo } }) => ({
  ...state,
  live: {
    ...state.live,
    onlyVideo,
  },
});

export { setLiveOnlyVideoReducer };

