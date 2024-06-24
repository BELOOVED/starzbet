import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const ExpandedIconSvg = memo(
  () => (
    <svg
      width={"10"}
      height={"5"}
      viewBox={"0 0 10 5"}
      fill={"none"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path d={"M8.62797 4.57678C8.86758 4.78216 9.22833 4.75441 9.43371 4.5148C9.6391 4.27518 9.61135 3.91444 9.37173 3.70906L5.37173 0.280485C5.15774 0.0970612 4.84196 0.0970612 4.62797 0.280485L0.62797 3.70906C0.388355 3.91444 0.360606 4.27518 0.56599 4.5148C0.771374 4.75441 1.13212 4.78216 1.37173 4.57678L4.99985 1.46696L8.62797 4.57678Z"} fill={"currentColor"} />
    </svg>
  ),

);
ExpandedIconSvg.displayName = "ExpandedIconSvg";

const ExpandedIcon = withProps(Icon)({ svgComponent: ExpandedIconSvg });

export { ExpandedIcon };
