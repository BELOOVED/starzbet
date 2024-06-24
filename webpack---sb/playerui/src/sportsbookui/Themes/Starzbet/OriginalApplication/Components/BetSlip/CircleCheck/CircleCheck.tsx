import clsx from "clsx";
import { type HTMLAttributes, memo } from "react";
import classes from "./CircleCheck.module.css";
import { CircleCheckCrossIcon, CircleCheckTickIcon } from "./CircleCheckIcons";

type TCircleCheckProps = HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  failed?: boolean;
}
const CircleCheck = memo<TCircleCheckProps>(
  ({
    checked,
    failed,
    className,
    ...props
  }) => {
    if (failed) {
      return (
        <div className={clsx(classes.circleCheck, classes.failed, className)} {...props}>
          <CircleCheckCrossIcon className={classes.icon} />
        </div>
      );
    }
    if (checked) {
      return (
        <div className={clsx(classes.circleCheck, classes.checked, className)} {...props}>
          <CircleCheckTickIcon className={classes.icon} />
        </div>
      );
    }

    return (
      <div className={clsx(classes.circleCheck, className)} {...props} />
    );
  },
);
CircleCheck.displayName = "CircleCheck";

export { CircleCheck };
