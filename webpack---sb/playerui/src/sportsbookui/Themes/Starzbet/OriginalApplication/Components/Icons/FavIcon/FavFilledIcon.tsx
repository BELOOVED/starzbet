import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const FavFilledIconSvg = memo(() => (
  <svg
    width={"14"}
    height={"13"}
    viewBox={"0 0 14 13"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M6.99967 10.5135L11.1197 13.0002L10.0263 8.3135L13.6663 5.16016L8.87301 4.7535L6.99967 0.333496L5.12634 4.7535L0.333008 5.16016L3.97301 8.3135L2.87967 13.0002L6.99967 10.5135Z"}
      fill={"currentColor"}
    />
  </svg>
));
FavFilledIconSvg.displayName = "FavFilledIconSvg";

const FavFilledIcon = withProps(Icon)({ svgComponent: FavFilledIconSvg });

export { FavFilledIcon };
