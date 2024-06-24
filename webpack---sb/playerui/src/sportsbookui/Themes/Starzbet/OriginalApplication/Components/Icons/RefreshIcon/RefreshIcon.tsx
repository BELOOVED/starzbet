import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const RefreshIconSvg = memo(() => (
  <svg
    width={"176"}
    height={"176"}
    viewBox={"0 0 176 176"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M168.376 29.5469V73.3885H124.534"}
      stroke={"currentColor"}
      strokeWidth={"5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M7.62598 146.455V102.613H51.4676"}
      stroke={"currentColor"}
      strokeWidth={"5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M25.9664 66.0782C29.6722 55.6058 35.9705 46.2428 44.2736 38.8629C52.5767 31.4831 62.614 26.3268 73.4489 23.8753C84.2838 21.4237 95.5631 21.7569 106.234 24.8435C116.906 27.9302 126.621 33.6699 134.474 41.5269L168.378 73.3851M7.62598 102.613L41.5301 134.471C49.3832 142.328 59.0987 148.068 69.77 151.154C80.4413 154.241 91.7206 154.574 102.556 152.123C113.39 149.671 123.428 144.515 131.731 137.135C140.034 129.755 146.332 120.392 150.038 109.92"}
      stroke={"currentColor"}
      strokeWidth={"5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>
));
RefreshIconSvg.displayName = "RefreshIconSvg";

const RefreshIcon = withProps(Icon)({ svgComponent: RefreshIconSvg });

export { RefreshIcon };
