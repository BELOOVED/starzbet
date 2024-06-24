import { type TReducer } from "@sb/utils";
import { swappableEventIdSelector } from "../Selectors/LiveSelectors";
import { type IWithLiveState } from "../LiveState";
import { type startSwapEventInMultiViewAction } from "../LiveActions";

const startSwapEventInMultiViewReducer: TReducer<
  IWithLiveState, typeof startSwapEventInMultiViewAction
> = (state, { payload: { eventId } }) => ({
  ...state,
  live: {
    ...state.live,
    swappableEventId: swappableEventIdSelector(state) === eventId ? null : eventId,
  },
});

export { startSwapEventInMultiViewReducer };
