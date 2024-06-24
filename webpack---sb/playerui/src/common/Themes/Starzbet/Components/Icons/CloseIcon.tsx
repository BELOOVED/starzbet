import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../Components/Icon/Icon";

const CloseSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"12"}
    height={"12"}
    viewBox={"0 0 12 12"}
    fill={"currentColor"}
  >
    <g clipPath={"url(#clip0_1794_210862)"}>
      <path
        d={"M7.98 6.00038L11.6924 2.28802C12.1025 1.87784 12.1025 1.21284 11.6924 0.803307L11.1975 0.308402C10.7872 -0.101903 10.1222 -0.101903 9.71262 0.308402L6.00038 4.02064L2.28802 0.307633C1.87784 -0.102544 1.21284 -0.102544 0.803307 0.307633L0.307633 0.802538C-0.102544 1.21284 -0.102544 1.87784 0.307633 2.28738L4.02064 6.00038L0.308402 9.71262C-0.101903 10.1229 -0.101903 10.7879 0.308402 11.1975L0.803307 11.6924C1.21348 12.1025 1.87848 12.1025 2.28802 11.6924L6.00038 7.98L9.71262 11.6924C10.1229 12.1025 10.7879 12.1025 11.1975 11.6924L11.6924 11.1975C12.1025 10.7872 12.1025 10.1222 11.6924 9.71262L7.98 6.00038Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1794_210862"}>
        <rect width={"12"} height={"12"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
CloseSvg.displayName = "CloseSvg";

const CloseIcon = withProps(Icon)({ svgComponent: CloseSvg });

export { CloseIcon };
