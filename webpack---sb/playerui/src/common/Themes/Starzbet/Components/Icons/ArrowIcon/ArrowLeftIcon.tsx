import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../Components/Icon/Icon";

const ArrowLeftIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_9336_569)"}>
      <path d={"M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_9336_569"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
ArrowLeftIconSvg.displayName = "ArrowLeftIconSvg";

const ArrowLeftIcon = withProps(Icon)({ svgComponent: ArrowLeftIconSvg });

export { ArrowLeftIcon };
