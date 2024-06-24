import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const ErrorIconSvg = memo(() => (
  <svg
    width={"60"}
    height={"60"}
    viewBox={"0 0 60 60"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M21.1758 21.1758C21.9023 20.4375 23.0977 20.4375 23.8242 21.1758L30 27.3516L36.1758 21.1758C36.9023 20.4375 38.0977 20.4375 38.8242 21.1758C39.5625 21.9023 39.5625 23.0977 38.8242 23.8242L32.6484 30L38.8242 36.1758C39.5625 36.9023 39.5625 38.0977 38.8242 38.8242C38.0977 39.5625 36.9023 39.5625 36.1758 38.8242L30 32.6484L23.8242 38.8242C23.0977 39.5625 21.9023 39.5625 21.1758 38.8242C20.4375 38.0977 20.4375 36.9023 21.1758 36.1758L27.3516 30L21.1758 23.8242C20.4375 23.0977 20.4375 21.9023 21.1758 21.1758ZM60 30C60 46.5703 46.5703 60 30 60C13.4297 60 0 46.5703 0 30C0 13.4297 13.4297 0 30 0C46.5703 0 60 13.4297 60 30ZM30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75Z"}
      fill={"#FF0248"}
    />
  </svg>

));
ErrorIconSvg.displayName = "ErrorIconSvg";

const ErrorIcon = withProps(Icon)({ svgComponent: ErrorIconSvg });

export { ErrorIcon };