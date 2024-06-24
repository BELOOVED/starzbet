import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ChevronLeftIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z"} fill={"currentColor"} />
  </svg>
));
ChevronLeftIconSvg.displayName = "ChevronLeftIconSvg";

const ChevronLeftIcon = withProps(Icon)({ svgComponent: ChevronLeftIconSvg });

export { ChevronLeftIcon };
