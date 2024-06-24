import { type TReducer } from "@sb/utils";
import { type IWithPreLive } from "../PreLiveState";
import { type preLiveSetRootRouteAction } from "../PreLiveActions";

const preLiveSetRootRouteReducer: TReducer<IWithPreLive, typeof preLiveSetRootRouteAction> = (state, { payload: { rootRoute } }) => ({
  ...state,
  preLive: {
    ...state.preLive,
    rootRoute,
  },
});

export { preLiveSetRootRouteReducer };
