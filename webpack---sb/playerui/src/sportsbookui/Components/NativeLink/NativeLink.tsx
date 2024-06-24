import { type AnchorHTMLAttributes, type DetailedHTMLProps, memo } from "react";

interface INativeLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  className?: string;
  path: string;
}

const NativeLink = memo<INativeLinkProps>(({ className = "", path, ...rest }) => (
  <a
    {...rest}
    className={`sb__reset_link ${className}`}
    href={`${window.location.origin}${path}`}
  />
));
NativeLink.displayName = "NativeLink";

export { NativeLink };
