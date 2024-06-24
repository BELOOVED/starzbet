import { type IFlatFeed } from "@sb/betting-core/Feed/Types";

interface IFinishedEventsState {
  finishedEvents: string[];
  feed: {
    mainLine: IFlatFeed;
  };
}

const finishedEventsState = {
  finishedEvents: [],
};

export { finishedEventsState, type IFinishedEventsState };
