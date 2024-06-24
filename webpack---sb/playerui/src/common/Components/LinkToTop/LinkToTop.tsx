import { type MouseEvent } from "react";
import { scrollToTop } from "../../../platformui/Utils/ScrollToTop";
import { LinkLocalized, type TLinkLocalizedProps } from "../../Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import {
  NavLinkLocalized,
  type TNavLinkLocalizedProps,
} from "../../Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";

const LinkToTop = <R extends string, U = string | number | boolean>({ children, onClick, ...rest }: TLinkLocalizedProps<R, U>) => {
  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    scrollToTop();
  };

  return <LinkLocalized onClick={clickHandler} {...rest}>{children}</LinkLocalized>;
};
LinkToTop.displayName = "LinkToTop";

const NavLinkToTop = <R extends string, U = string | number | boolean>({ children, onClick, ...rest }: TNavLinkLocalizedProps<R, U>) => {
  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    scrollToTop();
  };

  return <NavLinkLocalized onClick={clickHandler} {...rest}>{children}</NavLinkLocalized>;
};
NavLinkToTop.displayName = "NavLinkToTop";

export { LinkToTop, NavLinkToTop };
