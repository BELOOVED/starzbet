import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const PlusIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_2937)"}>
      <g clipPath={"url(#clip1_1_2937)"}>
        <path d={"M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"} fill={"currentColor"} />
      </g>
    </g>

    <defs>
      <clipPath id={"clip0_1_2937"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>

      <clipPath id={"clip1_1_2937"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
PlusIconSvg.displayName = "PlusIconSvg";

const PlusIcon = withProps(Icon)({ svgComponent: PlusIconSvg });

export { PlusIcon };
