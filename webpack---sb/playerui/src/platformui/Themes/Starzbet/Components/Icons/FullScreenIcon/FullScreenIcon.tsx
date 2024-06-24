import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const FullScreenIconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M8 0H2H0V2V8H2V2H8V0ZM12 20H18H20V18V12H18V18H12V20ZM12 0H18H20V2V8H18V2H12V0ZM2 20H8V18H2L2 12H0V18V20H2Z"}
      fill={"currentColor"}
    />
  </svg>
));
FullScreenIconSvg.displayName = "FullScreenIconSvg";

const FullScreenIcon = withProps(Icon)({ svgComponent: FullScreenIconSvg });

export { FullScreenIcon };
