import { addFinishedEvents } from "@sb/betting-core/Feed/FinishedEvents/UpdateFinishedEvents";
import { type TReducer } from "@sb/utils";
import { type IFinishedEventsState } from "../FinishedEventsState";
import { type FinishedEventsBatchLoadAction } from "../FinishedEventsActions";

const finishedEventsBatchFetchedReducer: TReducer<IFinishedEventsState, typeof FinishedEventsBatchLoadAction> = (
  state,
  { payload: { events } },
) => ({
  ...state,
  feed: {
    ...state.feed,
    mainLine: addFinishedEvents(state.feed.mainLine, events),
  },
  finishedEvents: events.map(({ event: { id } }) => id),
});

export { finishedEventsBatchFetchedReducer };
