import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const OddsUpSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"10"}
    height={"10"}
    viewBox={"0 0 10 10"}
    fill={"none"}
  >
    <path d={"M10 10L0 0H6C8.20914 0 10 1.79086 10 4V10Z"} fill={"#6FC51A"} />
  </svg>
));
OddsUpSvg.displayName = "OddsUpSvg";

const OddsUp = withProps(Icon)({ svgComponent: OddsUpSvg });

export { OddsUp };
