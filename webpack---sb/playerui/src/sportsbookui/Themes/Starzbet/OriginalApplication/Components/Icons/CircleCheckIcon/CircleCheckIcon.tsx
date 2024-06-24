import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const CircleCheckIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_5710)"}>
      <path
        d={"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1_5710"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
CircleCheckIconSvg.displayName = "CircleCheckIconSvg";

const CircleCheckIcon = withProps(Icon)({ svgComponent: CircleCheckIconSvg });

export { CircleCheckIcon };