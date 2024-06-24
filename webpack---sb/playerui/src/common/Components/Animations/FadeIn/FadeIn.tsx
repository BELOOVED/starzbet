import clsx from "clsx";
import { type FC, type HTMLAttributes } from "react";
import classes from "./FadeIn.module.css";

const FadeIn: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={clsx(className, classes.fadeIn)} {...props}>
    {children}
  </div>
);
FadeIn.displayName = "FadeIn";

export { FadeIn };
