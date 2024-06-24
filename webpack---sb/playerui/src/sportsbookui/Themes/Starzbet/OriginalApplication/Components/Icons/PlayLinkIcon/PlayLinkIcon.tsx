import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const PlayLinkIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M5.3335 4.54651V11.4532C5.3335 11.9798 5.9135 12.2998 6.36016 12.0132L11.7868 8.55984C12.2002 8.29984 12.2002 7.69984 11.7868 7.43318L6.36016 3.98651C5.9135 3.69984 5.3335 4.01984 5.3335 4.54651Z"}
      fill={"currentColor"}
    />
  </svg>
));
PlayLinkIconSvg.displayName = "PlayLinkIconSvg";

const PlayLinkIcon = withProps(Icon)({ svgComponent: PlayLinkIconSvg });

export { PlayLinkIcon };
