import { type IWithPreLive, preLiveState } from "../PreLiveState";

const resetPreLiveCustomReducer = (state: IWithPreLive) => ({
  ...state,
  preLive: {
    ...state.preLive,
    custom: preLiveState.preLive.custom,
  },
});

export { resetPreLiveCustomReducer };
