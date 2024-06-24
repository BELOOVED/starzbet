import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../Components/Icon/Icon";

const TickIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_2908)"}>
      <path d={"M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_1_2908"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
TickIconSvg.displayName = "TickIconSvg";

const TickIcon = withProps(Icon)({ svgComponent: TickIconSvg });

export { TickIcon };
