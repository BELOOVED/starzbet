import { combineEpics } from "redux-observable";
import { EMPTY, ignoreElements, merge, type Observable, of, tap } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { type Action } from "redux";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { ECurrencyCode, isCreator, isString } from "@sb/utils";
import { loggedSelector, requestLoginAction, requestLogoutAction } from "@sb/auth";
import { localeChangeAction } from "../../../../common/Actions";
import { production } from "../../../../common/Constants/Production";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { setSystemCurrencyAction } from "../../../../common/Store/Config/ConfigAction";
import { setThemeAction } from "../../../../common/Store/Theme/ThemeActions";
import { type ETheme } from "../../../../common/Store/Theme/ThemeState";
import { isSupportedInternalLocale } from "../../../../common/Store/Locale/Model/TSupportedLocale";
import { replaceLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { redirectToLocalizedRouteEpic } from "../../../../common/Client/Core/Services/RouterService/RedirectToLocalizedRouteEpic";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { isNull } from "../../../Utils/isNull";
import { crashDebugSelector } from "../../DebugMode/Selectors/DebugModeSelectors";
import { isSupportedCurrency } from "../../SupportedCurrencies/Model/SupportedCurrencies";
import { localeSelector } from "../../Locale/LocaleSelector";
import { appChangeParamsAction, appErrorAction } from "../AppActions";

const appErrorEpic: TAppEpic = (action$, state$) => {
  if (!production) {
    return EMPTY;
  }

  return action$.pipe(
    isCreator(appErrorAction),
    switchMap(
      () => {
        const debug = crashDebugSelector(state$.value);

        if (debug) {
          return EMPTY;
        }

        const locale = localeSelector(state$.value);

        return merge(
          of(replaceLocalized(locale, routeMap.root)),
          state$.pipe(
            map(routerLocationPathnameSelector),
            distinctUntilChanged(),
            filter((it) => !!matchPath(it, routeMap.root)),
            tap(() => {
              window.location.reload();
            }),
            ignoreElements(),
          ),
        );
      },
    ),
  );
};

const isCurrency = (value: unknown): value is ECurrencyCode => Object.values(ECurrencyCode).includes(value as ECurrencyCode);

const watchChangedParamsEpic: TAppEpic = (action$, state$) => (
  action$.pipe(
    isCreator(appChangeParamsAction),
    switchMap(({ payload }) => {
      const batch = [] as Observable<Action>[];

      const logged = loggedSelector(state$.value);

      Object.entries(payload).forEach(([key, value]) => {
        switch (key) {
          case "locale": {
            if (isSupportedInternalLocale(value)) {
              batch.push(of(localeChangeAction(value)));
            }

            break;
          }

          case "token": {
            if (isNull(value) && logged) {
              batch.push(of(requestLogoutAction()));
            } else if (value) {
              batch.push(of(requestLoginAction(value)));
            }

            break;
          }

          case "defaultCurrency": {
            if (isCurrency(value)) {
              if (!isSupportedCurrency(value)) {
                batch.push(of(modalOpenAction(EModal.notSupportedCurrency, value)));

                break;
              }

              batch.push(of(setSystemCurrencyAction(value)));
            }

            break;
          }

          case "theme": {
            if (isString(value)) {
              batch.push(of(setThemeAction(value as ETheme)));
            }
            break;
          }

          case "timeZoneOffset": {
            //todo temporary skip
            break;
          }

          default:
            batch.push(EMPTY);
        }
      });

      return merge(...batch);
    }),
  )
);

const appRootEpic = combineEpics(
  appErrorEpic,
  watchChangedParamsEpic,
  redirectToLocalizedRouteEpic,
);

export { appRootEpic };
