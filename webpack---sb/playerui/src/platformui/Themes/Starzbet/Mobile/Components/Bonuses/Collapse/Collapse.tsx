import { type FC, type PropsWithChildren, type ReactNode } from "react";
import classes from "./Collapse.module.css";
import { Collapse as BaseCollapse } from "../../../../Components/Bonuses/Collapse/Collapse";

interface IRuleLayoutProps {
  title: ReactNode;
}

const Collapse: FC<PropsWithChildren<IRuleLayoutProps>> = ({ title, children }) => (
  <BaseCollapse title={title} className={classes.collapse} headerClassName={classes.header}>
    <div className={classes.body}>
      {children}
    </div>
  </BaseCollapse>
);
Collapse.displayName = "Collapse";

export { Collapse };
