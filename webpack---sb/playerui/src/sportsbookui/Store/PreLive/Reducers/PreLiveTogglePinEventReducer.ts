import { type TReducer } from "@sb/utils";
import { type IWithPreLive } from "../PreLiveState";
import { type preLiveTogglePinEventAction } from "../PreLiveActions";

const preLiveTogglePinEventReducer: TReducer<IWithPreLive, typeof preLiveTogglePinEventAction> = (
  state,
  { payload: { eventId } },
) => ({
  ...state,
  preLive: {
    ...state.preLive,
    pinnedEvents: !state.preLive.pinnedEvents.includes(eventId)
      ? [...state.preLive.pinnedEvents, eventId]
      : state.preLive.pinnedEvents.filter(
        (id) => id !== eventId,
      ),
  },
});

export { preLiveTogglePinEventReducer };
