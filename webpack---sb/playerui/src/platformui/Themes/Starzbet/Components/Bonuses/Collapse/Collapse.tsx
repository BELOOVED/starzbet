import clsx from "clsx";
import { type FC, type PropsWithChildren, type ReactNode, useState } from "react";
import { withProps } from "@sb/utils";
import classes from "./Collapse.module.css";
import { noop } from "../../../../../../sportsbookui/Utils/Noop";
import { CollapseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import { FilledCollapseIcon } from "../../Icons/FilledCollapseIcon";

interface ICollapseProps {
  title: ReactNode;
  className?: string;
  headerClassName?: string;
  defaultOpen?: boolean;
  onToggle?: (expanded: boolean) => void;
  postfix?: ReactNode;
}

const Icon = withProps(FilledCollapseIcon)({ className: classes.collapseIcon });

const Collapse: FC<PropsWithChildren<ICollapseProps>> = ({
  children,
  title,
  className,
  headerClassName,
  defaultOpen = false,
  onToggle = noop,
  postfix = null,
}) => {
  const [expanded, setExpanded] = useState(defaultOpen);

  const handleToggle = () => {
    onToggle(!expanded);
    setExpanded(!expanded);
  };

  return (
    <div className={clsx(classes.collapse, className)}>
      <div
        className={clsx(classes.collapseHeader, headerClassName, expanded && classes.expanded)}
        onClick={handleToggle}
      >
        {title}

        <span className={classes.postfix}>
          {postfix}

          <CollapseIcon expanded={!expanded} component={Icon} />
        </span>
      </div>

      <div className={clsx(classes.collapseContent, !expanded && classes.hidden)}>
        {children}
      </div>
    </div>
  );
};
Collapse.displayName = "Collapse";

export { Collapse };
