import { type IWithLiveState } from "../LiveState";

const collapseAllDockedEventReducer = (state: IWithLiveState) => ({
  ...state,
  live: {
    ...state.live,
    collapsedDockedEvents: state.live.dockedEvents,
  },
});

export { collapseAllDockedEventReducer };
