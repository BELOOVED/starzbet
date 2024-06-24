import { memo, type SVGProps } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const ChevronThinIconSvg = memo<SVGProps<SVGSVGElement>>(() => (
  <svg
    width={"24"}
    height={"23"}
    viewBox={"0 0 24 23"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M7 9.58301L12 14.3747L17 9.58301"}
      stroke={"#BAC1CA"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>

));
ChevronThinIconSvg.displayName = "ChevronThinIconSvg";

const ChevronThinIcon = withProps(Icon)({ svgComponent: ChevronThinIconSvg, width: 24, height: 23 });

export { ChevronThinIcon };
