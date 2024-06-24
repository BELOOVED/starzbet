import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const HelpIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M20.5139 3.54329C15.8444 -1.15816 8.2475 -1.18481 3.54376 3.48619C-1.15921 8.15642 -1.18357 15.7534 3.48514 20.4563C8.15613 25.1585 15.7531 25.1844 20.4568 20.5142C25.159 15.844 25.1841 8.24702 20.5139 3.54329ZM17.1981 2.98673L14.6529 5.51447C12.9718 4.82772 11.0775 4.82087 9.39184 5.4962L6.86409 2.95094C10.0626 1.13813 14.0118 1.15107 17.1981 2.98673ZM5.4982 14.6083L2.95294 17.1352C1.1386 13.9367 1.15231 9.98751 2.98873 6.80119L5.51723 9.34644C4.82895 11.0268 4.82286 12.9218 5.4982 14.6083ZM6.80242 21.0129L9.34844 18.4851C11.0288 19.1711 12.9238 19.1788 14.6087 18.5027L17.1365 21.0487C13.9387 22.8615 9.98799 22.8486 6.80242 21.0129ZM15.8185 15.8455C13.6981 17.9514 10.2598 17.9392 8.15309 15.8188C6.04714 13.6984 6.05933 10.2601 8.1805 8.15414C10.3017 6.04819 13.7393 6.05961 15.8452 8.18002C17.9519 10.3004 17.9397 13.7388 15.8185 15.8455ZM18.4833 14.6524C19.1701 12.9713 19.1777 11.077 18.5016 9.39136L21.0469 6.86362C22.8604 10.0614 22.8475 14.0113 21.0111 17.1977L18.4833 14.6524Z"} fill={"white"} />
  </svg>

));
HelpIconSvg.displayName = "HelpIconSvg";

const HelpIcon = withProps(Icon)({ svgComponent: HelpIconSvg });

export { HelpIcon };