import { EMPTY, interval, merge, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import type { HttpApi } from "../../../Api/HttpApi";
import { betSlipCompletePlaceBetAction } from "../../BetSlip/BetSlipActions";
import { cashOutCompleteAction } from "../../CashOut/CashOutAction";
import { type TAppState } from "../../InitialState";
import { receiveCountPlayerBetsAction } from "../MyBetsActions";

const PULL_TIMEOUT = 60 * 1000;

const AFFECT_OPENED_BETS_COUNT = [betSlipCompletePlaceBetAction, cashOutCompleteAction];

const watchCountPlayerBetsEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => merge(
  pullCountPlayerBetsFactory(state$.value, sportsbookHttpApi),
  interval(PULL_TIMEOUT).pipe(switchMap(() => pullCountPlayerBetsFactory(state$.value, sportsbookHttpApi))),
  action$.pipe(
    isCreator(...AFFECT_OPENED_BETS_COUNT),
    switchMap(() => pullCountPlayerBetsFactory(state$.value, sportsbookHttpApi)),
  ),
);

const pullCountPlayerBetsFactory = (state: TAppState, httpApi: HttpApi) => {
  const playerId = playerIdNotNilSelector(state);

  return callWithAbort(httpApi.callCountPlayerBets, playerId).pipe(
    map(({ opened, total }) => receiveCountPlayerBetsAction(total, opened)),
    catchError(
      (e) => {
        Logger.warn.epic("[MyBets]", "pullCountPlayerBets failed", e);

        return EMPTY;
      },
    ),
  );
};

export { watchCountPlayerBetsEpic };
