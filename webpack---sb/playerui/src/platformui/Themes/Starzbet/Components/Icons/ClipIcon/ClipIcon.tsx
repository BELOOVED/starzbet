import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const ClipIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1819_7129)"}>
      <path
        d={"M12.5 22C9.46 22 7 19.54 7 16.5L7 6C7 3.79 8.79 2 11 2C13.21 2 15 3.79 15 6L15 14.5C15 15.88 13.88 17 12.5 17C11.12 17 10 15.88 10 14.5L10 7L12 7L12 14.59C12 15.14 13 15.14 13 14.59L13 6C13 4.9 12.1 4 11 4C9.9 4 9 4.9 9 6L9 16.5C9 18.43 10.57 20 12.5 20C14.43 20 16 18.43 16 16.5L16 7L18 7L18 16.5C18 19.54 15.54 22 12.5 22Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1819_7129"}>
        <rect
          width={"24"}
          height={"24"}
          fill={"white"}
          transform={"translate(0 24) rotate(-90)"}
        />
      </clipPath>
    </defs>
  </svg>
));
ClipIconSvg.displayName = "ClipIconSvg";

const ClipIcon = withProps(Icon)({ svgComponent: ClipIconSvg });

export { ClipIcon };
