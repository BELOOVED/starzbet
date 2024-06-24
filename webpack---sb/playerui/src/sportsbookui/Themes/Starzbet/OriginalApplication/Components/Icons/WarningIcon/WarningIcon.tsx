import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const WarningIconSvg = memo(() => (
  <svg
    width={"60"}
    height={"60"}
    viewBox={"0 0 60 60"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M30 0C13.4297 0 0 13.4297 0 30C0 46.5703 13.4297 60 30 60C46.5703 60 60 46.5703 60 30C60 13.4297 46.5703 0 30 0ZM30 56.25C15.5273 56.25 3.75 44.4727 3.75 30C3.75 15.5273 15.5273 3.75 30 3.75C44.4727 3.75 56.25 15.5273 56.25 30C56.25 44.4727 44.4727 56.25 30 56.25ZM30 35.625C31.0364 35.625 31.875 34.7864 31.875 33.75V15C31.875 13.9636 31.0364 13.125 30 13.125C28.9636 13.125 28.125 13.9688 28.125 15V33.75C28.125 34.7812 28.9688 35.625 30 35.625ZM30 40.3125C28.4473 40.3125 27.1875 41.5723 27.1875 43.125C27.1875 44.6777 28.4473 45.9375 30 45.9375C31.5527 45.9375 32.8125 44.6777 32.8125 43.125C32.8125 41.5723 31.5586 40.3125 30 40.3125Z"}
      fill={"currentColor"}
    />
  </svg>
));
WarningIconSvg.displayName = "WarningIconSvg";

const WarningIcon = withProps(Icon)({ svgComponent: WarningIconSvg });

export { WarningIcon };
