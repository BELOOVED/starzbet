import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const OddsDownSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"10"}
    height={"10"}
    viewBox={"0 0 10 10"}
    fill={"none"}
  >
    <path
      d={"M-8.74228e-07 8.74228e-07L10 10L4 10C1.79086 10 -1.56562e-07 8.20914 -3.49691e-07 6L-8.74228e-07 8.74228e-07Z"}
      fill={"currentColor"}
    />
  </svg>
));
OddsDownSvg.displayName = "OddsDownSvg";

const OddsDown = withProps(Icon)({ svgComponent: OddsDownSvg });

export { OddsDown };
