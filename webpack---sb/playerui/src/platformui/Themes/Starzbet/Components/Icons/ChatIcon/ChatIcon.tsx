import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const ChatIconSvg = memo(() => (
  <svg
    width={"35"}
    height={"28"}
    viewBox={"0 0 35 28"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1775_148867)"}>
      <path d={"M31.5 7H24.5V8.75H31.5C32.4647 8.75 33.25 9.53531 33.25 10.5V21C33.25 21.9647 32.4647 22.75 31.5 22.75H28V25.4609L23.2094 22.75H17.5C16.5353 22.75 15.75 21.9647 15.75 21V19.25L14 19.2498V20.9987C14 22.9264 15.5723 24.4495 17.4508 24.4495L22.75 24.5L28.7055 27.8704C28.8258 27.9617 28.9625 28 29.0938 28C29.4383 28 29.75 27.732 29.75 27.3438V24.4984H31.5C33.4277 24.4984 35 22.9261 35 21.0476V10.4508C35 8.56953 33.4305 7 31.5 7ZM22.75 14V3.45078C22.75 1.57227 21.1805 0 19.25 0H3.5C1.57227 0 0 1.57227 0 3.45078V13.9508C0 15.9305 1.57227 17.5 3.5 17.5L5.25 17.5006V20.3438C5.25 20.732 5.56719 21 5.90625 21C6.03613 21 6.17285 20.959 6.2959 20.8701L12.25 17.5L19.25 17.4959C21.1805 17.4945 22.75 15.9305 22.75 14ZM11.7906 15.75L7 18.4625V15.75H3.5C2.53531 15.75 1.75 14.9625 1.75 14V3.5C1.75 2.53531 2.53531 1.75 3.5 1.75H19.25C20.2147 1.75 21 2.53531 21 3.5V14C21 14.9647 20.2147 15.75 19.25 15.75H11.7906Z"} fill={"currentColor"} />
    </g>

    <defs>
      <clipPath id={"clip0_1775_148867"}>
        <rect width={"35"} height={"28"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>

));
ChatIconSvg.displayName = "ChatIconSvg";

const ChatIcon = withProps(Icon)({ svgComponent: ChatIconSvg });

export { ChatIcon };
