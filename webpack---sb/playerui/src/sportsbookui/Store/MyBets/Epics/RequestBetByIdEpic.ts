import { concat, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { pendingMyBetsAction, receiveBetAction, requestBetByIdAction } from "../MyBetsActions";

const requestBetByIdEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(requestBetByIdAction),
  switchMap(
    ({ payload: { betId } }) => concat(
      of(pendingMyBetsAction(true)),
      callWithAbort(sportsbookHttpApi.callBetById, betId).pipe(
        switchMap(
          (response) => concat(
            of(pendingMyBetsAction(false)),
            of(receiveBetAction(response)),
          ),
        ),
        catchError((e) => {
          Logger.warn.epic("[MyBets]", "Fetch bet by id failed", e);

          return of(pendingMyBetsAction(false));
        }),
      ),
    ),
  ),
);

export { requestBetByIdEpic };
