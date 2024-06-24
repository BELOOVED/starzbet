import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const CheckedIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"10"}
    height={"8"}
    viewBox={"0 0 10 8"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_117_4507)"}>
      <path d={"M8.67531 0L3.58017 5.05678L1.4254 2.59675L0 4.02567L3.48114 8L10 1.53617L8.67531 0Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_117_4507"}>
        <rect width={"10"} height={"8"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
CheckedIconSvg.displayName = "CheckedIconSvg";

const CheckedIcon = withProps(Icon)({ svgComponent: CheckedIconSvg });

export { CheckedIcon };
