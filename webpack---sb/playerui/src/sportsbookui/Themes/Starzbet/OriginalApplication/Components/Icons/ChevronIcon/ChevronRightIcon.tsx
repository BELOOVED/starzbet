import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ChevronRightIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6L8.59 7.41Z"} fill={"currentColor"} />
  </svg>
));
ChevronRightIconSvg.displayName = "ChevronRightIconSvg";

const ChevronRightIcon = withProps(Icon)({ svgComponent: ChevronRightIconSvg });

export { ChevronRightIcon };
