import { deepEqual } from "fast-equals";
import { type Epic } from "redux-observable";
import {
  concat,
  distinctUntilChanged,
  EMPTY,
  finalize,
  from,
  merge,
  type Observable,
  of,
  scan,
  timer,
  zip,
} from "rxjs";
import { filter, ignoreElements, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { type Action } from "redux";
import { type Location, type TMatch } from "@sb/react-router-compat";
import { capitalizeFirstLetter, isNotNil, isPromise, type TExplicitAny } from "@sb/utils";
import { routerSelector } from "../Store/Selectors/RouterSelectors";
import { actionSubject } from "../Store/Epics/ActionSubjectEpic";
import { type IRouterState, type IWithRouterState } from "../Store/State/RouterInitialState";
import { Logger } from "./Logger";

type TRouterMatch<Params extends { [K in keyof Params]?: string } = TExplicitAny> = (
  location: Location,
  state?: TExplicitAny
) => TMatch<Params> | null;

type TDefer<T> = () => Promise<T>;

type TShouldStop = (prevLocation: Location, nextLocation: Location) => boolean;

type TShouldRestart = (prevMatched: ReturnType<TRouterMatch>, nextMatched: ReturnType<TRouterMatch>) => boolean;

type TSyncOnStop<D> = (deps: D) => void;

interface IRouterEpicConfig<Input extends Action = Action,
  Output extends Input = Input,
  State extends IWithRouterState = IWithRouterState,
  Dependencies = TExplicitAny,
  // predefined:
  TEpic = Epic<Input, Output, State, Dependencies>,
  OnStartEpicFactory = (nextMatched: TMatch) => TEpic,
  OnStopEpicFactory = (state: State) => TEpic,
  SyncOnStopFactory = (state: State) => TSyncOnStop<Dependencies>> {
  match: TRouterMatch;
  name?: string;
  description?: string;
  onStart: TDefer<OnStartEpicFactory> | OnStartEpicFactory;
  onRestart?: TEpic;
  onStop?: TDefer<OnStopEpicFactory> | OnStopEpicFactory;
  shouldStop?: TShouldStop; // default true
  shouldRestart?: TShouldRestart;   // default false
  /** @deprecated use onStop instead. syncOnStop will be deleted */
  syncOnStop?: TDefer<SyncOnStopFactory> | SyncOnStopFactory;
}

enum ERouteState {
  // epic must start if the previous route does not exist but the current one does
  start = "start",
  restart = "restart",
  stop = "stop",
}

interface ICommand {
  state: ERouteState;
  nextMatched: ReturnType<TRouterMatch>;
}

const createCommand = <State extends IWithRouterState = IWithRouterState>(
  match: TRouterMatch,
  state: State,
  shouldStop: TShouldStop,
  shouldRestart: TShouldRestart,
) => (router: IRouterState, index: number): Observable<ICommand> => {
    const nextMatched = match(router.current, state);

    const prevMatched = match(router.previous, state);

    // first run
    if (nextMatched && index === 0) {
      return of({ state: ERouteState.start, nextMatched });
    }

    // location changed
    if (!prevMatched && nextMatched) {
      return of({ state: ERouteState.start, nextMatched });
    }

    if (prevMatched && !nextMatched && shouldStop(router.previous, router.current)) {
      return of({ state: ERouteState.stop, nextMatched });
    }

    const matchEqual = deepEqual(nextMatched, prevMatched);

    if (!matchEqual && shouldRestart(prevMatched, nextMatched)) {
      return of({ state: ERouteState.restart, nextMatched });
    }

    return EMPTY;
  };

const computeStarted = (started: number, command: ICommand) => command.state === ERouteState.start ? started + 1 : 0;

const routerEpic = <Input extends Action = Action,
  Output extends Input = Input,
  State extends IWithRouterState = IWithRouterState,
  Dependencies = TExplicitAny>(
    {
      match,
      name = "unnamed",
      description,
      onStart,
      onRestart,
      onStop,
      shouldRestart = () => false,
      shouldStop = () => true,
      syncOnStop,
    }: IRouterEpicConfig<Input, Output, State, Dependencies>,
  ): Epic<Input, Output, State, Dependencies> => (action$, state$, deps) => {
    const command$ = state$.pipe(
      map(routerSelector),
      distinctUntilChanged(),
      switchMap(createCommand(match, state$.value, shouldStop, shouldRestart)),
    );

    return zip(command$.pipe(scan(computeStarted, 0)), command$).pipe(
    // don't run epic again when this epic is started now
      filter(([started, command]) => command.state != ERouteState.start || started <= 1),
      map(([_, command]) => command),
      switchMap(({ state, nextMatched }) => {
        if (state === ERouteState.stop || nextMatched === null) {
          return EMPTY;
        }

        Logger.info.epic(`${capitalizeFirstLetter(state)} router epic ${name} ${description ? `description: ${description}` : ""}`);

        const before = state === ERouteState.restart && isNotNil(onRestart)
          ? onRestart(action$, state$, deps)
          : EMPTY;

        return runLazy(nextMatched, onStart).pipe(
          mergeMap((onStartEpic) => concat(
            before,
            merge(
              onStartEpic(action$, state$, deps),
              // finalize will only work for the match
              action$.pipe(ignoreElements()),
            ).pipe(
            /** run onStop epic in the 'finalize()' of the onStart epic */
              finalize(() => {
                Logger.info.epic(`Stop router epic ${name} ${description ? `description: ${description}` : ""}`);
                const { previous, current } = routerSelector(state$.value);

                if (isNotNil(onStop) && shouldStop(previous, current)) {
                  let isCompleted = false;

                  /** destroy timer in 10 seconds */
                  const destroy$ = timer(10_000).pipe(
                    tap(() => {
                      if (!isCompleted) {
                        Logger.info.epic(`Router epic ${name}: the onStop epic has been destroyed`);
                      }
                    }),
                    map(() => null),
                  );

                  concat(
                    runLazy(state$.value, onStop),
                    destroy$,
                  ).pipe(
                  /** we have to use switchMap there to kill the onStopEpic on destroy$ */
                    switchMap(
                      (onStopEpic) => isNotNil(onStopEpic)
                        ? onStopEpic(action$, state$, deps).pipe(
                          finalize(() => {
                            isCompleted = true;
                          }),
                        )
                        : EMPTY,
                    ),
                  ).subscribe((action: Output) => {
                  /** send action to root action subject */
                    actionSubject.next(action);
                  });
                }

                if (isNotNil(syncOnStop)) {
                  runLazy(state$.value, syncOnStop)
                    .pipe(
                      tap((syncOnStopFn) => syncOnStopFn(deps)),
                    )
                  // so that to finalize works only for the match
                    .subscribe();
                }
              }),
            ),
          )),
        );
      }),
    );
  };

const runLazy = <Arg, V>(v: Arg, mayBeLazy: TDefer<(v: Arg) => V> | ((v: Arg) => V)): Observable<V> => {
  const valueOrPromise = mayBeLazy(v);

  if (isPromise(valueOrPromise)) {
    return from(valueOrPromise).pipe(
      map((lazy) => lazy(v)),
    );
  }

  return of(valueOrPromise);
};

export { routerEpic };
export type { TRouterMatch, IRouterEpicConfig };
