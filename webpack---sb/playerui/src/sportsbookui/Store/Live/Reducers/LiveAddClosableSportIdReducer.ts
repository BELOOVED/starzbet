import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveAddClosableSportIdAction } from "../LiveActions";

const liveAddClosableSportIdReducer: TReducer<IWithLiveState, typeof liveAddClosableSportIdAction> = (
  state,
  { payload: { sportId } },
) => ({
  ...state,
  live: {
    ...state.live,
    closableSportIds: [...state.live.closableSportIds, sportId],
  },
});

export { liveAddClosableSportIdReducer };
