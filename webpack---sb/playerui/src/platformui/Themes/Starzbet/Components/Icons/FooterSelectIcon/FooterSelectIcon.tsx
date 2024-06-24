import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const FooterSelectIconSvg = memo(() => (
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
      d={"M8 1C8 0.447715 8.44772 0 9 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H9C8.44772 2 8 1.55228 8 1ZM0 8C0 7.44772 0.447715 7 1 7H15C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9H1C0.447715 9 0 8.55228 0 8ZM5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44771 16 5 16H15C15.5523 16 16 15.5523 16 15C16 14.4477 15.5523 14 15 14H5Z"}
      fill={"currentColor"}
    />
  </svg>

));
FooterSelectIconSvg.displayName = "FooterSelectIconSvg";

const FooterSelectIcon = withProps(Icon)({ svgComponent: FooterSelectIconSvg });

export { FooterSelectIcon };
