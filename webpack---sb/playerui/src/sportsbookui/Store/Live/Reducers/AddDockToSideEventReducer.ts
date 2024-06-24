import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type addDockToSideEventAction } from "../LiveActions";

const addDockToSideEventReducer: TReducer<IWithLiveState, typeof addDockToSideEventAction> = (
  state,
  {
    payload: {
      eventId,
      maxEvents,
    },
  },
) => ({
  ...state,
  live: {
    ...state.live,
    dockedEvents: state.live.dockedEvents.length < maxEvents && !state.live.dockedEvents.includes(eventId)
      ? [...state.live.dockedEvents, eventId]
      : state.live.dockedEvents,
  },
});

export { addDockToSideEventReducer };
