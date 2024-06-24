import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const LiveCasinoIconSvg = memo(() => (
  <svg
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M15.4762 8.36245L13.9083 1.28404C13.8507 1.02524 13.6927 0.799869 13.4691 0.657372C13.2455 0.514876 12.9746 0.466892 12.7156 0.523947L5.63728 2.09188C5.50906 2.12028 5.38769 2.17366 5.28009 2.24897C5.1725 2.32428 5.0808 2.42005 5.01022 2.5308C4.93964 2.64156 4.89157 2.76513 4.86875 2.89446C4.84593 3.02379 4.84881 3.15635 4.87722 3.28457L5.53412 6.2502H1.5C1.23487 6.25049 0.980694 6.35595 0.793222 6.54342C0.60575 6.73089 0.500298 6.98507 0.5 7.2502V14.5002C0.500298 14.7653 0.60575 15.0195 0.793222 15.207C0.980694 15.3944 1.23487 15.4999 1.5 15.5002H8.75C9.01513 15.4999 9.26931 15.3944 9.45678 15.207C9.64425 15.0195 9.7497 14.7653 9.75 14.5002V10.6551L14.7162 9.5551C14.975 9.49747 15.2003 9.33953 15.3428 9.11594C15.4853 8.89235 15.5333 8.62137 15.4762 8.36245ZM8.75 14.5002H1.5V7.2502H5.75566L6.44513 10.3629C6.49437 10.5848 6.61768 10.7833 6.79477 10.9259C6.97186 11.0684 7.19219 11.1464 7.4195 11.147C7.49291 11.147 7.56609 11.1389 7.63775 11.123L8.75025 10.8765L8.75062 14.5002H8.75ZM14.5 8.57873L7.42147 10.1466L5.85356 3.0682L12.932 1.5002L14.5005 8.57848L14.5 8.57873Z"}
      fill={"currentColor"}
    />
  </svg>

));
LiveCasinoIconSvg.displayName = "LiveCasinoIconSvg";

const LiveCasinoIcon = withProps(Icon)({ svgComponent: LiveCasinoIconSvg });

export { LiveCasinoIcon };
