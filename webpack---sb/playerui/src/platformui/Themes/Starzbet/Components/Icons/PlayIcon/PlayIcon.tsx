import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const PlayIconSvg = memo(() => (
  <svg
    width={"32"}
    height={"32"}
    viewBox={"0 0 32 32"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M16 0C7.16356 0 0 7.16344 0 16C0 24.8366 7.16356 32 16 32C24.8364 32 32 24.8366 32 16C32 7.16344 24.8364 0 16 0ZM21.53 16.8481L13.53 21.8481C13.3681 21.9492 13.1841 22 13 22C12.8333 22 12.6663 21.9585 12.5151 21.8745C12.1973 21.6982 12 21.3638 12 21V11C12 10.6362 12.1973 10.3018 12.5151 10.1255C12.833 9.94825 13.2217 9.959 13.53 10.1519L21.53 15.1519C21.8223 15.335 22 15.6553 22 16C22 16.3447 21.8223 16.6651 21.53 16.8481Z"}
      fill={"currentColor"}
    />
  </svg>
));
PlayIconSvg.displayName = "PlayIconSvg";

const PlayIcon = withProps(Icon)({ svgComponent: PlayIconSvg });

export { PlayIcon };
