import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type setVideoIdAction } from "../LiveActions";

const setVideoIdReducer: TReducer<IWithLiveState, typeof setVideoIdAction> = (state, { payload: { videoId } }) => ({
  ...state,
  live: {
    ...state.live,
    videoId,
  },
});

export { setVideoIdReducer };
