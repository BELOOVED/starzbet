import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type showLiveViewAction } from "../LiveActions";

const showLiveViewReducer: TReducer<IWithLiveState, typeof showLiveViewAction> = (state, { payload: { eventId } }) => {
  if (state.live.multiView[eventId]?.showed) {
    return {
      ...state,
      live: {
        ...state.live,
        multiView: {
          ...state.live.multiView,
          [eventId]: {
            showed: false,
          },
        },
      },
    };
  }

  if (Object.values(state.live.multiView).filter((it) => it.showed).length === 2) {
    return state;
  }

  return {
    ...state,
    live: {
      ...state.live,
      multiView: {
        ...state.live.multiView,
        [eventId]: {
          showed: true,
        },
      },
    },
  };
};

export { showLiveViewReducer };
