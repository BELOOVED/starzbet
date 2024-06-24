import { EMPTY, mergeMap, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { cancelCallRequestAction } from "../CallRequestsActions";
import { callRequestsLoadEpic } from "./CallRequestsLoadEpics";

const cancelCallRequestEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(cancelCallRequestAction),
  mergeMap(({ payload: { callRequestId } }) => {
    const httpApi = deps.platformHttpApi;

    return callWithAbort(httpApi.callCancelCallRequest, { callRequestId }).pipe(
      switchMap(() => callRequestsLoadEpic(action$, state$, deps)),
      catchError((error) => {
        Logger.warn.epic("cancelCallRequestEpic", error);

        return EMPTY;
      }),
    );
  }),
);

export { cancelCallRequestEpic };
