import { type Selector } from "react-redux";
import { defer, EMPTY, filter, from, merge, type Observable, of, switchMap } from "rxjs";
import { catchError, delay, distinctUntilChanged, map, repeat } from "rxjs/operators";
import { type Action } from "redux";
import { type Epic } from "redux-observable";
import {
  deferWithAbort,
  isArray,
  isDev,
  isFunction,
  isNotNil,
  type TActionWithPayload,
  type TExplicitAny,
} from "@sb/utils";
import { type TQuery, type TQueryArg } from "@sb/graphql-client";
import {
  callManagerFailedAction,
  callManagerFailedSelector,
  callManagerStartAction,
  callManagerSucceededAction,
  type TCallManagerSymbolPair,
  type TWithCallManagerState,
} from "@sb/call-manager";
import { always } from "@sb/utils/Always";
import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { type IDepsWithGraphQLClient } from "../../../platformui/Store/Root/Epic/TEpicWithGraphQLClient";
import { Logger } from "../Logger";
import { anySignal } from "../AnySignal";

const handleArg = <S, C>(state: S, arg: C | Selector<S, C>): C => isFunction(arg)
  ? arg(state)
  : arg;

const gqlLoadingFactory =
  <
    Query extends TQuery,
    QueryArgs extends TQueryArg<Query, false>,
    State extends IWithAuthState & TWithCallManagerState,
    Response extends Awaited<ReturnType<Query>>,
    AC extends (...args: TExplicitAny[]) => TActionWithPayload<TExplicitAny>,
    Extractor extends (res: Response) => Parameters<AC>,
    Dependencies extends IDepsWithGraphQLClient
  >(
    callSymbolPair: TCallManagerSymbolPair,
    query: Query,
    queryArgs: QueryArgs | Selector<State, QueryArgs>,
    succeedActionCreator: AC,
    payloadExtractor: Extractor,
    filterResponse: (res: Response) => boolean = always(true),
    onError?: (error: unknown) => Observable<Action>,
    repeatWhenLogged = false,
    abortSignal?: AbortSignal,
  ): Epic<Action, Action, State, Dependencies> => {
    const callSymbol = isArray(callSymbolPair) ? callSymbolPair[0] : callSymbolPair;
    const callSymbolId = isArray(callSymbolPair) ? callSymbolPair[1] : undefined;

    return (_, state$, deps) => deferWithAbort((signal) => merge(
      of(callManagerStartAction(callSymbol, callSymbolId)),
      defer(
        () => from(
          query(
            deps.graphQLClient,
            {
              ...handleArg(state$.value, queryArgs),
              signal: anySignal([abortSignal, signal].filter(Boolean)),
            },
          ),
        ),
      ).pipe(
        filter(filterResponse),
        switchMap((res: Response) => {
          if (isDev) {
            Logger.info.epic("[gqlLoadingFactory] data loaded", res);
          }

          return merge(
            of(succeedActionCreator(...payloadExtractor(res))),
            of(callManagerSucceededAction(callSymbol, callSymbolId)),
          );
        }),
        catchError((error: unknown) => {
          Logger.warn.epic("[gqlLoadingFactory] loading error", error);

          return merge(
            isNotNil(onError) ? onError(error) : EMPTY,
            of(callManagerFailedAction(callSymbol, error, callSymbolId)),
          );
        }),
        repeat({
          delay: () => state$.pipe(
            map((state) => callManagerFailedSelector(state, callSymbol, callSymbolId)),
            distinctUntilChanged(),
            filter(Boolean),
            delay(5000),
            filter(() => repeatWhenLogged ? loggedSelector(state$.value) : true),
          ),
        }),
      ),
    ));
  };

export { gqlLoadingFactory };
