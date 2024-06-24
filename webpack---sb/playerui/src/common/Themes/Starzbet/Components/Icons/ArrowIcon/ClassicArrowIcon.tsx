import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../Components/Icon/Icon";

const ClassicArrowIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"12"}
    height={"10"}
    viewBox={"0 0 12 10"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_2323_247545)"}>
      <path
        d={"M11.2787 4.18157C11.2296 4.17382 11.1799 4.17025 11.1302 4.17088L2.66447 4.17088L2.84906 4.08745C3.0295 4.00446 3.19365 3.89152 3.33417 3.75373L5.70818 1.44691C6.02084 1.15689 6.07338 0.690336 5.83268 0.341471C5.55254 -0.0302844 5.0153 -0.111002 4.63269 0.161212C4.60178 0.183216 4.5724 0.207202 4.54479 0.233013L0.251816 4.40448C-0.0836801 4.73011 -0.0839753 5.25835 0.251145 5.58435C0.251359 5.58456 0.251601 5.58479 0.251815 5.585L4.54479 9.75647C4.88055 10.0818 5.42417 10.0811 5.75903 9.75483C5.78537 9.72915 5.80998 9.70182 5.83268 9.67304C6.07338 9.32417 6.02084 8.85762 5.70818 8.5676L3.33846 6.25661C3.21249 6.13407 3.06766 6.03132 2.90916 5.95209L2.65159 5.83946L11.083 5.83946C11.5216 5.85529 11.9064 5.55758 11.9888 5.13866C12.0647 4.68384 11.7468 4.25535 11.2787 4.18157Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_2323_247545"}>
        <rect width={"12"} height={"10"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
ClassicArrowIconSvg.displayName = "ClassicArrowIconSvg";

const ClassicArrowIcon = withProps(Icon)({ svgComponent: ClassicArrowIconSvg, color: "darkText" });
const ClassicArrowIconMobile = withProps(Icon)({ svgComponent: ClassicArrowIconSvg, color: "text", size: "xs" });

export { ClassicArrowIcon, ClassicArrowIconMobile };
