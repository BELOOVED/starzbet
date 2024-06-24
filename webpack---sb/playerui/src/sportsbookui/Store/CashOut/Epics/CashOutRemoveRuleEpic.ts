import { catchError, map, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { cashOutCompleteAction, cashOutRemoveRuleAction } from "../CashOutAction";

const cashOutRemoveRuleEpic: TMixAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(cashOutRemoveRuleAction),
  switchMap(({ payload: { autoCashOutRuleId } }) => callWithAbort(sportsbookHttpApi.callRemoveAutoCashOutRule, autoCashOutRuleId).pipe(
    map(cashOutCompleteAction),
    catchError((err) => {
      Logger.warn.rpc("cashOutRemoveRuleEpic", err);

      return EMPTY;
    }),
  )),
);

export { cashOutRemoveRuleEpic };
