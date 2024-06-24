import { type IWithLiveState } from "../LiveState";

const moveDockedEventToMultiViewReducer = (state: IWithLiveState) => ({
  ...state,
  live: {
    ...state.live,
    moveDockedEvent: true,
  },
});

export { moveDockedEventToMultiViewReducer };
