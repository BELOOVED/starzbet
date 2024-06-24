import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const SoccerIconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_702_24796)"}>
      <path
        d={"M10 0C4.48559 0 0 4.48559 0 10C0 15.5144 4.48559 20 10 20C15.5144 20 20 15.5144 20 10C20 4.48559 15.5144 0 10 0ZM10.4 3.19602L12.9872 1.30801C14.7376 1.91121 16.2472 3.02723 17.3408 4.47762L16.3472 7.51441L13.1088 8.56481L10.4 6.5968V3.19602ZM7.01281 1.30801L9.6 3.19602V6.5968L6.89121 8.56481L3.65281 7.51441L2.65922 4.47762C3.75281 3.02719 5.26238 1.91121 7.01281 1.30801ZM2.47199 15.272C1.45199 13.8192 0.842383 12.0632 0.808789 10.1648L3.40641 8.2752L6.63762 9.32398L7.67684 12.5216L5.67684 15.272H2.47199ZM12.684 18.7984C11.8344 19.0576 10.9336 19.2 10 19.2C9.06641 19.2 8.16559 19.0576 7.31602 18.7984L6.3232 15.7424L8.32641 12.9888H11.6736L13.6768 15.7424L12.684 18.7984ZM14.3232 15.272L12.3232 12.5216L13.3624 9.32398L16.5936 8.2752L19.1912 10.1648C19.1577 12.0632 18.548 13.8192 17.528 15.272H14.3232Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_702_24796"}>
        <rect width={"20"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
SoccerIconSvg.displayName = "SoccerIconSvg";

const WhiteSoccerIconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_702_24796)"}>
      <path
        d={"M10 0C4.48559 0 0 4.48559 0 10C0 15.5144 4.48559 20 10 20C15.5144 20 20 15.5144 20 10C20 4.48559 15.5144 0 10 0ZM10.4 3.19602L12.9872 1.30801C14.7376 1.91121 16.2472 3.02723 17.3408 4.47762L16.3472 7.51441L13.1088 8.56481L10.4 6.5968V3.19602ZM7.01281 1.30801L9.6 3.19602V6.5968L6.89121 8.56481L3.65281 7.51441L2.65922 4.47762C3.75281 3.02719 5.26238 1.91121 7.01281 1.30801ZM2.47199 15.272C1.45199 13.8192 0.842383 12.0632 0.808789 10.1648L3.40641 8.2752L6.63762 9.32398L7.67684 12.5216L5.67684 15.272H2.47199ZM12.684 18.7984C11.8344 19.0576 10.9336 19.2 10 19.2C9.06641 19.2 8.16559 19.0576 7.31602 18.7984L6.3232 15.7424L8.32641 12.9888H11.6736L13.6768 15.7424L12.684 18.7984ZM14.3232 15.272L12.3232 12.5216L13.3624 9.32398L16.5936 8.2752L19.1912 10.1648C19.1577 12.0632 18.548 13.8192 17.528 15.272H14.3232Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_702_24796"}>
        <rect width={"20"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
WhiteSoccerIconSvg.displayName = "WhiteSoccerIconSvg";

const SoccerIcon = withProps(Icon)({ svgComponent: WhiteSoccerIconSvg });
const SoccerIconBottom = withProps(Icon)({ svgComponent: SoccerIconSvg, color: "darkText" });

export { SoccerIcon, SoccerIconBottom };
