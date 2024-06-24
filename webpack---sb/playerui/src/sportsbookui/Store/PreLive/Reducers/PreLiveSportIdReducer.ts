import { type TReducer } from "@sb/utils";
import { type IWithPreLive } from "../PreLiveState";
import { type preLiveSportIdAction } from "../PreLiveActions";

const preLiveSportIdReducer: TReducer<IWithPreLive, typeof preLiveSportIdAction> = (state, { payload: { sportId } }) => ({
  ...state,
  preLive: { ...state.preLive, sportId },
});

export { preLiveSportIdReducer };
