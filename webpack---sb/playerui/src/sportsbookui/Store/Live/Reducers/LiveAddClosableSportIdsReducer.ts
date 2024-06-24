import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type liveAddClosableSportIdsAction } from "../LiveActions";

const liveAddClosableSportIdsReducer: TReducer<IWithLiveState, typeof liveAddClosableSportIdsAction> = (
  state,
  { payload: { sportIds } },
) => ({
  ...state,
  live: {
    ...state.live,
    closableSportIds: [...state.live.closableSportIds, ...sportIds],
  },
});

export { liveAddClosableSportIdsReducer };
