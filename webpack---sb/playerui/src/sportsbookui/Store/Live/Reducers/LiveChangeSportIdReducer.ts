import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveChangeSportIdAction } from "../LiveActions";

const liveChangeSportIdReducer: TReducer<IWithLiveState, typeof liveChangeSportIdAction> = (
  state,
  { payload: { sportId } },
) => ({ ...state, live: { ...state.live, sportId } });

export { liveChangeSportIdReducer };
