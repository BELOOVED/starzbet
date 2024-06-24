import { filter, from, merge, mergeMap, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { Logger } from "../../Utils/Logger";
import { callWithAbort } from "../../Utils/EpicUtils/CallWithAbort";
import { type TMixAppEpic } from "../Root/Epics/TMixAppEpic";
import {
  sharedBetLoadedAction,
  sharedBetOpenDetailsClickedAction,
  sharedBetRetryClickedAction,
} from "./SharedBetsActions";
import { SHARED_BETS_BET_LOADING_SYMBOL } from "./SharedBetModel";
import { shouldLoadSharedBetOnDetailsClickedSelector } from "./SharedBetsSelectors";

const sharedBetsRootEpic: TMixAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(sharedBetOpenDetailsClickedAction, sharedBetRetryClickedAction),
  filter(({ type, payload: { betId } }) => {
    if (type === sharedBetOpenDetailsClickedAction(betId).type) {
      return shouldLoadSharedBetOnDetailsClickedSelector(state$.value, betId);
    }

    return true;
  }),
  mergeMap(({ payload: { betId } }) => merge(
    of(callManagerStartAction(SHARED_BETS_BET_LOADING_SYMBOL, betId)),
    callWithAbort(sportsbookHttpApi.callBetById, betId).pipe(
      switchMap((bet) => from([
        callManagerSucceededAction(SHARED_BETS_BET_LOADING_SYMBOL, betId),
        sharedBetLoadedAction(bet),
      ])),
      catchError((error) => {
        Logger.error.epic("sharedBetsRootEpic", error);

        return of(callManagerFailedAction(SHARED_BETS_BET_LOADING_SYMBOL, error, betId));
      }),
    ),
  )),
);

export { sharedBetsRootEpic };
