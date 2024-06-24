import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../common/Components/Icon/Icon";

const AllProvidersIconSvg = memo(() => (
  <svg
    width={"25"}
    height={"24"}
    viewBox={"0 0 25 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <rect
      x={"1"}
      y={"0.5"}
      width={"23"}
      height={"23"}
      rx={"4.5"}
      fill={"#26292E"}
      stroke={"currentColor"}
    />

    <path
      d={"M5.5 8.5H9V5H5.5V8.5ZM10.75 19H14.25V15.5H10.75V19ZM5.5 19H9V15.5H5.5V19ZM5.5 13.75H9V10.25H5.5V13.75ZM10.75 13.75H14.25V10.25H10.75V13.75ZM16 5V8.5H19.5V5H16ZM10.75 8.5H14.25V5H10.75V8.5ZM16 13.75H19.5V10.25H16V13.75ZM16 19H19.5V15.5H16V19Z"}
      fill={"white"}
    />
  </svg>
));
AllProvidersIconSvg.displayName = "AllProvidersIconSvg";

const AllProvidersIcon = withProps(Icon)({ svgComponent: AllProvidersIconSvg });

export { AllProvidersIcon };
