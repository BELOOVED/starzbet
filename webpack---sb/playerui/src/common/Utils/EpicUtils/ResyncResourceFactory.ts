import { type Epic } from "redux-observable";
import { EMPTY, isObservable, merge, type Observable, of, switchMap } from "rxjs";
import { catchError, distinctUntilChanged, first, map } from "rxjs/operators";
import { type Action } from "redux";
import {
  callManagerRemoveSymbolAction,
  callManagerSucceededSelector,
  type TCallManagerSymbol,
  type TWithCallManagerState,
} from "@sb/call-manager";
import { Buffer, type TExplicitAny, withParams } from "@sb/utils";
import { whenLoggedAndWsAuthenticatedEpic } from "../../Store/WsAuth/WsAuthEpic";
import { Logger } from "../Logger";
import { createConnectedEpic, type IDepsWithConnection } from "./CreateConnectedByRouteEpic";
import { createSubscribe } from "./CreateSubscribe";

type TResyncEpic = Epic<Action, Action, TWithCallManagerState, IDepsWithConnection>;

interface IResourceSubscription {
  uri: string;
  onUpdate: (payload: TExplicitAny) => Epic<Action, Action>;
  auth?: boolean; //ws authentication
}

interface IResyncResourceOptions {
  loadEpic: Epic<Action, Action>;
  subscriptions: (IResourceSubscription | Observable<IResourceSubscription>)[];
  loadSymbol: TCallManagerSymbol;
}

const BUFFER_SIZE = 100;

const stubEpic = (epic: Epic) => epic;

const resyncResourceFactory = ({
  loadEpic,
  subscriptions,
  loadSymbol,
}: IResyncResourceOptions) => createConnectedEpic(
  (action$, state$, dependencies) => merge(
    loadEpic(action$, state$, dependencies),
    ...subscriptions.map((subs) => {
      const buffer = new Buffer(BUFFER_SIZE);

      const subscribe$ = isObservable(subs) ? subs : of(subs);

      return subscribe$.pipe(
        first(),
        switchMap(({ uri, onUpdate, auth = false }) => {
          const authEpic = auth ? whenLoggedAndWsAuthenticatedEpic : stubEpic;

          return merge(
            authEpic(
              createSubscribe(
                uri,
                (payload): TResyncEpic => (action$, state$, dependencies) => {
                  if (callManagerSucceededSelector(state$.value, loadSymbol)) {
                    return onUpdate(payload)(action$, state$, dependencies);
                  }

                  buffer.add(payload);

                  return EMPTY;
                },
              ),
            )(action$, state$, dependencies),

            state$.pipe(
              map(withParams(callManagerSucceededSelector, loadSymbol)),
              distinctUntilChanged(),
              first(Boolean),
              switchMap(() => {
                const updates: unknown[] = buffer.flush();

                return merge(
                  ...updates
                    .map(onUpdate)
                    .map((epic) => epic(action$, state$, dependencies)),
                );
              }),
            ),
          );
        }),
      );
    }),
  ).pipe(
    catchError((error) => {
      Logger.error.epic("[resyncResource] failed", loadSymbol, error);

      return EMPTY;
    }),
  ),
  () => of(callManagerRemoveSymbolAction(loadSymbol)),
);

export { resyncResourceFactory };
