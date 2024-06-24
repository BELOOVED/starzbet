import { switchMap } from "rxjs/operators";
import { type StateObservable } from "redux-observable";
import { EMPTY, merge, of, pipe } from "rxjs";
import { ELocale, isCreator } from "@sb/utils";
import { type IWithRouterState, replace, routerLocationPathnameSelector } from "@sb/router";
import { localeChangeAction, publicLocaleChangeAction } from "../../../../common/Actions";
import { type TDepsWithTranslator } from "../../../../common/Utils/EpicUtils/Dependencies";
import { SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP } from "../../../../common/Store/Locale/Model/TSupportedLocale";
import type { ILocaleState } from "../../../../platformui/Store/Locale/LocaleState";
import { IS_SERVER_SIDE_SETUP } from "../../../../common/IsServerSideSetup";
import type { TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { publicLocaleSelector } from "../LocaleSelector";

/**
 * Maybe should be moved out of PlayerUI package
 */
const IDENTICAL_LOCALES: Partial<Record<ELocale, ELocale>> = {
  [ELocale.en_GB]: ELocale.en_US,
};

const changeTranslateControl = <S extends (IWithRouterState & ILocaleState), D extends TDepsWithTranslator>(
  state$: StateObservable<S>,
  deps: D,
) => pipe(
    switchMap(({ payload: { locale } }: ReturnType<typeof localeChangeAction>) => {
      deps.translateControl.changeLanguage(IDENTICAL_LOCALES[locale] ?? locale);

      if (!IS_SERVER_SIDE_SETUP) {
        return EMPTY;
      }

      const currentLocale = publicLocaleSelector(state$.value);
      const location = routerLocationPathnameSelector(state$.value);
      const publicLocale = SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP[locale];

      return merge(
        of(replace(location.replace(currentLocale, publicLocale))),
        of(publicLocaleChangeAction(publicLocale)),
      );
    }),
  );

const localeRootEpic: TAppEpic = (action$, state$, deps) => action$
  .pipe(
    isCreator(localeChangeAction),
    changeTranslateControl(state$, deps),
  );

export { localeRootEpic, changeTranslateControl };
