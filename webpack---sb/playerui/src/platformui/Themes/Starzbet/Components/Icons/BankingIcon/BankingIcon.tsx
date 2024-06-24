import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const BankingIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_117_5324)"}>
      <path
        d={"M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_117_5324"}>
        <rect width={"16"} height={"16"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
BankingIconSvg.displayName = "BankingIconSvg";

const BankingIcon = withProps(Icon)({ svgComponent: BankingIconSvg });

export { BankingIcon };
