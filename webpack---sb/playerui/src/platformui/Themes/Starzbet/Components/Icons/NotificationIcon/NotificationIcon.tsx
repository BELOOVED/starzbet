import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const NotificationIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"20"}
    viewBox={"0 0 16 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_5259_98815)"}>
      <path
        d={"M10.7707 17.373C10.7707 18.368 10.2426 19.1295 9.38493 19.6273C8.52753 20.1248 7.47106 20.1248 6.61526 19.6273C5.75733 19.1295 5.22949 18.368 5.22949 17.373"}
        fill={"currentColor"}
      />

      <path
        d={"M7.99973 0C8.75546 0 9.36415 0.468002 9.36415 1.1877C9.36415 1.64069 9.3799 1.97869 9.6633 2.06527C12.0732 2.79622 13.6186 4.50955 13.6186 6.73457V10.4743C13.6186 12.1876 14.3164 12.5345 15.1946 13.1898C16.4664 14.1374 16.1761 16.1104 14.7167 16.1091H1.28331C-0.176112 16.1104 -0.466448 14.1374 0.805374 13.1898C1.68252 12.5345 2.38141 12.1876 2.38141 10.4743V6.73457C2.38141 4.50955 3.92675 2.79622 6.33671 2.06527C6.6193 1.97869 6.63585 1.64069 6.63585 1.1877C6.63611 0.468002 7.24507 0 7.99973 0Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_5259_98815"}>
        <rect width={"16"} height={"20"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>

));
NotificationIconSvg.displayName = "NotificationIconSvg";

const NotificationIcon = withProps(Icon)({ svgComponent: NotificationIconSvg });

export { NotificationIcon };
