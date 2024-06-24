import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ChevronDownIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M7.41 8.58008L12 13.1701L16.59 8.58008L18 10.0001L12 16.0001L6 10.0001L7.41 8.58008Z"} fill={"currentColor"} />
  </svg>
));
ChevronDownIconSvg.displayName = "ChevronDownIconSvg";

const ChevronDownIcon = withProps(Icon)({ svgComponent: ChevronDownIconSvg });

export { ChevronDownIcon };
