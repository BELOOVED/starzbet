import clsx from "clsx";
import { type PropsWithChildren } from "react";
import classes from "./Locked.module.css";

type TLockedProps = {
  condition: boolean;
} & PropsWithChildren & IWithClassName
const Locked = (
  { condition, children, className }: TLockedProps,
) =>
  condition ? (<div className={clsx(classes.locked, className)}>{children}</div>) : null;
Locked.displayName = "Locked";

export { Locked };
