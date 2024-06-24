import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const HomeIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1824_216735)"}>
      <path
        d={"M15.5686 6.95923C15.5683 6.95886 15.5679 6.9585 15.5675 6.95813L9.04079 0.431641C8.76259 0.15332 8.39272 0 7.99928 0C7.60585 0 7.23598 0.153198 6.95766 0.431519L0.434343 6.95471C0.432145 6.95691 0.429948 6.95923 0.427751 6.96143C-0.143538 7.53601 -0.142562 8.46826 0.430558 9.04138C0.692399 9.30334 1.03822 9.45508 1.40798 9.47095C1.42299 9.47241 1.43813 9.47314 1.45339 9.47314H1.71352V14.2762C1.71352 15.2267 2.48683 16 3.43752 16H5.99098C6.24977 16 6.45973 15.7902 6.45973 15.5312V11.7656C6.45973 11.3319 6.81252 10.9791 7.24623 10.9791H8.75234C9.18605 10.9791 9.53883 11.3319 9.53883 11.7656V15.5312C9.53883 15.7902 9.74867 16 10.0076 16H12.5611C13.5117 16 14.2851 15.2267 14.2851 14.2762V9.47314H14.5263C14.9196 9.47314 15.2894 9.31995 15.5679 9.04163C16.1416 8.46753 16.1419 7.53369 15.5686 6.95923Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1824_216735"}>
        <rect width={"15.9984"} height={"16"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
HomeIconSvg.displayName = "HomeIconSvg";

const HomeIcon = withProps(Icon)({ svgComponent: HomeIconSvg, color: "blue" });

const HomeIconButton = withProps(Icon)({ svgComponent: HomeIconSvg, color: "darkText" });

export { HomeIcon, HomeIconButton };
