import clsx from "clsx";
import { memo } from "react";
import classes from "./RuleProgress.module.css";

interface IAggregateProductRuleProgressProps extends IWithClassName {
  currentValue?: string | number;
  requiredValue?: string | number;
  currentProgress: number;
  reverse?: boolean;
}

const getProgressStyle = (currentProgress: string | number) => ({ width: `${currentProgress}%` });

const RuleProgress = memo<IAggregateProductRuleProgressProps>(({
  currentProgress,
  currentValue,
  requiredValue = "-",
  reverse,
  className,
}) => (
  <div className={clsx(classes.progressBarContainer, reverse && classes.reverse)}>
    <div className={classes.progressMetricContainer}>
      <span>
        {`${currentProgress}%`}
      </span>

      {currentValue ? <span>{`${currentValue} / ${requiredValue}`}</span> : null}
    </div>

    <div className={clsx(classes.progressBarWrapper, className)}>
      <div className={classes.currentProgressBar} style={getProgressStyle(currentProgress)} />
    </div>
  </div>
));
RuleProgress.displayName = "RuleProgress";

export { RuleProgress };
