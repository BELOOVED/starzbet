import { type Epic } from "redux-observable";
import { EMPTY, merge, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { type Action } from "redux";
import {
  callManagerFailedAction,
  callManagerStartAction,
  callManagerSucceededAction,
  type TCallManagerSymbolPair,
} from "@sb/call-manager";
import { isArray, isDev, isNotNil } from "@sb/utils";
import { Logger } from "../Logger";
import { callWithAbort } from "./CallWithAbort";

interface IRpcLoadingFactoryOptions<Deps, Response, Payload> {
  callSymbol: TCallManagerSymbolPair;
  payload: Payload;
  method: (dependencies: Deps) => (reqPayload: Payload, signal: AbortSignal) => Promise<Response>;
  onLoad: (response: Response) => Epic;
  onError?: (error: unknown) => Epic;
}

const rpcLoadingFactory = <Deps, Response, Payload, State>({
  callSymbol: callSymbolPair,
  method,
  payload,
  onLoad,
  onError,
}: IRpcLoadingFactoryOptions<Deps, Response, Payload>): Epic<Action, Action, State, Deps> => {
  const callSymbolId = isArray(callSymbolPair) ? callSymbolPair[1] : undefined;
  const callSymbol = isArray(callSymbolPair) ? callSymbolPair[0] : callSymbolPair;

  return (action$, state$, dependencies) => merge(
    of(callManagerStartAction(callSymbol, callSymbolId)),
    callWithAbort(method(dependencies), payload).pipe(
      switchMap((response) => {
        if (isDev) {
          Logger.info.epic("[rpcLoadingFactory] data loaded", callSymbol, payload);
        }

        return merge(
          onLoad(response)(action$, state$, dependencies),
          of(callManagerSucceededAction(callSymbol, callSymbolId)),
        );
      }),
    ),
  ).pipe(
    catchError((error) => {
      Logger.warn.epic("[rpcLoadingFactory] loading error", callSymbol, error);

      return merge(
        isNotNil(onError) ? onError(error)(action$, state$, dependencies) : EMPTY,
        of(callManagerFailedAction(callSymbol, error, callSymbolId)),
      );
    }),
  );
};

export { rpcLoadingFactory };
