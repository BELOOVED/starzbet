import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import classes from "./CustomScrollbar.module.css";

const CustomScrollbar: FC<PropsWithChildren<IWithClassName>> = ({ children, className }) => (
  <div className={clsx(classes.scrollContainer, className)}>
    <div className={classes.scrollContent}>
      {children}
    </div>
  </div>
);
CustomScrollbar.displayName = "CustomScrollbar";

export { CustomScrollbar };
