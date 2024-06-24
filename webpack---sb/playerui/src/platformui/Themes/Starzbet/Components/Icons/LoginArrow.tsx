import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const LoginArrowSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"8"}
    viewBox={"0 0 16 8"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_2420_264736)"}>
      <path
        d={"M15.7071 4.62257L12.1641 7.74211C11.9688 7.91404 11.7129 8 11.4569 8C11.201 8 10.9451 7.91404 10.7498 7.74211C10.3593 7.39826 10.3593 6.84079 10.7498 6.49694L12.5858 4.88046H1C0.447719 4.88046 0 4.48626 0 4C0 3.51373 0.447719 3.11953 1 3.11953H12.5858L10.7498 1.50306C10.3593 1.15921 10.3593 0.601735 10.7498 0.257887C11.1404 -0.0859622 11.7735 -0.0859622 12.1641 0.257887L15.7071 3.37743C16.0976 3.72125 16.0976 4.27875 15.7071 4.62257Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_2420_264736"}>
        <rect width={"16"} height={"8"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
LoginArrowSvg.displayName = "LoginArrowSvg";

const LoginArrow = withProps(Icon)({ svgComponent: LoginArrowSvg, color: "text" });

export { LoginArrow };
