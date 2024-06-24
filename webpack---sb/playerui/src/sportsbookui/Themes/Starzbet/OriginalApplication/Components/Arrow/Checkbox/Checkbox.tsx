import clsx from "clsx";
import { memo } from "react";
import classes from "./Checkbox.module.css";

const CheckIcon = memo(() => (
  <svg
    width={"10"}
    height={"8"}
    viewBox={"0 0 10 8"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_702_25049)"}>
      <path d={"M8.67531 0L3.58017 5.05678L1.4254 2.59675L0 4.02567L3.48114 8L10 1.53617L8.67531 0Z"} fill={"white"} />
    </g>

    <defs>
      <clipPath id={"clip0_702_25049"}>
        <rect width={"10"} height={"8"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
CheckIcon.displayName = "CheckIcon";

interface ICheckboxProps {
  active: boolean;
  toggleActive?: () => void;
}

const Checkbox = memo<ICheckboxProps>(({
  active,
  toggleActive,
}) => (
  <div className={clsx(classes.checkbox, active && classes.active)} onClick={toggleActive}>
    {active ? <CheckIcon /> : null}
  </div>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
