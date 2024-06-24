import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const DropdownDownIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_2922)"}>
      <path d={"M7 10L12 15L17 10H7Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_1_2922"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
DropdownDownIconSvg.displayName = "DropdownDownIconSvg";

const DropdownDownIcon = withProps(Icon)({ svgComponent: DropdownDownIconSvg });

export { DropdownDownIcon };
