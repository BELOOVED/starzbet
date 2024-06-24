import { type Location, matchPath, type TMatch, type TRouteProps } from "@sb/react-router-compat";
import { type TExplicitAny } from "@sb/utils";

//TODO replace router-epic from package
type TRouterMatch<Params extends { [K in keyof Params]?: string }> = (location: Location, state?: TExplicitAny) => TMatch<Params> | null;

const getMatch = <Params extends { [K in keyof Params]?: string }>(props: string | string[] | TRouteProps): TRouterMatch<Params> =>
  (location: Location) =>
    matchPath(
      location.pathname,
      props,
    );

export { getMatch };
