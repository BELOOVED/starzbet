import { type MouseEventHandler, type Ref, useCallback } from "react";
import { isNotNil } from "@sb/utils";
import {
  NavLinkLocalized,
  type TNavLinkLocalizedProps,
} from "../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";

type TNavLinkProps<R extends string, U = string | number | boolean, S = unknown> = TNavLinkLocalizedProps<R, U, S> & {
  toTop?: boolean;
  innerRef?: Ref<HTMLAnchorElement> | undefined;
}

const NavLinkToTop = <R extends string, U = string | number | boolean, S = unknown>({
  toTop = false,
  onClick,
  ...props
}: TNavLinkProps<R, U, S>) => {
  const resultOnClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      if (toTop) {
        window.scrollTo(0, 0);
      }
      if (isNotNil(onClick)) {
        onClick(event);
      }
    },
    [onClick, toTop],
  );

  return <NavLinkLocalized {...props} onClick={resultOnClick} />;
};
NavLinkToTop.displayName = "NavLinkToTop";

export {
  NavLinkToTop,
};
