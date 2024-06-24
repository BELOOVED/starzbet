import clsx from "clsx";
import { memo } from "react";
import classes from "./ArrowIcon.module.css";

interface IArrowProps {
  expanded: boolean;
}

const ArrowIcon = memo<IArrowProps>(({ expanded }) => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"10"}
    height={"6"}
    viewBox={"0 0 10 6"}
    fill={"none"}
    className={clsx(classes.arrow, !expanded && classes.active)}
  >
    <g clipPath={"url(#clip0_2323_247602)"}>
      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={"M5 4.37114e-07L10 6L0 6L5 4.37114e-07Z"}
        fill={"#97A2AF"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_2323_247602"}>
        <rect
          width={"10"}
          height={"6"}
          fill={"white"}
          transform={"translate(10 6) rotate(180)"}
        />
      </clipPath>
    </defs>
  </svg>
));
ArrowIcon.displayName = "ArrowIcon";

export { ArrowIcon };
