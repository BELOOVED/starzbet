import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const NewTabIconSvg = memo(() => (
  <svg
    width={"15"}
    height={"17"}
    viewBox={"0 0 15 17"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1719_97799)"}>
      <path
        d={"M9.24358 3C8.82948 3 8.49633 2.66406 8.49633 2.25C8.49633 1.83594 8.82948 1.5 9.24358 1.5H13.7271C14.1412 1.5 14.4744 1.83594 14.4744 2.25V6.75C14.4744 7.16563 14.1412 7.5 13.7271 7.5C13.313 7.5 12.9798 7.16563 12.9798 6.75V4.05938L6.75585 10.2531C6.4912 10.5719 6.01794 10.5719 5.72527 10.2531C5.43571 9.9875 5.43571 9.5125 5.72527 9.21875L11.9244 3H9.24358ZM0.525635 4.25C0.525635 3.28344 1.3062 2.5 2.26922 2.5H5.7564C6.17051 2.5 6.50366 2.83594 6.50366 3.25C6.50366 3.66563 6.17051 4 5.7564 4H2.26922C2.13161 4 2.02014 4.1125 2.02014 4.25V13.75C2.02014 13.8875 2.13161 14 2.26922 14H11.7344C11.8714 14 11.9835 13.8875 11.9835 13.75V10.25C11.9835 9.83438 12.3167 9.5 12.7308 9.5C13.1449 9.5 13.478 9.83438 13.478 10.25V13.75C13.478 14.7156 12.6965 15.5 11.7344 15.5H2.26922C1.3062 15.5 0.525635 14.7156 0.525635 13.75V4.25Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1719_97799"}>
        <rect
          width={"13.9487"}
          height={"16"}
          fill={"white"}
          transform={"translate(0.525635 0.5)"}
        />
      </clipPath>
    </defs>
  </svg>
));
NewTabIconSvg.displayName = "NewTabIconSvg";

const NewTabIcon = withProps(Icon)({ svgComponent: NewTabIconSvg });

export { NewTabIcon };
