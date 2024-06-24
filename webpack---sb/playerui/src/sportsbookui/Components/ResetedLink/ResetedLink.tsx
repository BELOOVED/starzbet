import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import {
  NavLinkLocalized,
  type TNavLinkLocalizedProps,
} from "../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import {
  LinkLocalized,
  type TLinkLocalizedProps,
} from "../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";

type TResetedLinkProps<R extends string, U = string | number | boolean, S = unknown> =
  TLinkLocalizedProps<R, U, S>
  & IWithQaAttribute
  & {
  className?: string;
}

type TResetedNavLinkProps<R extends string, U = string | number | boolean, S = unknown> = TNavLinkLocalizedProps<R, U, S> & {
  className?: string;
}

const ResetedLink = <R extends string, U = string | number | boolean, S = unknown>({
  className = "",
  qaAttribute,
  ...rest
}: TResetedLinkProps<R, U, S>) => (
    <LinkLocalized {...rest} className={`sb__reset_link ${className}`} {...qaAttr(qaAttribute)} />
  );
ResetedLink.displayName = "ResetedLink";

const ResetedNavLink = <R extends string, U = string | number | boolean, S = unknown>({
  className = "",
  ...rest
}: TResetedNavLinkProps<R, U, S>) => (
    <NavLinkLocalized {...rest} className={`sb__reset_link ${className}`} />
  );
ResetedNavLink.displayName = "ResetedNavLink";

export { ResetedLink, ResetedNavLink };
export type { TResetedLinkProps };

