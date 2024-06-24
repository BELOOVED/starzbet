import { matchPath as matchPathBase } from "react-router-dom";
import type { ComponentType } from "react";
import type { TMatch } from "./TMatchCompat";

type TRouteProps = {
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
  component?: ComponentType;
}

const matchPath = <T extends { [K in keyof T]?: string }>(
  pathname: string,
  props: string | string[] | TRouteProps,
  parent?: TMatch | undefined,
) => matchPathBase<T>(pathname, props, parent);

export { matchPath, type TRouteProps };
