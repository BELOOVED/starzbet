import { catchError, filter, map } from "rxjs/operators";
import { from, merge, of, switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator, isNil } from "@sb/utils";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { setCashbackSumAction, transferCashbackAction, transferCashbackModalOpenedAction } from "../BonusesActions";
import {
  availableCashbackBonusIdSelector,
  cashbackFrontValidationErrorSelector,
} from "../Selectors/CashbackBonusesSelectors";
import { REQUEST_CASHBACK_SUM_CALL_SYMBOL, TRANSFER_CASHBACK_CALL_SYMBOL } from "../BonusVariables";

const requestCashbackEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(transferCashbackModalOpenedAction),
  filter(({ payload: { notVipClubBonus } }) => isNil(cashbackFrontValidationErrorSelector(state$.value, notVipClubBonus))),
  switchMap(({ payload: { notVipClubBonus } }) => {
    const bonusId = availableCashbackBonusIdSelector(state$.value, notVipClubBonus);

    return merge(
      of(callManagerStartAction(REQUEST_CASHBACK_SUM_CALL_SYMBOL)),
      callWithAbort(deps.platformHttpApi.callGetCashbackSum, { bonusId }).pipe(
        switchMap((cashbackSum) => from([
          setCashbackSumAction(cashbackSum),
          callManagerSucceededAction(REQUEST_CASHBACK_SUM_CALL_SYMBOL),
        ])),
        catchError((error) => from([
          setCashbackSumAction(null),
          callManagerFailedAction(REQUEST_CASHBACK_SUM_CALL_SYMBOL, error),
        ])),
      ),
    );
  }),
);

const transferCashbackEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(transferCashbackAction),
  switchMap(({ payload: { notVipClubBonus } }) => {
    const bonusId = availableCashbackBonusIdSelector(state$.value, notVipClubBonus);

    return merge(
      of(callManagerStartAction(TRANSFER_CASHBACK_CALL_SYMBOL)),
      of(setCashbackSumAction(null)),
      callWithAbort(deps.platformHttpApi.callClaimBonus, bonusId).pipe(
        map(() => callManagerSucceededAction(TRANSFER_CASHBACK_CALL_SYMBOL)),
        catchError((error) => of(callManagerFailedAction(TRANSFER_CASHBACK_CALL_SYMBOL, error))),
      ),
    );
  }),
);

const cashbackBonusEpic = combineEpics(
  requestCashbackEpic,
  transferCashbackEpic,
);

export { cashbackBonusEpic };
