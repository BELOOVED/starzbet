import { generatePath } from "react-router-dom";
import { type TExtractRouteParams } from "@sb/react-router-compat";
import {
  SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP,
  type TSupportedInternalLocale,
} from "../../../../../Store/Locale/Model/TSupportedLocale";
import { IS_SERVER_SIDE_SETUP } from "../../../../../IsServerSideSetup";
import { type TLocalizedRoutePath } from "../Model/LocalizedRoute";
import { getLocalizedPathPatternByRoute } from "./GetLocalizedPathPatternByRoute";

const defaultConvert = (value: string) => value;

const generateLocalizedPathByRoute = <R extends string, U = string | number | boolean>(
  locale: TSupportedInternalLocale,
  route: TLocalizedRoutePath<R>,
  params?: TExtractRouteParams<R, U>,
  convertTo: (value: string) => string = defaultConvert,
) => {
  const localeParams = IS_SERVER_SIDE_SETUP
    ? { locale: SUPPORTED_INTERNAL_TO_PUBLIC_LOCALE_MAP[locale] }
    : {};

  return convertTo(
    generatePath(
      route,
      {
        ...localeParams,
        ...params,
      } as unknown as Parameters<typeof generatePath<TLocalizedRoutePath<R>>>[1],
    ),
  );
};

/**
 * Only for matcher!!
 * @return route `/:locale/${generatePath(notLocalizedRoute)}`
 * @param route not localized
 * @param params
 */
const generateLocalizedMatchPath = <R extends string, U = string | number | boolean>(
  route: R extends TLocalizedRoutePath<string> ? never : R,
  params?: TExtractRouteParams<R, U>,
) => getLocalizedPathPatternByRoute(
    generatePath(
      route,
    params as Parameters<typeof generatePath<R>>[1],
    ),
  );

export { generateLocalizedPathByRoute, generateLocalizedMatchPath };
