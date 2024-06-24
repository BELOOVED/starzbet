import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const FacebookIconSvg = memo(() => (
  <svg
    width={"12"}
    height={"21"}
    viewBox={"0 0 12 21"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M11.3619 6.97213H7.52999V5.25408C7.50449 5.00036 7.58787 4.74774 7.75941 4.55905C7.93094 4.37036 8.1745 4.26335 8.42949 4.26463H11.128V0.666626H7.23316C3.69812 0.666626 3.03249 3.36513 3.03249 5.0382V6.97213H0.333984V10.5701H3.03249V20.9144H7.52999V10.5701H10.9931L11.3619 6.97213Z"}
      fill={"currentColor"}
    />
  </svg>
));
FacebookIconSvg.displayName = "FacebookIconSvg";

const FacebookIcon = withProps(Icon)({ svgComponent: FacebookIconSvg });

export { FacebookIcon };
