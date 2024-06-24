import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ParlayBayIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M7.85714 22H4V2L12.3714 2.05714C17.2571 2.05714 20 5.08571 20 9.54286C20 13.5143 16.8857 16.0857 12.4 16.0857H11.0857V12.5714H12.7143C14.7143 12.5714 16.2857 11.4 16.2857 9.31429C16.2857 6.97143 14.8286 5.37143 12.4 5.37143L7.85714 5.34286V22Z"}
      fill={"currentColor"}
    />
  </svg>
));
ParlayBayIconSvg.displayName = "ParlayBayIconSvg";

const ParlayBayIcon = withProps(Icon)({ svgComponent: ParlayBayIconSvg });

export { ParlayBayIcon };
