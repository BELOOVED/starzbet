import clsx from "clsx";
import { type HTMLAttributes, memo } from "react";
import classes from "./Ellipsis.module.css";

const Ellipsis = memo<HTMLAttributes<HTMLDivElement>>(({ className, ...rest }) => (
  <div className={clsx(classes.ellipsis, className)} {...rest} />
));
Ellipsis.displayName = "Ellipsis";

export { Ellipsis };
