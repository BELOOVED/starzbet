import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const SquashIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_3009)"}>
      <path
        d={"M3.31099 22.8112C3.17166 22.9505 3.00625 23.0611 2.8242 23.1365C2.64215 23.2119 2.44704 23.2507 2.24999 23.2507C1.85204 23.2507 1.47039 23.0926 1.18899 22.8112C0.907598 22.5298 0.749512 22.1481 0.749512 21.7502C0.749512 21.3522 0.907598 20.9706 1.18899 20.6892L4.68199 17.2002L6.79999 19.3182L3.31099 22.8112Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M8.25004 15.75L5.74304 18.257"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M20.8886 12.1123C23.7496 9.25129 24.0541 4.91728 21.5688 2.43198C19.0835 -0.0533175 14.7495 0.251236 11.8885 3.11222C9.02754 5.9732 8.72298 10.3072 11.2083 12.7925C13.6936 15.2778 18.0276 14.9733 20.8886 12.1123Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M9.664 9.91211L8.25 15.7501L14.088 14.3361"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M22.358 10.1291L13.871 1.64209"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M10.418 5.09521L18.905 13.5822"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M19.7731 1.22705L10.0031 10.9971"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M13.0031 13.9971L22.7731 4.22705"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M3.75 6.75C5.40685 6.75 6.75 5.40685 6.75 3.75C6.75 2.09315 5.40685 0.75 3.75 0.75C2.09315 0.75 0.75 2.09315 0.75 3.75C0.75 5.40685 2.09315 6.75 3.75 6.75Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1_3009"}>
        <rect width={"24"} height={"24"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
SquashIconSvg.displayName = "SquashIconSvg";

const SquashIcon = withProps(Icon)({ svgComponent: SquashIconSvg });

export { SquashIcon };
