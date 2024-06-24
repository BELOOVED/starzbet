import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const InfoIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M11 9H13V7H11V9ZM12 20C7.59003 20 4.00003 16.41 4.00003 12C4.00003 7.59 7.59003 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38645 2.25866 8.17319 2.7612C6.95994 3.26375 5.85755 4.00035 4.92896 4.92893C3.0536 6.8043 2.00003 9.34784 2.00003 12C2.00003 14.6522 3.0536 17.1957 4.92896 19.0711C5.85755 19.9997 6.95994 20.7362 8.17319 21.2388C9.38645 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9465 17.1957 22 14.6522 22 12C22 10.6868 21.7414 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8269 2.7612C14.6136 2.25866 13.3132 2 12 2ZM11 17H13V11H11V17Z"}
      fill={"currentColor"}
    />
  </svg>
));
InfoIconSvg.displayName = "InfoIconSvg";

const InfoIcon = withProps(Icon)({ svgComponent: InfoIconSvg });

export { InfoIcon };
