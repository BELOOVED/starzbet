import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const PlusCircleIconSvg = memo(() => (
  <svg
    width={"176"}
    height={"176"}
    viewBox={"0 0 176 176"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M88 161.069C128.355 161.069 161.069 128.355 161.069 88C161.069 47.6449 128.355 14.9307 88 14.9307C47.6449 14.9307 14.9307 47.6449 14.9307 88C14.9307 128.355 47.6449 161.069 88 161.069Z"}
      stroke={"currentColor"}
      strokeWidth={"5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M88 58.7715V117.227"}
      stroke={"currentColor"}
      strokeWidth={"5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M58.7715 88H117.227"}
      stroke={"currentColor"}
      strokeWidth={"5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>
));
PlusCircleIconSvg.displayName = "PlusCircleIconSvg";

const PlusCircleIcon = withProps(Icon)({ svgComponent: PlusCircleIconSvg });

export { PlusCircleIcon };
