import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type addLiveViewAction } from "../LiveActions";

const addLiveViewReducer: TReducer<IWithLiveState, typeof addLiveViewAction> = (state, { payload: { eventId, showed = false } }) => ({
  ...state,
  live: {
    ...state.live,
    multiView: {
      ...state.live.multiView,
      [eventId]: {
        showed: showed,
      },
    },
  },
});

export { addLiveViewReducer };
