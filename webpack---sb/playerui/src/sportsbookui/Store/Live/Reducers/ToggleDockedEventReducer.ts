import { type TReducer } from "@sb/utils";
import { collapsedDockedEventsSelector } from "../Selectors/LiveSelectors";
import { type IWithLiveState } from "../LiveState";
import { type toggleDockedEventAction } from "../LiveActions";

const toggleDockedEventReducer: TReducer<IWithLiveState, typeof toggleDockedEventAction> = (state, { payload: { eventId } }) => ({
  ...state,
  live: {
    ...state.live,
    collapsedDockedEvents: collapsedDockedEventsSelector(state).includes(eventId)
      ? collapsedDockedEventsSelector(state).filter((it) => it !== eventId)
      : [...collapsedDockedEventsSelector(state), eventId],
  },
});

export { toggleDockedEventReducer };
