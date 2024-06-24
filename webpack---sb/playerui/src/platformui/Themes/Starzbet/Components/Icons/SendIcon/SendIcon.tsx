import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const SendIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_8_91118)"}>
      <path
        d={"M4.01 6.03L11.52 9.25L4 8.25L4.01 6.03ZM11.51 14.75L4 17.97V15.75L11.51 14.75ZM2.01 3L2 10L17 12L2 14L2.01 21L23 12L2.01 3Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_8_91118"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>

));
SendIconSvg.displayName = "SendIconSvg";

const SendIcon = withProps(Icon)({ svgComponent: SendIconSvg });

export { SendIcon };
