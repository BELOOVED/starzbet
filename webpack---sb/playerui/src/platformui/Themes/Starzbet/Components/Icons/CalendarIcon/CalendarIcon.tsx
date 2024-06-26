import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const CalendarIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_611_2554)"}>
      <path
        d={"M13.9375 1.25H12.5V0.5C12.5 0.223875 12.2762 0 12 0C11.7238 0 11.5 0.223875 11.5 0.5V1.25H4.5V0.5C4.5 0.223875 4.27616 0 4 0C3.72384 0 3.5 0.223875 3.5 0.5V1.25H2.0625C0.925219 1.25 0 2.17522 0 3.3125V13.9375C0 15.0748 0.925219 16 2.0625 16H13.9375C15.0748 16 16 15.0748 16 13.9375V3.3125C16 2.17522 15.0748 1.25 13.9375 1.25ZM15 13.9375C15 14.5243 14.5243 15 13.9375 15H2.0625C1.47569 15 1 14.5243 1 13.9375V5.65625C1 5.56997 1.06997 5.5 1.15625 5.5H14.8438C14.93 5.5 15 5.56997 15 5.65625V13.9375Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_611_2554"}>
        <rect width={"16"} height={"16"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>

));
CalendarIconSvg.displayName = "CalendarIconSvg";

const CalendarIcon = withProps(Icon)({ svgComponent: CalendarIconSvg });

export { CalendarIcon };
