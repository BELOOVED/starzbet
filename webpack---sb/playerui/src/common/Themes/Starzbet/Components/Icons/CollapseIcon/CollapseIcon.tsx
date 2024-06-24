import clsx from "clsx";
import { createElement, memo } from "react";
import { type TComponent } from "@sb/utils";
import classes from "./CollapseIcon.module.css";
import { type TIconProps } from "../../../../../Components/Icon/Icon";

interface ICollapseIconProps extends TIconProps {
  expanded: boolean;
  component?: TComponent;
}

const Arrow = memo(() => (
  <svg
    width={"10"}
    height={"6"}
    viewBox={"0 0 10 6"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g>
      <path d={"M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z"} fill={"#97A2AF"} />
    </g>

    <defs>
      <clipPath>
        <rect width={"10"} height={"6"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
Arrow.displayName = "Arrow";

const CollapseIcon = memo<ICollapseIconProps>(({ expanded, className, component = Arrow }) => (
  <div className={clsx(classes.icon, className, expanded && classes.expanded)}>
    {createElement(component)}
  </div>
));
CollapseIcon.displayName = "CollapseIcon";

export { CollapseIcon };
