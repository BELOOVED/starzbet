import clsx from "clsx";
import { type FC, memo, type PropsWithChildren, type ReactNode } from "react";
import classes from "./RuleLayout.module.css";
import { CheckedIconV2 } from "../../../../../../Components/Icons/CheckedIconV2";
import { Collapse } from "../../../Collapse/Collapse";

interface IRuleTitleProps {
    title: ReactNode;
    checked: boolean;
}

const RuleTitle = memo<IRuleTitleProps>(({ title, checked }) => (
  <div className={classes.title}>
    <span>{title}</span>

    <span className={clsx(classes.checkedContainer, checked && classes.checked)}>
      {checked ? <CheckedIconV2 /> : null}
    </span>
  </div>
));
RuleTitle.displayName = "RuleTitle";

interface IRuleLayoutProps {
    title: ReactNode;
    checked: boolean;
}

const RuleLayout: FC<PropsWithChildren<IRuleLayoutProps>> = ({ title, checked, children }) => (
  <Collapse title={<RuleTitle title={title} checked={checked} />}>
    {children}
  </Collapse>
);
RuleLayout.displayName = "RuleLayout";

export { RuleLayout };
