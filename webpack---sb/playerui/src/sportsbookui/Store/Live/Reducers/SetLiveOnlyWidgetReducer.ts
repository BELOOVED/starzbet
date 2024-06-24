import { type TReducer } from "@sb/utils";
import { type IWithLiveState } from "../LiveState";
import { type setLiveOnlyWidgetAction } from "../LiveActions";

const setLiveOnlyWidgetReducer: TReducer<IWithLiveState, typeof setLiveOnlyWidgetAction> = (state, { payload: { onlyWidget } }) => ({
  ...state,
  live: {
    ...state.live,
    onlyWidget,
  },
});

export { setLiveOnlyWidgetReducer };

