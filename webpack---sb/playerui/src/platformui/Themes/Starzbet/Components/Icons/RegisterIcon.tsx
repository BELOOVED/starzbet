import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const RegisterIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_626_20)"}>
      <path
        d={"M7.99987 0C3.58172 0 0 3.58178 0 7.99992C0 12.4179 3.58167 16 7.99976 16C12.4178 16 15.9999 12.4179 15.9999 7.99992C15.9999 3.58178 12.4179 0 7.99987 0ZM11.3748 8.87996H8.80045V11.5716C8.80029 12.023 8.43442 12.3888 7.98296 12.3888C7.53134 12.3888 7.16547 12.023 7.16547 11.5714V8.87996H4.65963C4.20812 8.87981 3.84242 8.51394 3.84215 8.06248C3.84215 7.61112 4.20817 7.2451 4.65963 7.24499L7.16542 7.24515V4.85632C7.16542 4.40481 7.53144 4.03884 7.9828 4.03884C8.43442 4.03884 8.80044 4.40486 8.80029 4.85632L8.80045 7.24494L11.3746 7.24521C11.8261 7.24494 12.1922 7.61107 12.192 8.06269C12.1922 8.51421 11.8261 8.87996 11.3748 8.87996Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_626_20"}>
        <rect width={"15.9999"} height={"16"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
RegisterIconSvg.displayName = "RegisterIconSvg";

const RegisterIcon = withProps(Icon)({ svgComponent: RegisterIconSvg });

export { RegisterIcon };
