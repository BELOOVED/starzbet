import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const FavSelectedIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_8_88331)"}>
      <path
        d={"M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_8_88331"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
FavSelectedIconSvg.displayName = "FavSelectedIconSvg";

const FavSelectedIcon = withProps(Icon)({ svgComponent: FavSelectedIconSvg });

export { FavSelectedIcon };
