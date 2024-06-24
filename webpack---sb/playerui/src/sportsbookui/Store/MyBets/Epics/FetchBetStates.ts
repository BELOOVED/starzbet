import { EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import type { HttpApi } from "../../../Api/HttpApi";
import { type TAppState } from "../../InitialState";
import { receiveBetStatesAction } from "../MyBetsActions";
import { betHistoryItemSelector } from "../Selectors/BetHistoryItemSelector";

const fetchBetStates = (betId: string, state: TAppState, httpApi: HttpApi) =>
  callWithAbort(httpApi.callBetStates, betId).pipe(
    map((res) => receiveBetStatesAction(betId, betHistoryItemSelector(betId, res, state))),
    catchError((e) => {
      Logger.warn.epic("fetchBetStates", e);

      return EMPTY;
    }),
  );

export { fetchBetStates };
