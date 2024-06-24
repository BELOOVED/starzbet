import { isNil, sortBy, type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type receiveOutcomeHistoryAction } from "../MyBetsActions";
import { type TOutcomeHistory } from "../Model/TBet";

const receiveOutcomeHistoryReducer: TReducer<IWithMyBetsState, typeof receiveOutcomeHistoryAction> = (
  state,
  { payload: { betHistory } },
) => {
  const outcomeHistory: TOutcomeHistory = {};

  const sortedBetHistory = sortBy(
    ({ createdAt }) => createdAt,
    betHistory,
  );

  sortedBetHistory.forEach(({ createdAt, picks }) => {
    if (isNil(createdAt) || isNil(picks)) {
      return;
    }
    outcomeHistory[createdAt] = picks.reduce((acc, pick) => ({ ...acc, [pick.outcome.id]: pick.coefficient }), {});
  });

  return {
    ...state,
    myBets: {
      ...state.myBets,
      outcomeHistory,
    },
  };
};

export { receiveOutcomeHistoryReducer };
