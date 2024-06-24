import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const FloorballIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_3002)"}>
      <path
        d={"M3 15.75C4.24264 15.75 5.25 14.7426 5.25 13.5C5.25 12.2574 4.24264 11.25 3 11.25C1.75736 11.25 0.75 12.2574 0.75 13.5C0.75 14.7426 1.75736 15.75 3 15.75Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M22.211 0.821936C21.8324 0.699821 21.4208 0.733096 21.0667 0.914441C20.7127 1.09579 20.4451 1.41035 20.323 1.78894C20.323 1.78894 16.376 14.0219 15.187 17.7099C15.0896 18.0121 14.8989 18.2756 14.6423 18.4625C14.3857 18.6493 14.0764 18.75 13.759 18.7499H7.5C6.90326 18.7499 6.33097 18.987 5.90901 19.4089C5.48705 19.8309 5.25 20.4032 5.25 20.9999C5.25 21.5967 5.48705 22.169 5.90901 22.5909C6.33097 23.0129 6.90326 23.2499 7.5 23.2499H14.367C15.0016 23.2499 15.6199 23.0486 16.1329 22.6751C16.6459 22.3015 17.0272 21.7749 17.222 21.1709L23.177 2.71094C23.2376 2.52348 23.2608 2.32591 23.245 2.12951C23.2293 1.93311 23.175 1.74174 23.0853 1.56632C22.9956 1.39091 22.8722 1.23488 22.7222 1.10716C22.5722 0.979432 22.3985 0.882513 22.211 0.821936V0.821936Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M7.25 19L11.5 23.25"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M11 18.75L15.25 23"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M7 23.25L11.25 19"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M11 23.25L19 15.25"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1_3002"}>
        <rect width={"24"} height={"24"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
FloorballIconSvg.displayName = "FloorballIconSvg";

const FloorballIcon = withProps(Icon)({ svgComponent: FloorballIconSvg });

export { FloorballIcon };
