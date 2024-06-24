import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type setStreamingTabAction } from "../LiveActions";

const setStreamingTabReducer: TReducer<IWithLiveState, typeof setStreamingTabAction> = (state, { payload: { streamingTab } }) => ({
  ...state,
  live: {
    ...state.live,
    streamingTab,
  },
});

export { setStreamingTabReducer };
