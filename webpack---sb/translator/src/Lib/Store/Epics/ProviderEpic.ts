import { combineEpics } from "redux-observable";
import { combineLatest, concat, distinctUntilChanged, EMPTY, filter, merge, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { deduplicate, type ELocale, isCreator } from "@sb/utils";
import { Logger } from "../../Utils/Logger";
import { selectCurrentLocale, selectFirstLocale, selectLoadedLocales, selectSecondLocale } from "../Selectors";
import {
  changeLocaleAction,
  requestChangeLocaleAction,
  requestLoadLocaleAction,
  updateRequestsAction,
  updateTranslatesAction,
} from "../Actions";
import { type ITranslateDeps, type TTranslateEpic } from "./TTranslateEpic";

type TNotEmptyLocales = ELocale[] & { 0: ELocale; };

const filterLocales = (locales: TNotEmptyLocales) => deduplicate(locales.filter(Boolean)) as TNotEmptyLocales;

const getLineTranslates = (locales: TNotEmptyLocales, deps: ITranslateDeps, spawnMode: boolean) => {
  if (!deps.lineTranslates) {
    return;
  }

  if (spawnMode) {
    deps.lineTranslates.spawnTranslates(locales[0]);

    return;
  }

  deps.lineTranslates.mergeTranslates(locales);
};

const getTranslates = (locales: TNotEmptyLocales, deps: ITranslateDeps, spawnMode = false) => {
  getLineTranslates(locales, deps, spawnMode);

  if (!deps.allTranslates) {
    return EMPTY;
  }

  return deps.allTranslates.getTranslates(locales).pipe(
    map((snapshot) => updateTranslatesAction({ snapshot })),
  );
};

const isNotEmptyLocales = (locales: ELocale[]): locales is TNotEmptyLocales => locales.length > 0;

const watchLocalesEpic: TTranslateEpic = (action$, state$, dependencies) => combineLatest([
  state$.pipe(
    map(selectCurrentLocale),
    distinctUntilChanged(),
  ),
  state$.pipe(
    map(selectFirstLocale),
    distinctUntilChanged(),
  ),
  state$.pipe(
    map(selectSecondLocale),
    distinctUntilChanged(),
  ),
]).pipe(
  map(filterLocales),
  filter(isNotEmptyLocales),
  switchMap((locales) => merge(
    getTranslates(locales, dependencies),
    action$.pipe(
      isCreator(updateRequestsAction),
      switchMap(() => getTranslates(locales, dependencies)),
    ),
  )),
  catchError((err) => {
    Logger.warn.epic("Fail watchLocalesEpic:", err);

    return EMPTY;
  }),
);

const fetchWithChangeEpic: TTranslateEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(requestChangeLocaleAction),
  switchMap(({ locale }) => {
    const firstLocale = selectFirstLocale(state$.value);
    const secondLocale = selectSecondLocale(state$.value);

    return concat(
      getTranslates(filterLocales([locale, firstLocale, secondLocale]), dependencies),
      state$.pipe(
        map(selectLoadedLocales),
        distinctUntilChanged(),
        filter((list) => list.includes(locale)),
        map(() => changeLocaleAction(locale)),
      ),
    );
  }),
  catchError((err) => {
    Logger.warn.epic("Fail fetchWithChangeEpic:", err);

    return EMPTY;
  }),
);

const fetchByRequestEpic: TTranslateEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(requestLoadLocaleAction),
  switchMap(({ locale }) => getTranslates([locale], dependencies, true)),
  catchError((err) => {
    Logger.warn.epic("Fail fetchByRequestEpic:", err);

    return EMPTY;
  }),
);

const runLineTranslatesProvider: TTranslateEpic = (
  action$,
  state$,
  dependencies,
) => {
  if (!dependencies.lineTranslates) {
    return EMPTY;
  }

  return dependencies.lineTranslates
    .run()(action$, state$, dependencies)
    .pipe(
      catchError((err) => {
        Logger.warn.epic("Fail runLineTranslatesProvider:", err);

        return EMPTY;
      }),
    );
};

const providerEpic: TTranslateEpic = combineEpics(
  runLineTranslatesProvider,
  watchLocalesEpic,
  fetchWithChangeEpic,
  fetchByRequestEpic,
);

export { providerEpic };
