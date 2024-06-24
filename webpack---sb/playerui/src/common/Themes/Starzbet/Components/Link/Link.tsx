import clsx from "clsx";
import classes from "./Link.module.css";
import { scrollToTop } from "../../../../../sportsbookui/Utils/ScrollToTop";
import {
  LinkLocalized,
  type TLinkLocalizedProps,
} from "../../../../Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";

type TLinkColorScheme = "secondary-orange" | "grey" | "light-grey" | "orange-gradient";

type TLinkProps<R extends string, U = string | number | boolean, S = unknown> = TLinkLocalizedProps<R, U, S> & {
  colorScheme?: TLinkColorScheme;
  wide?: boolean;
  toTop?: boolean;
}

const colorSchemeToClassNameMap: Record<TLinkColorScheme, string | undefined> = {
  "orange-gradient": classes.orangeGradient,
  "secondary-orange": classes.secondaryOrange,
  "grey": classes.grey,
  "light-grey": classes.lightGrey,
};

const Link = <R extends string, U = string | number | boolean, S = unknown>({
  children,
  className,
  colorScheme,
  wide = false,
  toTop,
  ...rest
}: TLinkProps<R, U, S>) => {
  const onClick = toTop ? scrollToTop : undefined;

  return (
    <LinkLocalized
      className={clsx(className, colorScheme && colorSchemeToClassNameMap[colorScheme], wide && classes.wide)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </LinkLocalized>
  );
};
Link.displayName = "Link";

export { Link };
