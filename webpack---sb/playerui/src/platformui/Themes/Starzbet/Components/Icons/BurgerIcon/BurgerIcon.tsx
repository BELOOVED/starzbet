import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const BurgerIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"14"}
    height={"14"}
    viewBox={"0 0 14 14"}
    fill={"none"}
  >
    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M0 0H14V2H0V0ZM6 14V12H14V14H6ZM14 6H10V8H14V6Z"}
      fill={"currentColor"}
    />
  </svg>
));
BurgerIconSvg.displayName = "BurgerIconSvg";

const DesktopBurgerIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M0 0H16V2H0V0ZM8 7H16V9H8V7ZM16 16V14H0V16H16Z"}
      fill={"currentColor"}
    />
  </svg>
));
DesktopBurgerIconSvg.displayName = "DesktopBurgerIconSvg";

const BurgerIcon = withProps(Icon)({ svgComponent: BurgerIconSvg, color: "darkText" });
const DesktopBurgerIcon = withProps(Icon)({ svgComponent: DesktopBurgerIconSvg, color: "text" });

export { BurgerIcon, DesktopBurgerIcon };
