import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ShareIconSvg = memo(() => (
  <svg
    width={"14"}
    height={"14"}
    viewBox={"0 0 14 14"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M6.69102 0.128188L2.75352 4.06569C2.58262 4.23659 2.58262 4.51358 2.75352 4.6842C2.92441 4.85483 3.20141 4.8551 3.37203 4.6842L6.5625 1.49379V9.1875C6.5625 9.42933 6.75817 9.625 7 9.625C7.24183 9.625 7.4375 9.42933 7.4375 9.1875V1.49379L10.6285 4.6848C10.7994 4.8557 11.0764 4.8557 11.247 4.6848C11.4177 4.51391 11.4179 4.23691 11.247 4.06629L7.30953 0.128789C7.22422 0.0427109 7.11211 0 7 0C6.88789 0 6.77578 0.0427109 6.69102 0.128188ZM12.25 9.1875V11.8125C12.25 12.5363 11.6613 13.125 10.9375 13.125H3.0625C2.33871 13.125 1.75 12.5371 1.75 11.8125V9.1875C1.75 8.94687 1.55422 8.75 1.3125 8.75C1.07078 8.75 0.875 8.94687 0.875 9.1875V11.8125C0.875 13.0184 1.85609 14 3.0625 14H10.9375C12.1442 14 13.125 13.0189 13.125 11.8125V9.1875C13.125 8.94567 12.9293 8.75 12.6875 8.75C12.4457 8.75 12.25 8.94687 12.25 9.1875Z"}
      fill={"currentColor"}
    />
  </svg>

));
ShareIconSvg.displayName = "ShareIconSvg";

const ShareIcon = withProps(Icon)({ svgComponent: ShareIconSvg });

export { ShareIcon };