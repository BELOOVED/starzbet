import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveTogglePinEventAction } from "../LiveActions";

const liveTogglePinEventReducer: TReducer<IWithLiveState, typeof liveTogglePinEventAction> = (
  state,
  { payload: { eventId } },
) => ({
  ...state,
  live: {
    ...state.live,
    pinnedEvents: !state.live.pinnedEvents.includes(eventId)
      ? [...state.live.pinnedEvents, eventId]
      : state.live.pinnedEvents.filter(
        (id) => id !== eventId,
      ),
  },
});

export { liveTogglePinEventReducer };
