import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const CrownIconV1Svg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_6704_660094)"}>
      <path
        d={"M19.2853 5.71456L14.9996 10.0003L9.99958 2.85742L4.99958 10.0003L0.713867 5.71456V15.0003C0.713867 15.5686 0.939632 16.1136 1.3415 16.5155C1.74336 16.9174 2.2884 17.1431 2.85672 17.1431H17.1424C17.7108 17.1431 18.2558 16.9174 18.6577 16.5155C19.0595 16.1136 19.2853 15.5686 19.2853 15.0003V5.71456Z"}
        stroke={"currentColor"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_6704_660094"}>
        <rect width={"20"} height={"20"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>

));
CrownIconV1Svg.displayName = "CrownIconV1Svg";

const CrownIconV2Svg = memo(() => (
  <svg
    width={"20"}
    height={"16"}
    viewBox={"0 0 20 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M1.7733 11.1104C1.39311 8.63916 1.01292 6.16797 0.632733 3.69672C0.548421 3.14891 1.17173 2.77528 1.61511 3.10784C2.79961 3.99622 3.98405 4.88453 5.16855 5.77291C5.55855 6.06541 6.11417 5.97022 6.38455 5.56459L9.34286 1.12709C9.65548 0.658156 10.3445 0.658156 10.6571 1.12709L13.6154 5.56459C13.8858 5.97022 14.4414 6.06534 14.8314 5.77291C16.0159 4.88453 17.2004 3.99622 18.3849 3.10784C18.8282 2.77528 19.4515 3.14891 19.3673 3.69672C18.9871 6.16797 18.6069 8.63916 18.2267 11.1104H1.7733Z"}
      fill={"currentColor"}
    />

    <path
      d={"M17.369 15.2246H2.63125C2.1575 15.2246 1.77344 14.8405 1.77344 14.3668V12.4824H18.2269V14.3668C18.2268 14.8405 17.8427 15.2246 17.369 15.2246Z"}
      fill={"currentColor"}
    />
  </svg>

));
CrownIconV2Svg.displayName = "CrownIconV2Svg";

const CrownIconV1 = withProps(Icon)({ svgComponent: CrownIconV1Svg });

const CrownIconV2 = withProps(Icon)({ svgComponent: CrownIconV2Svg });

export { CrownIconV1, CrownIconV2 };
