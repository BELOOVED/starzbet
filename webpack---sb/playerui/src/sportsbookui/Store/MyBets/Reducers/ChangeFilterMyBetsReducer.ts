import { type TReducer } from "@sb/utils";
import { cannotUpdateMyBetsSelector, countPerPageMyBetsSelector } from "../Selectors/MyBetsSelectors";
import { betWhereExtension, getTypeFilterBetWhereExtension } from "../Model/BetWhereExtension";
import { type changeFilterMyBetsAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { updateWhere } from "./Handlers/UpdateWhere";

const changeFilterMyBetsReducer: TReducer<IWithMyBetsState, typeof changeFilterMyBetsAction> = (
  state,
  { payload: { filter } },
) => {
  if (cannotUpdateMyBetsSelector(state)) {
    return state;
  }

  return {
    ...state,
    myBets: {
      ...state.myBets,
      bets: [],
      filter,
      cursor: {
        first: countPerPageMyBetsSelector(state),
      },
      where: updateWhere(
        betWhereExtension.bet__generalState,
        [getTypeFilterBetWhereExtension(filter)],
        state,
      ),
    },
  };
};

export { changeFilterMyBetsReducer };
