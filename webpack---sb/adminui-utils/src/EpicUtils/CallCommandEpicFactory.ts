import { type AnyAction } from "redux";
import { concat, mergeMap, type Observable, of, switchMap } from "rxjs";
import { filter } from "rxjs/operators";
import { type Epic } from "redux-observable";
import { isCreator, isNil, type TExplicitAny, type TRequireOnlyOne, type TSelector } from "@sb/utils";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction, type TCallManagerSymbol } from "@sb/call-manager";
import { appServiceShowSuccessMessageAction } from "../Messages/MessagesActions";
import { handleError } from "../Messages/HandleErrorFactory";

type TMessageTKeys<TKey> = {
  success: null | TKey;
  error: TKey;
};

type TCallAction = AnyAction | (AnyAction & { payload: { id: string; }; });

type TCallCommandParams<
  A extends TCallAction,
  R,
  S,
  D,
  E extends Epic<TExplicitAny, TExplicitAny, S, D>,
  TKey
> = {
  /**
   * Action that will trigger call
   * If action has ID in payload - call manager will use it
   */
  actionCreator: (...args: TExplicitAny[]) => A;
  callSymbol: TCallManagerSymbol;
  /**
   * Call returned from this function will be executed
   */
  createCall: (action: A, state: S, deps: D) => Observable<R>;
  /**
   * When provided used to check should call be triggered or not when action dispatched
   */
  shouldTrigger?: (action: A, state: S) => boolean;
} & TRequireOnlyOne<{
  /**
   * Epic that will be executed after call succeess
   */
  successEpic: E;
  successEpicFactory: (action: A, response: R) => E;
}> & TRequireOnlyOne<{
  /**
   * Messages with such keys will be shown on success or error
   */
  messageTKeys: TMessageTKeys<TKey>;
  messageTKeysSelector: TSelector<S, TMessageTKeys<TKey>, [action: A]>;
}>

const createCallCommandEpicFactory = <S extends TExplicitAny, TKey extends string, D>() => <
  A extends TCallAction,
  R,
  E extends Epic<TExplicitAny, TExplicitAny, S, D>,
>(params: TCallCommandParams<A, R, S, D, E, TKey>): E => {
  const {
    actionCreator,
    createCall,
    callSymbol,
    successEpic,
    successEpicFactory,
    messageTKeys,
    messageTKeysSelector,
    shouldTrigger,
  } = params;

  return ((action$, state$, deps) => action$
    .pipe(
      isCreator(actionCreator),
      filter((action) => shouldTrigger ? shouldTrigger(action, state$.value) : true),
      mergeMap(
        (action) => {
          const id = action.payload?.id;

          const tKeys = messageTKeysSelector
            ? messageTKeysSelector(state$.value, action)
            : messageTKeys;

          return concat(
            of(callManagerStartAction(callSymbol, id)),
            createCall(action, state$.value, deps)
              .pipe(
                switchMap(
                  (response) => {
                    const sources: Observable<unknown>[] = [
                      of(callManagerSucceededAction(callSymbol, id)),
                    ];

                    if (!isNil(tKeys.success)) {
                      sources.push(of(appServiceShowSuccessMessageAction(tKeys.success)));
                    }

                    if (successEpicFactory) {
                      sources.push(successEpicFactory(action, response)(action$, state$, deps));
                    } else if (successEpic) {
                      sources.push(successEpic(action$, state$, deps));
                    }

                    return concat(...sources);
                  },
                ),
                handleError(
                  [tKeys.error],
                  (error) => of(callManagerFailedAction(callSymbol, error, id)),
                ),
              ),
          );
        },
      ),
    )) as E;
};

export { createCallCommandEpicFactory };
