import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const DownloadSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"20"}
    height={"21"}
    viewBox={"0 0 20 21"}
    fill={"none"}
  >
    <path
      d={"M15.8333 10.5V16.3333H4.16667V10.5H2.5V16.3333C2.5 17.25 3.25 18 4.16667 18H15.8333C16.75 18 17.5 17.25 17.5 16.3333V10.5H15.8333ZM10.8333 11.0583L12.9917 8.90833L14.1667 10.0833L10 14.25L5.83333 10.0833L7.00833 8.90833L9.16667 11.0583V3H10.8333V11.0583Z"}
      fill={"currentColor"}
    />
  </svg>
));
DownloadSvg.displayName = "DownloadSvg";

const DownloadIcon = withProps(Icon)({ svgComponent: DownloadSvg });

export { DownloadIcon };
