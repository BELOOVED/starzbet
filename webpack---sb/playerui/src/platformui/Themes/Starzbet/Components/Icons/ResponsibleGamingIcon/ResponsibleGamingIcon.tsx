import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const ResponsibleGamingIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_8_91091)"}>
      <path
        d={"M13.0002 24C9.74022 24 6.81022 22.01 5.60022 18.98L2.57022 11.37C2.26022 10.58 3.00022 9.79 3.81022 10.05L4.60022 10.31C5.16022 10.49 5.62022 10.92 5.84022 11.47L7.25022 15H8.00022V3.25C8.00022 2.56 8.56022 2 9.25022 2C9.94022 2 10.5002 2.56 10.5002 3.25V12H11.5002V1.25C11.5002 0.56 12.0602 0 12.7502 0C13.4402 0 14.0002 0.56 14.0002 1.25V12H15.0002V2.75C15.0002 2.06 15.5602 1.5 16.2502 1.5C16.9402 1.5 17.5002 2.06 17.5002 2.75V12H18.5002V5.75C18.5002 5.06 19.0602 4.5 19.7502 4.5C20.4402 4.5 21.0002 5.06 21.0002 5.75V16C21.0002 20.42 17.4202 24 13.0002 24Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_8_91091"}>
        <rect width={"24"} height={"24"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
ResponsibleGamingIconSvg.displayName = "ResponsibleGamingIconSvg";

const ResponsibleGamingIcon = withProps(Icon)({ svgComponent: ResponsibleGamingIconSvg });

export { ResponsibleGamingIcon };
