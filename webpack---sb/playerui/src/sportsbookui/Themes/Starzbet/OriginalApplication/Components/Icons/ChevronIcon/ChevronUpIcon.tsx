import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ChevronUpIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"} fill={"currentColor"} />
  </svg>
));
ChevronUpIconSvg.displayName = "ChevronUpIconSvg";

const ChevronUpIcon = withProps(Icon)({ svgComponent: ChevronUpIconSvg });

export { ChevronUpIcon };

