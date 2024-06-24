import { createRootReducer, type IMoney, type TReducer } from "@sb/utils";
import { selectAllBetsWhereCashOutAllowed } from "../MyBets/Selectors/MyBetsSelectors";
import { receiveMyBetsAction, updateMyBetsAction } from "../MyBets/MyBetsActions";
import { feedEventFetchedAction, feedFetchedAction, feedUpdatedAction } from "../Feed/FeedActions";
import { type TAppState } from "../InitialState";
import {
  cashOutBetAction,
  cashOutFailedAction,
  cashOutPartialAction,
  cashOutSuccessAction,
  recomputeCashOutAction,
} from "./CashOutAction";
import { computeMaxCashOut } from "./ComputeMaxCashout";
import { type IWithCashOutState } from "./CashOutState";

const recomputeCashOutReducer: TReducer<TAppState, typeof recomputeCashOutAction> = (s) => {
  const bets = selectAllBetsWhereCashOutAllowed(s);

  const moneyMap: Record<string, IMoney> = {};

  bets.forEach((bet) => {
    const maxCashOut = computeMaxCashOut(bet, s);

    if (!maxCashOut) {
      return;
    }

    moneyMap[bet.id] = maxCashOut;
  });

  return { ...s, cashOut: { ...s.cashOut, moneyMap } };
};

const cashOutBetReducer: TReducer<IWithCashOutState, typeof cashOutBetAction> = (s, { payload: { betId } }) => ({
  ...s,
  cashOut: {
    ...s.cashOut,
    state: {
      ...s.cashOut.state,
      [betId]: {
        ...s.cashOut.state[betId],
        inProgress: true,
        lastError: undefined,
        success: false,
      },
    },
  },
});

const cashOutFailedReducer: TReducer<IWithCashOutState, typeof cashOutFailedAction> = (s, { payload: { betId } }) => ({
  ...s,
  cashOut: {
    ...s.cashOut,
    state: {
      ...s.cashOut.state,
      [betId]: {
        ...s.cashOut.state[betId],
        inProgress: false,
        lastError: "failed",
        success: false,
      },
    },
  },
});

const cashOutSuccessReducer: TReducer<IWithCashOutState, typeof cashOutSuccessAction> = (s, { payload: { betId } }) => ({
  ...s,
  cashOut: {
    ...s.cashOut,
    state: {
      ...s.cashOut.state,
      [betId]: {
        ...s.cashOut.state[betId],
        inProgress: false,
        lastError: undefined,
        success: true,
      },
    },
  },
});

const cashOutRootReducer = createRootReducer([
  [recomputeCashOutReducer, recomputeCashOutAction],
  [recomputeCashOutReducer, receiveMyBetsAction],
  [recomputeCashOutReducer, updateMyBetsAction],
  [recomputeCashOutReducer, feedFetchedAction],
  [recomputeCashOutReducer, feedUpdatedAction],
  [recomputeCashOutReducer, feedEventFetchedAction],
  [cashOutBetReducer, cashOutBetAction],
  [cashOutFailedReducer, cashOutFailedAction],
  [cashOutSuccessReducer, cashOutSuccessAction],
  [cashOutBetReducer, cashOutPartialAction],
]);

export { cashOutRootReducer };
