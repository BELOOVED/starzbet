import { combineEpics } from "redux-observable";
import { cashOutAddRuleEpic } from "./CashOutAddRuleEpic";
import { cashOutRemoveRuleEpic } from "./CashOutRemoveRuleEpic";
import { cashOutBetEpic } from "./CashOutBetEpic";

const cashOutRootEpic = combineEpics(
  cashOutAddRuleEpic,
  cashOutRemoveRuleEpic,
  cashOutBetEpic,
);

export { cashOutRootEpic };
