// @ts-nocheck
import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const RequestSuccessIconSvg = memo(() => (
  <svg
    width={"30"}
    height={"30"}
    viewBox={"0 0 30 30"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M15 0C6.71572 0 0 6.71572 0 15C0 23.2842 6.71572 29.9999 15 29.9999C23.2842 29.9999 29.9999 23.2842 29.9999 15C29.9911 6.71942 23.2806 0.00885184 15 0ZM23.2575 10.4003L12.5432 21.1146C12.1248 21.5329 11.4466 21.5329 11.0282 21.1146L6.74246 16.8289C6.31682 16.4178 6.30502 15.7396 6.71609 15.3139C7.12717 14.8883 7.80544 14.8765 8.23108 15.2876C8.23999 15.2962 8.24878 15.3049 8.25744 15.3139L11.7857 18.8422L21.7425 8.88536C22.1681 8.47428 22.8464 8.48608 23.2575 8.91166C23.6585 9.32688 23.6585 9.98512 23.2575 10.4003Z"}
      fill={"currentColor"}
    />
  </svg>
));
RequestSuccessIconSvg.displayName = "RequestSuccessIconSvg";

const RequestSuccessIcon = withProps(Icon)({ svgComponent: RequestSuccessIconSvg, size: "l" });

export { RequestSuccessIcon };
