import { Redirect, type RedirectProps } from "react-router-dom";
import { omit } from "@sb/utils";
import { isRelativeRouteParams, type TLocalizedRouteParams, type TRouteParams } from "../../Model/RoutesTypes";
import { useLocalizedLocationDescriptor } from "../../Hooks/UseLocalizedLocationDescriptor";

const RedirectWithLocale = <R extends string, U = string | number | boolean, S = unknown>({
  to,
  params,
  convertTo,
  locationDescriptor,
  ...props
}: TLocalizedRouteParams<R, U, S>) => {
  const localizedRoute = useLocalizedLocationDescriptor(to, params, convertTo, locationDescriptor);

  return (
    <Redirect to={localizedRoute} {...props} />
  );
};
RedirectWithLocale.displayName = "RedirectWithLocale";

type TRedirectLocalizedProps<R extends string, U = string | number | boolean, S = unknown> =
  Omit<RedirectProps, "to">
  & TRouteParams<R, U, S>

const RedirectLocalized = <R extends string, U = string | number | boolean, S = unknown>({
  to,
  params,
  convertTo,
  locationDescriptor,
  relativePath,
  ...props
}: TRedirectLocalizedProps<R, U, S>) => {
  const routeParams = {
    to,
    params,
    convertTo,
    locationDescriptor,
    relativePath,
  } as TRouteParams<R, U, S>;

  return isRelativeRouteParams(routeParams)
    ? <Redirect to={routeParams.relativePath} {...props} />
    : <RedirectWithLocale {...omit(["relativePath"], routeParams)} {...props} />;
};
RedirectLocalized.displayName = "RedirectLocalized";

export { RedirectLocalized };
