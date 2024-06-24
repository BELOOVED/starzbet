import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const StatsIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M5.5 13H3.5V8H5.5V13ZM9.5 13H7.5V3H9.5V13ZM13.5 13H11.5V6H13.5V13Z"} fill={"currentColor"} />
  </svg>
));
StatsIconSvg.displayName = "StatsIconSvg";

const StatsIcon = withProps(Icon)({ svgComponent: StatsIconSvg });

export { StatsIcon };
