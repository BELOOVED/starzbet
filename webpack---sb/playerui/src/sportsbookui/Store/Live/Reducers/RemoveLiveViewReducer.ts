import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type removeLiveViewAction } from "../LiveActions";

const removeLiveViewReducer: TReducer<IWithLiveState, typeof removeLiveViewAction> = (state, { payload: { eventId } }) => {
  const multiView = { ...state.live.multiView };

  delete multiView[eventId];

  return {
    ...state,
    live: {
      ...state.live,
      multiView,
    },
  };
};

export { removeLiveViewReducer };
