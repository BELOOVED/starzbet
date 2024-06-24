import { catchError, switchMap } from "rxjs/operators";
import { concat, delay, of } from "rxjs";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import {
  cashOutBetAction,
  cashOutCompleteAction,
  cashOutFailedAction,
  cashOutPartialAction,
  cashOutSuccessAction,
} from "../CashOutAction";
import { cashOutPicksByBetIdSelector, notNilCashOutForBetByIdSelector } from "../CashOutSelectors";

const LIVE_CASH_OUT_DELAY = 3000;
const cashOutBetEpic: TMixAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(cashOutPartialAction, cashOutBetAction),
  switchMap(({ payload }) => {
    const betId = payload.betId;
    const cashOut = "cashOut" in payload ? payload.cashOut : notNilCashOutForBetByIdSelector(state$.value, betId);
    const { picks, hasLive } = cashOutPicksByBetIdSelector(state$.value, betId);

    return callWithAbort(sportsbookHttpApi.callPerformPartialCashOut, { betId, cashOut, picks }).pipe(
      delay(hasLive ? LIVE_CASH_OUT_DELAY : 0),
      switchMap(
        () => concat(
          of(cashOutSuccessAction(betId)),
          of(cashOutCompleteAction()).pipe(delay(1000)),
        ),
      ),
      catchError((err) => {
        Logger.warn.rpc("cashOutBetEpic", err);

        return of(cashOutFailedAction(betId));
      }),
    );
  }),
);

export { cashOutBetEpic };

