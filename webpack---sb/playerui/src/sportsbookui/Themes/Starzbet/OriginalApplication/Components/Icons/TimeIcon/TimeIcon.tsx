import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const TimeIconSvg = memo(() => (
  <svg
    width={"14"}
    height={"14"}
    viewBox={"0 0 14 14"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M7.4375 6.86875L9.11367 9.38164C9.24766 9.58398 9.19297 9.85469 8.99336 9.98867C8.79102 10.1227 8.52031 10.068 8.38633 9.86836L6.63633 7.24336C6.58711 7.16953 6.5625 7.0875 6.5625 6.97539V3.03789C6.5625 2.82187 6.75938 2.60039 7 2.60039C7.24062 2.60039 7.4375 2.82187 7.4375 3.03789V6.86875ZM14 7C14 10.8664 10.8664 14 7 14C3.13359 14 0 10.8664 0 7C0 3.13359 3.13359 0 7 0C10.8664 0 14 3.13359 14 7ZM7 0.875C3.61758 0.875 0.875 3.61758 0.875 7C0.875 10.3824 3.61758 13.125 7 13.125C10.3824 13.125 13.125 10.3824 13.125 7C13.125 3.61758 10.3824 0.875 7 0.875Z"}
      fill={"currentColor"}
    />
  </svg>

));
TimeIconSvg.displayName = "TimeIconSvg";

const TimeIcon = withProps(Icon)({ svgComponent: TimeIconSvg });

export { TimeIcon };
