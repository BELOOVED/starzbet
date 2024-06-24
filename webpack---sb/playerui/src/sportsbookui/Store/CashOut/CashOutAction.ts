import { type IMoney } from "@sb/utils";

const recomputeCashOutAction = () => ({
  type: "@CASH_OUT/RECOMPUTE",
});

const cashOutBetAction = (betId: string) => ({
  type: "@CASH_OUT/CASH_OUT_BET",
  payload: { betId },
});

const cashOutFailedAction = (betId: string) => ({
  type: "@CASH_OUT/CASH_OUT_FAILED",
  payload: { betId },
});

const cashOutSuccessAction = (betId: string) => ({
  type: "@CASH_OUT/CASH_OUT_SUCCESS",
  payload: { betId },
});

const cashOutCompleteAction = () => ({
  type: "@CASH_OUT/CASH_OUT_COMPLETE",
});

const cashOutPartialAction = (betId: string, cashOut: IMoney) => ({
  type: "@CASH_OUT/CASH_OUT_PARTIAL",
  payload: { betId, cashOut },
});

const cashOutAddRuleAction = (betId: string, limitMoney: IMoney, cashOutMoney: IMoney) => ({
  type: "@CASH_OUT/ADD_RULE",
  payload: { betId, limitMoney, cashOutMoney },
});

const cashOutRemoveRuleAction = (autoCashOutRuleId: string) => ({
  type: "@CASH_OUT/REMOVE_RULE",
  payload: { autoCashOutRuleId },
});

export {
  recomputeCashOutAction,
  cashOutBetAction,
  cashOutFailedAction,
  cashOutSuccessAction,
  cashOutCompleteAction,
  cashOutPartialAction,
  cashOutAddRuleAction,
  cashOutRemoveRuleAction,
};
