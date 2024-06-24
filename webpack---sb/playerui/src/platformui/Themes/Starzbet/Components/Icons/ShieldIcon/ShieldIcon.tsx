import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const ShieldIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M8 0L1 2.01574V7.0551C1 10.3307 3.83807 13.8917 8 16C12.162 13.8918 15 10.3307 15 7.0551V2.01574L8 0ZM8 14.848C4.4239 12.8778 2.0566 9.79725 2.0566 7.0551V2.76435L8 1.05297V14.848Z"}
      fill={"currentColor"}
    />
  </svg>
));
ShieldIconSvg.displayName = "ShieldIconSvg";

const ShieldIcon = withProps(Icon)({ svgComponent: ShieldIconSvg });

export { ShieldIcon };
