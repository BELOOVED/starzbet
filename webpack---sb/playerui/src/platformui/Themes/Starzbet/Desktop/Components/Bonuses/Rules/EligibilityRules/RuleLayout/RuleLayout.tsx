import clsx from "clsx";
import { type FC, type PropsWithChildren, type ReactNode } from "react";
import classes from "./RuleLayout.module.css";
import { CheckedIconV2 } from "../../../../../../Components/Icons/CheckedIconV2";

interface IRuleLayoutProps {
    title: ReactNode;
    checked: boolean;
}

const RuleLayout: FC<PropsWithChildren<IRuleLayoutProps>> = ({ title, checked, children }) => (
  <div className={classes.ruleContainer}>
    <div className={classes.ruleTitle}>
      <span className={classes.title}>
        {title}
      </span>

      <span className={clsx(classes.checkedContainer, checked && classes.checked)}>
        {checked ? <CheckedIconV2 /> : null}
      </span>
    </div>

    <div className={classes.rule}>
      {children}
    </div>
  </div>
);
RuleLayout.displayName = "RuleLayout";

export { RuleLayout };
