import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const ArrowDownIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_8_88307)"}>
      <g clipPath={"url(#clip1_8_88307)"}>
        <path d={"M20 12L18.59 10.59L13 16.17V4H11V16.17L5.42 10.58L4 12L12 20L20 12Z"} fill={"currentColor"} />
      </g>
    </g>

    <defs>
      <clipPath id={"clip0_8_88307"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>

      <clipPath id={"clip1_8_88307"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
ArrowDownIconSvg.displayName = "ArrowDownIconSvg";

const ArrowDownIcon = withProps(Icon)({ svgComponent: ArrowDownIconSvg });

export { ArrowDownIcon };
