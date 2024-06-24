import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type removeDockToSideEventAction } from "../LiveActions";

const removeDockToSideEventReducer: TReducer<IWithLiveState, typeof removeDockToSideEventAction> = (state, { payload: { eventId } }) => ({
  ...state,
  live: {
    ...state.live,
    dockedEvents: state.live.dockedEvents.filter((it) => it !== eventId),
    collapsedDockedEvents: state.live.collapsedDockedEvents.filter((it) => it !== eventId),
  },
});

export { removeDockToSideEventReducer };
