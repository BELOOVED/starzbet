import { type IWithLiveState } from "../LiveState";

const completeSwapEventInMultiViewReducer = (state: IWithLiveState) => ({
  ...state,
  live: {
    ...state.live,
    swappableEventId: null,
  },
});

export { completeSwapEventInMultiViewReducer };
