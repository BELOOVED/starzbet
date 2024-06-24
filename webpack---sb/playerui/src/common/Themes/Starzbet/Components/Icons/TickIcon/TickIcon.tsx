import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../Components/Icon/Icon";

const TickIconSvg = memo(() => (
  <svg
    width={"60"}
    height={"60"}
    viewBox={"0 0 60 60"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M27.5742 38.8242C26.8477 39.5625 25.6523 39.5625 24.9258 38.8242L17.4258 31.3242C16.6875 30.5977 16.6875 29.4023 17.4258 28.6758C18.1523 27.9375 19.3477 27.9375 20.0742 28.6758L26.25 34.8516L39.9258 21.1758C40.6523 20.4375 41.8477 20.4375 42.5742 21.1758C43.3125 21.9023 43.3125 23.0977 42.5742 23.8242L27.5742 38.8242ZM60 30C60 46.5703 46.5703 60 30 60C13.4297 60 0 46.5703 0 30C0 13.4297 13.4297 0 30 0C46.5703 0 60 13.4297 60 30ZM30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75Z"}
      fill={"#19BA46"}
    />
  </svg>

));
TickIconSvg.displayName = "TickIconSvg";

const TickIcon = withProps(Icon)({ svgComponent: TickIconSvg });

export { TickIcon };
