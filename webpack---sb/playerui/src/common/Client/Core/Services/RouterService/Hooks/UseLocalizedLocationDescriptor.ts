import { type LocationDescriptor } from "@sb/react-router-compat";
import { useLocalizedPathToRoute } from "./UseLocalizedPathToRoute";
import type { TUseLocalizedRouteProps } from "./UseLocalizedPush";

const useLocalizedLocationDescriptor = <R extends string, U = string | number | boolean, S = unknown>(
  ...args: TUseLocalizedRouteProps<R, U, S>
): LocationDescriptor<S> => {
  const [
    route,
    params,
    convertTo,
    locationDescriptor,
  ] = args;

  const pathname = useLocalizedPathToRoute<R, U>(
    route,
    params,
    convertTo,
  );

  return locationDescriptor
    ? {
      pathname,
      ...locationDescriptor,
    }
    : pathname;
};

export { useLocalizedLocationDescriptor };
