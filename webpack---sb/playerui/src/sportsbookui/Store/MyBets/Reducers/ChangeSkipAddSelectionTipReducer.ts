import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type changeSkipAddSelectionTipAction } from "../MyBetsActions";

const changeSkipAddSelectionTipReducer: TReducer<IWithMyBetsState, typeof changeSkipAddSelectionTipAction> = (
  state,
  { payload: { value } },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    skipAddSelectionTip: value,
  },
});

export { changeSkipAddSelectionTipReducer };
