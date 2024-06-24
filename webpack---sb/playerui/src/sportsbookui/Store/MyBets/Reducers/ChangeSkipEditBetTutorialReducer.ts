import { type TReducer } from "@sb/utils";
import { type changeSkipEditBetTutorialAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";

const changeSkipEditBetTutorialReducer: TReducer<IWithMyBetsState, typeof changeSkipEditBetTutorialAction> = (
  state,
  { payload: { value } },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    skipEditBetTutorial: value,
  },
});

export { changeSkipEditBetTutorialReducer };
