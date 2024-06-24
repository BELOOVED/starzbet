import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const VirtualLandingIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_704_34641)"}>
      <path
        d={"M8.0239 11.4996L0.279302 14.3133C-0.0977168 12.1011 -0.154127 9.95457 0.494945 7.85737H9.28491V9.54456C9.28491 10.4032 8.77508 11.176 8.0239 11.4996Z"}
        fill={"currentColor"}
      />

      <path
        d={"M19.1545 13.5604C19.0888 13.7661 18.9332 13.9318 18.7318 14.009L3.36686 19.952C3.09409 20.057 2.78633 19.9863 2.58711 19.7734C1.63029 18.7477 0.983356 17.2862 0.575633 15.7247L8.54944 12.8275C9.86401 12.2639 10.713 10.9753 10.713 9.54456V7.14306C10.713 6.74877 10.3931 6.42876 9.99896 6.42876H1.05976C2.84489 2.63865 6.71147 0 11.1964 0C14.2897 0 16.8489 1.17218 18.4026 3.3001C19.6808 5.05086 20.849 8.25238 19.1545 13.5604Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_704_34641"}>
        <rect width={"20"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
VirtualLandingIconSvg.displayName = "VirtualLandingIconSvg";

const VirtualLandingIcon = withProps(Icon)({ svgComponent: VirtualLandingIconSvg });

export { VirtualLandingIcon };
