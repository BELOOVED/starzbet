import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const CheckIconSvg = memo(() => (
  <svg
    width={"14"}
    height={"10"}
    viewBox={"0 0 14 10"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_117_8760)"}>
      <path d={"M12.1454 0L5.01224 6.32097L1.99556 3.24593L0 5.03209L4.8736 10L14 1.92022L12.1454 0Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_117_8760"}>
        <rect width={"14"} height={"10"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
CheckIconSvg.displayName = "CheckIconSvg";

const CheckIcon = withProps(Icon)({ svgComponent: CheckIconSvg });

export { CheckIcon };
