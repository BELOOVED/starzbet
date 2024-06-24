import { isString } from "@sb/utils";

type TRouteMap = {
  [route: string]: string | TRouteMap;
}

const getAllRoutePaths = <M extends TRouteMap>(
  routeMap: M,
): string[] => Object.values(routeMap)
    .reduce<string[]>(
      (acc, path) => {
        if (path === "/" || path === "*") {
          return acc;
        }

        if (isString(path)) {
          return [
            ...acc,
            path,
          ];
        }

        return [
          ...acc,
          ...getAllRoutePaths(path),
        ];
      },
      [],
    );

export { getAllRoutePaths };
