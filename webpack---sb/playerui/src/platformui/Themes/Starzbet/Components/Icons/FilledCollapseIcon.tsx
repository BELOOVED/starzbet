import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const FilledCollapseIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"10"}
    height={"7"}
    viewBox={"0 0 10 7"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_1781_166982)"}>
      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={"M5 0.5L10 6.5L0 6.5L5 0.5Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1781_166982"}>
        <rect
          width={"10"}
          height={"6"}
          fill={"white"}
          transform={"translate(10 6.5) rotate(180)"}
        />
      </clipPath>
    </defs>
  </svg>
));
FilledCollapseIconSvg.displayName = "FilledCollapseIconSvg";

const FilledCollapseIcon = withProps(Icon)({
  svgComponent: FilledCollapseIconSvg,
  width: 10,
  height: 7,
});

export { FilledCollapseIcon };
