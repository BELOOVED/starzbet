import { type IWithLiveState } from "../LiveState";

const completeInsertEventInMultiViewReducer = (state: IWithLiveState) => ({
  ...state,
  live: {
    ...state.live,
    insertableEventId: null,
    moveDockedEvent: false,
  },
});

export { completeInsertEventInMultiViewReducer };
