import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../Components/Icon/Icon";

const CloseIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"8"}
    height={"8"}
    viewBox={"0 0 8 8"}
    fill={"none"}
  >
    <path
      d={"M5.32 4.00026L7.79491 1.52535C8.06836 1.2519 8.06836 0.808563 7.79491 0.535538L7.46497 0.205602C7.19144 -0.0679357 6.7481 -0.0679357 6.47508 0.205602L4.00026 2.68042L1.52535 0.205089C1.2519 -0.0683629 0.808563 -0.0683629 0.535538 0.205089L0.205089 0.535025C-0.0683629 0.808563 -0.0683629 1.2519 0.205089 1.52492L2.68042 4.00026L0.205602 6.47508C-0.0679357 6.74862 -0.0679357 7.19195 0.205602 7.46497L0.535538 7.79491C0.80899 8.06836 1.25232 8.06836 1.52535 7.79491L4.00026 5.32L6.47508 7.79491C6.74862 8.06836 7.19195 8.06836 7.46497 7.79491L7.79491 7.46497C8.06836 7.19144 8.06836 6.7481 7.79491 6.47508L5.32 4.00026Z"}
      fill={"currentColor"}
    />
  </svg>

));
CloseIconSvg.displayName = "CloseIconSvg";

const CloseDefaultIcon = withProps(Icon)({ svgComponent: CloseIconSvg });
const CloseIcon = withProps(CloseDefaultIcon)({ size: "m", color: "text" });

export { CloseIcon, CloseDefaultIcon };
