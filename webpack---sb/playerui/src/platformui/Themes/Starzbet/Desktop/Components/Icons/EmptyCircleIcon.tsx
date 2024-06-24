import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const EmptyCircleIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_8_91058)"}>
      <path
        d={"M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_8_91058"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>

));
EmptyCircleIconSvg.displayName = "EmptyCircleIconSvg";

const EmptyCircleIcon = withProps(Icon)({ svgComponent: EmptyCircleIconSvg });

export { EmptyCircleIcon };
