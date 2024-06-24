import { EWhere_Predicate } from "@sb/graphql-client";
import { type TReducer } from "@sb/utils";
import { cannotUpdateMyBetsSelector } from "../Selectors/MyBetsSelectors";
import { betWhereExtension, getCreatedAtBetWhereExtension } from "../Model/BetWhereExtension";
import { type IWithMyBetsState } from "../MyBetsState";
import { type changeTimeRangeMyBetsAction } from "../MyBetsActions";
import { updateWhere } from "./Handlers/UpdateWhere";

const changeTimeRangeMyBetsReducer: TReducer<IWithMyBetsState, typeof changeTimeRangeMyBetsAction> = (
  state,
  { payload: { timeRange } },
) => {
  if (cannotUpdateMyBetsSelector(state)) {
    return state;
  }

  return {
    ...state,
    myBets: {
      ...state.myBets,
      where: updateWhere(
        betWhereExtension.bet__createdAt,
        [
          getCreatedAtBetWhereExtension(timeRange.gte, EWhere_Predicate.gte),
          getCreatedAtBetWhereExtension(timeRange.lte, EWhere_Predicate.lte),
        ],
        state,
      ),
    },
  };
};

export { changeTimeRangeMyBetsReducer };
