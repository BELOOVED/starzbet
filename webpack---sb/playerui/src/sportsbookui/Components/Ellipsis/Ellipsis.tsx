import clsx from "clsx";
import { type DetailedHTMLProps, type HTMLAttributes, memo } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./Ellipsis.module.css";

const Ellipsis = memo<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(
  ({ className, ...rest }) => (
    <div className={clsx(classes.ellipsis, className)} {...qaAttr(PlayerUIQaAttributes.SportsbookKeys.ContentWithEllipsis)} {...rest} />),
);
Ellipsis.displayName = "Ellipsis";

const CapitalizedEllipsis = memo<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(({ className = "", ...rest }) =>
  <Ellipsis {...rest} className={clsx(classes.capitalized, className)} />);
CapitalizedEllipsis.displayName = "CapitalizedEllipsis";

export { Ellipsis, CapitalizedEllipsis };
