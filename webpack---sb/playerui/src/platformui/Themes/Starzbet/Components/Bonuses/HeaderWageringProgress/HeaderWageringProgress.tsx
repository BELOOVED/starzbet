import clsx from "clsx";
import { memo } from "react";
import classes from "./HeaderWageringProgress.module.css";

interface IAggregateProductRuleProgressProps extends IWithClassName {
  currentProgress: string | number;
}

const getProgressStyle = (currentProgress: string | number) => ({ width: `${currentProgress}%` });

const HeaderWageringProgress = memo<IAggregateProductRuleProgressProps>(({
  currentProgress,
  className,
}) => (
  <div className={clsx(classes.progressBarWrapper, className)}>
    <div className={classes.progressMetricContainer}>
      <span>
        {`${currentProgress}%`}
      </span>
    </div>

    <div className={classes.currentProgressBar} style={getProgressStyle(currentProgress)} />
  </div>
));
HeaderWageringProgress.displayName = "HeaderWageringProgress";

export { HeaderWageringProgress };
