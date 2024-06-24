import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const SnookerIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_3113)"}>
      <path
        d={"M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M12 11.25C12.8284 11.25 13.5 10.5784 13.5 9.75C13.5 8.92157 12.8284 8.25 12 8.25C11.1716 8.25 10.5 8.92157 10.5 9.75C10.5 10.5784 11.1716 11.25 12 11.25Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M12 18.75C15.7279 18.75 18.75 15.7279 18.75 12C18.75 8.27208 15.7279 5.25 12 5.25C8.27208 5.25 5.25 8.27208 5.25 12C5.25 15.7279 8.27208 18.75 12 18.75Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M12 15.75C13.2426 15.75 14.25 14.7426 14.25 13.5C14.25 12.2574 13.2426 11.25 12 11.25C10.7574 11.25 9.75 12.2574 9.75 13.5C9.75 14.7426 10.7574 15.75 12 15.75Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1_3113"}>
        <rect width={"24"} height={"24"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
SnookerIconSvg.displayName = "SnookerIconSvg";

const SnookerIcon = withProps(Icon)({ svgComponent: SnookerIconSvg });

export { SnookerIcon };
