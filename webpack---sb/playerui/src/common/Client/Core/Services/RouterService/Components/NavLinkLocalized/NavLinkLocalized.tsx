import { NavLink, type NavLinkProps } from "react-router-dom";
import { omit } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import { isRelativeRouteParams, type TLocalizedRouteParams, type TRouteParams } from "../../Model/RoutesTypes";
import { useLocalizedLocationDescriptor } from "../../Hooks/UseLocalizedLocationDescriptor";

const NavLinkWithLocale = <R extends string, U = string | number | boolean, S = unknown>({
  to,
  params,
  convertTo,
  locationDescriptor,
  qaAttribute,
  ...props
}: TLocalizedRouteParams<R, U, S>) => {
  const localizedRoute = useLocalizedLocationDescriptor(to, params, convertTo, locationDescriptor);

  return (
    <NavLink to={localizedRoute} {...props} {...qaAttr(qaAttribute)} />
  );
};
NavLinkWithLocale.displayName = "NavLinkWithLocale";

type TNavLinkLocalizedProps<R extends string, U = string | number | boolean, S = unknown> =
  Omit<NavLinkProps<S>, "to">
  & TRouteParams<R, U, S>
& IWithQaAttribute;

const NavLinkLocalized = <R extends string, U = string | number | boolean, S = unknown>({
  to,
  params,
  convertTo,
  locationDescriptor,
  relativePath,
  qaAttribute,
  ...props
}: TNavLinkLocalizedProps<R, U, S>) => {
  const routeParams = {
    to,
    params,
    convertTo,
    locationDescriptor,
    relativePath,
  } as TRouteParams<R, U, S>;

  return isRelativeRouteParams(routeParams)
    ? <NavLink to={routeParams.relativePath} {...props} {...qaAttr(qaAttribute)} />
    : <NavLinkWithLocale {...omit(["relativePath"], routeParams)} {...props} {...qaAttr(qaAttribute)} />;
};
NavLinkLocalized.displayName = "NavLinkLocalized";

export type { TNavLinkLocalizedProps };
export { NavLinkLocalized };
