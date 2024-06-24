import { Link, type LinkProps } from "react-router-dom";
import { omit } from "@sb/utils";
import { isRelativeRouteParams, type TLocalizedRouteParams, type TRouteParams } from "../../Model/RoutesTypes";
import { useLocalizedLocationDescriptor } from "../../Hooks/UseLocalizedLocationDescriptor";

const LinkWithLocale = <R extends string, U = string | number | boolean, S = unknown>({
  to,
  params,
  convertTo,
  locationDescriptor,
  ...props
}: TLocalizedRouteParams<R, U, S>) => {
  const localizedRoute = useLocalizedLocationDescriptor(to, params, convertTo, locationDescriptor);

  return (
    <Link to={localizedRoute} {...props} />
  );
};
LinkWithLocale.displayName = "LinkWithLocale";

type TLinkLocalizedProps<R extends string, U = string | number | boolean, S = unknown> =
  Omit<LinkProps<S>, "to"> &
  TRouteParams<R, U, S>

const LinkLocalized = <R extends string, U = string | number | boolean, S = unknown>({
  to,
  params,
  convertTo,
  locationDescriptor,
  relativePath,
  ...props
}: TLinkLocalizedProps<R, U, S>) => {
  const routeParams = {
    to,
    params,
    convertTo,
    locationDescriptor,
    relativePath,
  } as TRouteParams<R, U, S>;

  return isRelativeRouteParams(routeParams)
    ? <Link to={routeParams.relativePath} {...props} />
    : <LinkWithLocale {...omit(["relativePath"], routeParams)} {...props} />;
};
LinkLocalized.displayName = "LinkLocalized";

export type { TLinkLocalizedProps };
export { LinkLocalized };
