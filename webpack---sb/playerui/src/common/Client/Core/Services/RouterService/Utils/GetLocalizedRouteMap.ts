import { entries, isString } from "@sb/utils";
import { type TLocalizedRoutePath } from "../Model/LocalizedRoute";
import { getLocalizedPathPatternByRoute } from "./GetLocalizedPathPatternByRoute";

type TRouteMap = {
  [route: string]: string | TRouteMap;
}

type TLocalizedRouteMap<R extends TRouteMap> = {
  [route in keyof R]: R[route] extends string ?
    TLocalizedRoutePath<R[route]> :
    R[route] extends TRouteMap ?
      TLocalizedRouteMap<R[route]> :
      never
}

const getLocalizedRouteMap = <M extends TRouteMap>(
  routeMap: M,
): TLocalizedRouteMap<M> => entries(routeMap)
    .reduce(
      (acc, [route, path]) => {
        if (isString(path)) {
          return {
            ...acc,
            [route]: getLocalizedPathPatternByRoute(path),
          };
        }

        return {
          ...acc,
          [route]: getLocalizedRouteMap(path),
        };
      },
      {} as TLocalizedRouteMap<M>,
    );

export { getLocalizedRouteMap };
