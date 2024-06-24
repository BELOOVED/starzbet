import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const CricketIconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_702_24861)"}>
      <path
        d={"M2.48637 20L6.52055 15.9659C6.87752 16.1772 7.28584 16.2902 7.71157 16.2902C8.3377 16.2902 8.92639 16.0464 9.36913 15.6037L19.3146 5.65821C20.2286 4.74423 20.2286 3.25709 19.3146 2.34307L17.657 0.685475C16.743 -0.228472 15.2558 -0.228511 14.3419 0.685475L4.39639 10.6309C3.62547 11.4019 3.50483 12.5806 4.03445 13.4792L0 17.5137L2.48637 20ZM5.22516 11.4597L15.1706 1.51429C15.6276 1.0573 16.3712 1.0573 16.8282 1.51429L18.4858 3.17184C18.9427 3.62884 18.9427 4.3724 18.4858 4.8294L8.54031 14.7748C8.31894 14.9962 8.0246 15.1181 7.71153 15.1181C7.51451 15.1181 7.32494 15.0698 7.15624 14.9788L7.80936 13.0195L13.9274 6.9014L13.0986 6.07262L6.98059 12.1906L5.02181 12.8436C4.78345 12.3998 4.85112 11.8338 5.22516 11.4597ZM5.12734 14.0439L6.37052 13.6295L5.95615 14.8727L2.48637 18.3424L1.65755 17.5137L5.12734 14.0439Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_702_24861"}>
        <rect width={"20.0001"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
CricketIconSvg.displayName = "CricketIconSvg";

const CricketIcon = withProps(Icon)({ svgComponent: CricketIconSvg });

export { CricketIcon };
