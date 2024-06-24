import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const DownChevronSvg = memo(() => (
  <svg
    width={"10"}
    height={"6"}
    viewBox={"0 0 10 6"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M8.62633 0L5 3.41372L1.37367 0L0 1.29314L5 6L10 1.29314L8.62633 0Z"} fill={"currentColor"} />
  </svg>
));
DownChevronSvg.displayName = "DownChevronSvg";

const DownChevronIcon = withProps(Icon)({ svgComponent: DownChevronSvg });

export { DownChevronIcon };
