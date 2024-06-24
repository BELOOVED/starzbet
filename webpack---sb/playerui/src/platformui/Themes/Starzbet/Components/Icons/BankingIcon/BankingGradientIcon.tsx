import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const BankingGradientIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_2476_20519)"}>
      <path
        d={"M10.2857 16V12.5714H0V9.14286H16C14.0914 11.4286 12.1943 13.7143 10.2857 16ZM16 6.85714H0C1.90857 4.57143 3.80571 2.28571 5.71429 0V3.42857H16V6.85714Z"}
        fill={"url(#paint0_linear_2476_20519)"}
      />
    </g>

    <defs>
      <linearGradient
        id={"paint0_linear_2476_20519"}
        x1={"0"}
        y1={"8"}
        x2={"16"}
        y2={"8"}
        gradientUnits={"userSpaceOnUse"}
      >
        <stop stopColor={"#4891FF"} />

        <stop offset={"1"} stopColor={"#7949FF"} />
      </linearGradient>

      <clipPath id={"clip0_2476_20519"}>
        <rect width={"16"} height={"16"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
BankingGradientIconSvg.displayName = "BankingGradientIconSvg";

const BankingGradientIcon = withProps(Icon)({ svgComponent: BankingGradientIconSvg });

export { BankingGradientIcon };
