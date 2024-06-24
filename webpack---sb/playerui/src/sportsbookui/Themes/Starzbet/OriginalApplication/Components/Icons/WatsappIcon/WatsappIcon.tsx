import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const WatsappIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M20.1597 6.84024C17.2797 2.40024 11.3997 1.08024 6.83974 3.84024C2.39974 6.60024 0.959736 12.6002 3.83974 17.0402L4.07974 17.4002L3.11974 21.0002L6.71974 20.0402L7.07974 20.2802C8.63974 21.1202 10.3197 21.6002 11.9997 21.6002C13.7997 21.6002 15.5997 21.1202 17.1597 20.1602C21.5997 17.2802 22.9197 11.4002 20.1597 6.84024ZM17.6397 16.0802C17.1597 16.8002 16.5597 17.2802 15.7197 17.4002C15.2397 17.4002 14.6397 17.6402 12.2397 16.6802C10.1997 15.7202 8.51974 14.1602 7.31974 12.3602C6.59974 11.5202 6.23974 10.4402 6.11974 9.36024C6.11974 8.40024 6.47974 7.56024 7.07974 6.96024C7.31974 6.72024 7.55974 6.60024 7.79974 6.60024H8.39974C8.63974 6.60024 8.87974 6.60024 8.99974 7.08024C9.23974 7.68024 9.83974 9.12024 9.83974 9.24024C9.95974 9.36024 9.95974 9.60024 9.83974 9.72024C9.95974 9.96024 9.83974 10.2002 9.71974 10.3202C9.59974 10.4402 9.47974 10.6802 9.35974 10.8002C9.11974 10.9202 8.99974 11.1602 9.11974 11.4002C9.59974 12.1202 10.1997 12.8402 10.7997 13.4402C11.5197 14.0402 12.2397 14.5202 13.0797 14.8802C13.3197 15.0002 13.5597 15.0002 13.6797 14.7602C13.7997 14.5202 14.3997 13.9202 14.6397 13.6802C14.8797 13.4402 14.9997 13.4402 15.2397 13.5602L17.1597 14.5202C17.3997 14.6402 17.6397 14.7602 17.7597 14.8802C17.8797 15.2402 17.8797 15.7202 17.6397 16.0802Z"}
      fill={"currentColor"}
    />
  </svg>
));
WatsappIconSvg.displayName = "WatsappIconSvg";

const WatsappIcon = withProps(Icon)({ svgComponent: WatsappIconSvg });

export { WatsappIcon };