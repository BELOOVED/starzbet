import { type Selector } from "react-redux";
import { concat, mergeMap, type Observable, of } from "rxjs";
import { type AnyAction } from "redux";
import { type Epic } from "redux-observable";
import { deferWithAbort, isArray, isFunction, isString, type TExplicitAny } from "@sb/utils";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction, type TCallManagerSymbolPair } from "@sb/call-manager";
import { type TQueryArg, type TQueryExecutableNormalizable } from "@sb/graphql-client";
import { type TWithContainer } from "@sb/adminui-framework";
import { getGraphqlClient, type TGraphqlClientGetter } from "../DepsUtils";
import { handleError } from "../Messages/HandleErrorFactory";
import { fromQuery, fromQueryNormalize } from "./FromQuery";

const getRef = <S>(state: S, ref: string | Selector<S, string>) => {
  if (isString(ref)) {
    return ref;
  }

  return ref(state);
};

const handleArg = <S, C>(state: S, arg: C | Selector<S, C>): C => isFunction(arg)
  ? arg(state)
  : arg;

const queryEpicFactory = <S,
  E extends Epic<TExplicitAny, TExplicitAny, S, TWithContainer>,
  Q extends TQueryExecutableNormalizable,
  C extends TQueryArg<Q>,
  R extends Awaited<ReturnType<Q>>,
  K extends string,
>(
    callSymbol: TCallManagerSymbolPair,
    query: Q,
    arg: C | Selector<S, C>,
    onSuccess: (result: R) => Observable<TExplicitAny>,
    errorTKey: K,
  ): E => ((_, state$, deps) =>
    deferWithAbort(
      (signal) => {
        const parameters = {
          ...handleArg(state$.value, arg),
          signal,
        };

        return concat(
          of(
            isArray(callSymbol)
              ? callManagerStartAction(...callSymbol)
              : callManagerStartAction(callSymbol),
          ),
          fromQuery(query, parameters)(getGraphqlClient(deps))
            .pipe(
              mergeMap(
                (response) => concat(
                  onSuccess(response),
                  of(
                    isArray(callSymbol)
                      ? callManagerSucceededAction(...callSymbol)
                      : callManagerSucceededAction(callSymbol),
                  ),
                ),
              ),
              handleError(
                [errorTKey],
                (error) => of(
                  isArray(callSymbol)
                    ? callManagerFailedAction(callSymbol[0], error, callSymbol[1])
                    : callManagerFailedAction(callSymbol, error),
                ),
              ),
            ),
        );
      },
    )) as E;

const queryNormalizeEpicFactory = <S extends TExplicitAny, K extends string>() =>
  <E extends Epic<TExplicitAny, TExplicitAny, S, TWithContainer>,
    Q extends TQueryExecutableNormalizable,
    C extends Q["normalize"] extends null ? never : TQueryArg<Q, true>,
  >(
    ref: string | Selector<S, string>,
    callSymbol: TCallManagerSymbolPair,
    query: Q,
    arg: C | Selector<S, C>,
    errorTKey: K,
  ): E => ((_, state$, deps) => deferWithAbort(
    (signal) => {
      const parameters = {
        ...handleArg(state$.value, arg),
        signal,
      };
      const gqlClient = getGraphqlClient(deps);

      return concat(
        of(
          isArray(callSymbol)
            ? callManagerStartAction(...callSymbol)
            : callManagerStartAction(callSymbol),
        ),
        fromQueryNormalize(query, parameters, getRef(state$.value, ref))(gqlClient)
          .pipe(
            mergeMap(
              (response: AnyAction) => concat(
                of(response),
                of(
                  isArray(callSymbol)
                    ? callManagerSucceededAction(...callSymbol)
                    : callManagerSucceededAction(callSymbol),
                ),
              ),
            ),
            handleError(
              [errorTKey],
              (error) => of(
                isArray(callSymbol)
                  ? callManagerFailedAction(callSymbol[0], error, callSymbol[1])
                  : callManagerFailedAction(callSymbol, error),
              ),
            ),
          ),
      );
    },
  )) as E;

const statelessQueryNormalizeEpicFactory = <S extends TExplicitAny, K extends string>() => <
  E extends Epic<TExplicitAny, TExplicitAny, S, TWithContainer>,
  Q extends TQueryExecutableNormalizable,
  C extends Q["normalize"] extends null ? never : TQueryArg<Q, true>,
>(
    ref: string | Selector<S, string>,
    query: Q,
    arg: C | Selector<S, C>,
    errorTKey: K,
  ): E => ((_, state$, deps) => deferWithAbort(
    (signal) => {
      const parameters = {
        ...handleArg(state$.value, arg),
        signal,
      };
      const gqlClient = getGraphqlClient(deps);

      return fromQueryNormalize(query, parameters, getRef(state$.value, ref))(gqlClient).pipe(
        handleError([errorTKey]),
      );
    },
  )) as E;

// Error handling required
const statelessWithErrorQueryNormalizeEpicFactory = <S extends TExplicitAny>(graphqlClientGetter: TGraphqlClientGetter) =>
  <E extends Epic<TExplicitAny, TExplicitAny, S, TWithContainer>,
    Q extends TQueryExecutableNormalizable,
    C extends Q["normalize"] extends null ? never : TQueryArg<Q, true>>(
    ref: string | Selector<S, string>,
    query: Q,
    arg: C | Selector<S, C>,
  ): E => ((_, state$, deps) => deferWithAbort(
    (signal) => {
      const parameters = {
        ...handleArg(state$.value, arg),
        signal,
      };
      const gqlClient = graphqlClientGetter(deps);

      return fromQueryNormalize(query, parameters, getRef(state$.value, ref))(gqlClient);
    },
  )) as E;

export {
  queryNormalizeEpicFactory,
  statelessWithErrorQueryNormalizeEpicFactory,
  statelessQueryNormalizeEpicFactory,
  queryEpicFactory,
};
