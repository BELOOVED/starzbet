import { createElement, type FC, memo, type PropsWithChildren, type ReactNode } from "react";
import classes from "./InnerTermsCollapse.module.css";
import { Collapse } from "../../../../../Components/Bonuses/Collapse/Collapse";

interface IInnerTermsTitleProps {
    title: ReactNode;
}

const InnerTermsTitle = memo<IInnerTermsTitleProps>(({ title }) => (
  <span className={classes.innerTermsTitle}>
    {title}
  </span>
));
InnerTermsTitle.displayName = "InnerTermsTitle";

interface IInnerTermsCollapseProps {
    title: ReactNode;
}

const InnerTermsCollapse: FC<PropsWithChildren<IInnerTermsCollapseProps>> = ({ title, children }) => {
  const Title = createElement(InnerTermsTitle, { title });

  return (
    <Collapse title={Title} className={classes.innerCollapse} headerClassName={classes.innerHeader}>
      <div className={classes.innerTermsBody}>
        {children}
      </div>
    </Collapse>
  );
};
InnerTermsCollapse.displayName = "InnerTermsCollapse";

export { InnerTermsCollapse };
