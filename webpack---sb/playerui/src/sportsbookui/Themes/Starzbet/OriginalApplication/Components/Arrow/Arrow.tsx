import clsx from "clsx";
import { memo } from "react";
import classes from "./Arrow.module.css";

interface IArrow{
  expanded?: boolean;
  size?: number;
}

const Arrow = memo<IArrow>(({ expanded, size = 24 }) => {
  const expClass = clsx(expanded && classes.expanded);

  return (
    <div className={`${classes.arrow} ${expClass} ${classes[`--size${size}`]}`} />
  );
});
Arrow.displayName = "Arrow";

export { Arrow };
