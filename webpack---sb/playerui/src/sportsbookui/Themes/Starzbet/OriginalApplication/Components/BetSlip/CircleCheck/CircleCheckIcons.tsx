import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const CircleCheckTickIconSvg = memo(() => (
  <svg
    width={"10"}
    height={"8"}
    viewBox={"0 0 10 8"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M8.67531 0L3.58017 5.05678L1.4254 2.59675L0 4.02567L3.48114 8L10 1.53617L8.67531 0Z"} fill={"white"} />
  </svg>
));
CircleCheckTickIconSvg.displayName = "CircleCheckTickIconSvg";

const CircleCheckCrossIconSvg = memo(() => (
  <svg
    width={"10"}
    height={"10"}
    viewBox={"0 0 10 10"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M8.94318 8.94318C8.78441 9.10194 8.52753 9.10194 8.36859 8.94318L5.00001 5.57384L1.63068 8.94318C1.47191 9.10194 1.21503 9.10194 1.05609 8.94318C0.89732 8.78441 0.89732 8.52753 1.05609 8.36859L4.42618 5.00001L1.0566 1.63068C0.897828 1.47191 0.897828 1.21503 1.0566 1.05609C1.21536 0.89732 1.47224 0.89732 1.63119 1.05609L5.00001 4.42618L8.36935 1.05685C8.52812 0.898082 8.78499 0.898082 8.94394 1.05685C9.10271 1.21562 9.10271 1.47249 8.94394 1.63144L5.57384 5.00001L8.94318 8.36935C9.10314 8.52677 9.10314 8.78576 8.94318 8.94318Z"}
      fill={"black"}
    />
  </svg>
));
CircleCheckCrossIconSvg.displayName = "CircleCheckCrossIconSvg";

const CircleCheckTickIcon = withProps(Icon)({ svgComponent: CircleCheckTickIconSvg });
const CircleCheckCrossIcon = withProps(Icon)({ svgComponent: CircleCheckCrossIconSvg });

export {
  CircleCheckTickIcon,
  CircleCheckCrossIcon,
};
