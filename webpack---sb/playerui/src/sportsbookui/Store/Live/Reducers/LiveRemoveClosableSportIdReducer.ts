import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveRemoveClosableSportIdAction } from "../LiveActions";

const liveRemoveClosableSportIdReducer: TReducer<IWithLiveState, typeof liveRemoveClosableSportIdAction> = (
  state,
  { payload: { sportId } },
) => ({
  ...state,
  live: {
    ...state.live,
    closableSportIds: state.live.closableSportIds.filter(
      (id) => id !== sportId,
    ),
  },
});

export { liveRemoveClosableSportIdReducer };
