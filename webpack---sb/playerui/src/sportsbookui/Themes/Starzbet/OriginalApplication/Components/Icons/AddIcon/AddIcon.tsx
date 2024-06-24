import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const AddIconSvg = memo(() => (
  <svg
    width={"32"}
    height={"32"}
    viewBox={"0 0 32 32"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1861_226507)"}>
      <path
        d={"M15 22V17H10C9.45 17 9 16.55 9 16C9 15.45 9.45 15 10 15H15V10C15 9.45 15.45 9 16 9C16.55 9 17 9.45 17 10V15H22C22.55 15 23 15.45 23 16C23 16.55 22.55 17 22 17H17V22C17 22.55 16.55 23 16 23C15.45 23 15 22.55 15 22ZM32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16ZM16 2C8.26875 2 2 8.26875 2 16C2 23.7313 8.26875 30 16 30C23.7313 30 30 23.7313 30 16C30 8.26875 23.7313 2 16 2Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1861_226507"}>
        <rect width={"32"} height={"32"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>

));
AddIconSvg.displayName = "AddIconSvg";

const AddIcon = withProps(Icon)({ svgComponent: AddIconSvg });

export { AddIcon };
