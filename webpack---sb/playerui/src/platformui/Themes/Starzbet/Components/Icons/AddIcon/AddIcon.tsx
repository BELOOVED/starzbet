import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const AddIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_2915)"}>
      <g clipPath={"url(#clip1_1_2915)"}>
        <path
          d={"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"}
          fill={"currentColor"}
        />
      </g>
    </g>

    <defs>
      <clipPath id={"clip0_1_2915"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>

      <clipPath id={"clip1_1_2915"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
AddIconSvg.displayName = "AddIconSvg";

const AddIcon = withProps(Icon)({ svgComponent: AddIconSvg });

export { AddIcon };
