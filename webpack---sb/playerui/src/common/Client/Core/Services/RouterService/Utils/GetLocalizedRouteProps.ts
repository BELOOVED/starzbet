import { isAnyObject } from "@sb/utils";
import { type TLocalizedPathParameters, type TLocalizedRouteParams } from "../Model/RoutesTypes";
import { type TLocalizedRoutePath } from "../Model/LocalizedRoute";

type TLocalizedRouteProps<R extends string, U = string | number | boolean, S = unknown> =
  TLocalizedRoutePath<R>
  | TLocalizedRouteParams<R, U, S>;

const getLocalizedRouteProps = <R extends string, U = string | number | boolean, S = unknown>(
  path: TLocalizedRouteProps<R, U, S>,
): TLocalizedRouteParams<R, U, S> =>
    isAnyObject(path) ? path : { to: path };

const getLocalizedRouteParams = <R extends string, U = string | number | boolean, S = unknown>(
  args: TLocalizedRouteParams<R, U, S>,
): TLocalizedPathParameters<`${R}`, U> => {
  const {
    to,
    params,
    convertTo,
  } = args;

  return [
    to,
    params,
    convertTo,
  ];
};

export type { TLocalizedRouteProps };
export { getLocalizedRouteProps, getLocalizedRouteParams };
