import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type startInsertEventInMultiViewAction } from "../LiveActions";

const startInsertEventInMultiViewReducer: TReducer<
  IWithLiveState, typeof startInsertEventInMultiViewAction
> = (state, { payload: { eventId } }) => ({
  ...state,
  live: {
    ...state.live,
    insertableEventId: eventId,
  },
});

export { startInsertEventInMultiViewReducer };
