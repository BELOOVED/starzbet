import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { localeSelector } from "../../../../../../platformui/Store/Locale/Selectors/localeSelector";
import { pushLocalized, replaceLocalized, type TPushLocalized, type TReplaceLocalized } from "../Utils/LocationChangeLocalized";
import { type TLocalizedRouteParamsWithDescriptor } from "../Model/RoutesTypes";

type TUseLocalizedRouteProps<R extends string, U = string | number | boolean, S = unknown> =
  TLocalizedRouteParamsWithDescriptor<R, U, S> extends [unknown, ...infer L] ? L : never

const useLocalizedRoute = (routeMethod: TReplaceLocalized | TPushLocalized) => {
  const locale = useSelector(localeSelector);
  const dispatch = useDispatch();

  return useCallback(
    <R extends string, U = string | number | boolean>(...args: TUseLocalizedRouteProps<R, U>) => {
      dispatch(routeMethod<R, U>(locale, ...args));
    },
    [locale],
  );
};

const useLocalizedPush = () => useLocalizedRoute(pushLocalized);
const useLocalizedReplace = () => useLocalizedRoute(replaceLocalized);

type TLocalizedPushParams = Parameters<ReturnType<typeof useLocalizedPush>>

const useLocalizedPushPath = <R extends string, U = string | number | boolean>(...args: TUseLocalizedRouteProps<R, U>) => {
  const pushLocalized = useLocalizedPush();

  return useCallback(
    () => {
      pushLocalized<R, U>(...args);
    },
    [pushLocalized, ...args],
  );
};

const useLocalizedReplacePath = <R extends string, U = string | number | boolean>(...args: TUseLocalizedRouteProps<R, U>) => {
  const replaceLocalized = useLocalizedReplace();

  return useCallback(
    () => {
      replaceLocalized<R, U>(...args);
    },
    [replaceLocalized, ...args],
  );
};

export type { TLocalizedPushParams, TUseLocalizedRouteProps };
export {
  useLocalizedPush,
  useLocalizedPushPath,
  useLocalizedReplace,
  useLocalizedReplacePath,
};
