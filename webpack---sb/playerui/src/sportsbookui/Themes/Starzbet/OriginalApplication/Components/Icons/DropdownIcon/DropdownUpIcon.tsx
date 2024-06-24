import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const DropdownUpIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_2924)"}>
      <path d={"M17 14L12 9L7 14L17 14Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_1_2924"}>
        <rect
          width={"24"}
          height={"24"}
          fill={"white"}
          transform={"translate(24 24) rotate(-180)"}
        />
      </clipPath>
    </defs>
  </svg>
));
DropdownUpIconSvg.displayName = "DropdownUpIconSvg";

const DropdownUpIcon = withProps(Icon)({ svgComponent: DropdownUpIconSvg });

export { DropdownUpIcon };

