import { removeFinishedEvents } from "@sb/betting-core/Feed/FinishedEvents/UpdateFinishedEvents";
import { finishedEventsSelectors } from "../Selectors/FinishedEventsSelectors";
import { type IFinishedEventsState } from "../FinishedEventsState";

const finishedEventsBatchUploadReducer = (state: IFinishedEventsState) => {
  const finishedEvents = finishedEventsSelectors(state);

  return {
    ...state,
    feed: {
      ...state.feed,
      mainLine: removeFinishedEvents(state.feed.mainLine, finishedEvents),
    },
    finishedEvents: [],
  };
};

export { finishedEventsBatchUploadReducer };
