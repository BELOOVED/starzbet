import clsx from "clsx";
import classes from "./NavLink.module.css";
import { scrollToTop } from "../../../../../sportsbookui/Utils/ScrollToTop";
import {
  NavLinkLocalized,
  type TNavLinkLocalizedProps,
} from "../../../../Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";

type TNavLinkColorScheme = "orange-gradient" | "orange-gradient-mobile";

type TNavLinkProps<R extends string, U = string | number | boolean, S = unknown> = TNavLinkLocalizedProps<R, U, S> & {
  colorScheme: TNavLinkColorScheme;
  wide?: boolean;
  toTop?: boolean;
}

const colorSchemeToClassNameMap: Record<TNavLinkColorScheme, string | undefined> = {
  "orange-gradient": classes.orangeGradient,
  "orange-gradient-mobile": classes.orangeGradientMobile,
};

const activeClassNameMap: Record<TNavLinkColorScheme, string | undefined> = {
  "orange-gradient": classes.orangeGradientActive,
  "orange-gradient-mobile": classes.orangeGradientMobileActive,
};

const NavLink = <R extends string, U = string | number | boolean, S = unknown>({
  children,
  className,
  activeClassName,
  colorScheme,
  wide = false,
  toTop,
  ...rest
}: TNavLinkProps<R, U, S>) => {
  const onClick = toTop ? scrollToTop : undefined;

  return (
    <NavLinkLocalized
      className={clsx(className, colorSchemeToClassNameMap[colorScheme], wide && classes.wide)}
      activeClassName={clsx(activeClassName, activeClassNameMap[colorScheme])}
      onClick={onClick}
      {...rest}
    >
      {children}
    </NavLinkLocalized>
  );
};
NavLink.displayName = "NavLink";

export { NavLink };
