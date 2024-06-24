import unionWith from "lodash/fp/unionWith";
import isEqual from "lodash/fp/isEqual";
import { type TReducer } from "@sb/utils";
import { type receiveBetAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";

const receiveBetReducer: TReducer<IWithMyBetsState, typeof receiveBetAction> =
  (state, { payload: { bet } }) =>
    ({
      ...state,
      myBets: {
        ...state.myBets,
        bets: unionWith(
          isEqual,
          state.myBets.bets,
          [bet],
        ),
      },
    });

export { receiveBetReducer };
