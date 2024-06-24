import { type TReducer } from "@sb/utils";
import { type IWithBetStrategyState } from "../BetStrategyState";
import { type betStrategyChangeAction } from "../BetStrategyActions";

const betStrategyChangeReducer: TReducer<IWithBetStrategyState, typeof betStrategyChangeAction> = (
  state,
  { payload: { betStrategy } },
) => ({ ...state, betStrategy });

export { betStrategyChangeReducer };
