import { memo } from "react";
import { withProps } from "@sb/utils";
import classes from "./ButtonLoaderIcon.module.css";
import { Icon } from "../../../../common/Components/Icon/Icon";

const LoaderSvg = memo(() => (
  <svg
    width={"19"}
    height={"18"}
    viewBox={"0 0 19 18"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M17.5 9C17.5 10.5823 17.0308 12.129 16.1518 13.4446C15.2727 14.7602 14.0233 15.7855 12.5615 16.391C11.0997 16.9965 9.49113 17.155 7.93928 16.8463C6.38743 16.5376 4.96197 15.7757 3.84315 14.6569C2.72433 13.538 1.9624 12.1126 1.65372 10.5607C1.34504 9.00887 1.50346 7.40034 2.10896 5.93853C2.71446 4.47672 3.73984 3.22729 5.05544 2.34824C6.37103 1.46919 7.91775 1 9.5 1"}
      stroke={"white"}
      strokeWidth={"2"}
    />
  </svg>
));
LoaderSvg.displayName = "LoaderSvg";

const ButtonLoaderIcon = withProps(Icon)({
  svgComponent: LoaderSvg,
  className: classes.loader,
});

export { ButtonLoaderIcon };
