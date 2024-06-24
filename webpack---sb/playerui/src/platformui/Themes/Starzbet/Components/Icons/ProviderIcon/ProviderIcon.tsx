import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const UnionIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M1 0C0.447715 0 0 0.447715 0 1V5C0 5.55228 0.447715 6 1 6H5C5.55228 6 6 5.55228 6 5V1C6 0.447715 5.55228 0 5 0H1ZM1 10C0.447715 10 0 10.4477 0 11V15C0 15.5523 0.447715 16 1 16H5C5.55228 16 6 15.5523 6 15V11C6 10.4477 5.55228 10 5 10H1ZM10 1C10 0.447715 10.4477 0 11 0H15C15.5523 0 16 0.447715 16 1V5C16 5.55228 15.5523 6 15 6H11C10.4477 6 10 5.55228 10 5V1ZM11 10C10.4477 10 10 10.4477 10 11V15C10 15.5523 10.4477 16 11 16H15C15.5523 16 16 15.5523 16 15V11C16 10.4477 15.5523 10 15 10H11Z"}
      fill={"currentColor"}
    />
  </svg>
));
UnionIconSvg.displayName = "UnionIconSvg";

const ProviderIcon = withProps(Icon)({ svgComponent: UnionIconSvg });

export { ProviderIcon };
