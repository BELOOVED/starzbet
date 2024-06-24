import { catchError, map, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { cashOutAddRuleAction, cashOutCompleteAction } from "../CashOutAction";

const cashOutAddRuleEpic: TMixAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(cashOutAddRuleAction),
  switchMap(
    ({ payload: { betId, limitMoney, cashOutMoney } }) => callWithAbort(
      sportsbookHttpApi.callCreateAutoCashOutRule,
      {
        betId,
        limitMoney,
        cashOutMoney,
      },
    ).pipe(
      map(cashOutCompleteAction),
      catchError((err) => {
        Logger.warn.rpc("cashOutAddRuleEpic", err);

        return EMPTY;
      }),
    ),
  ),
);

export { cashOutAddRuleEpic };
