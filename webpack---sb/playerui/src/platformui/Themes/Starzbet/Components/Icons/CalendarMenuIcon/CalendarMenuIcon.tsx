import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const CalendarIconSvg = memo(() => (
  // eslint-disable-next-line rulesdir/jsx-element-max-length
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <path
      d={"M0.468054 12.1999H12.7186C12.8285 12.1999 12.9347 12.1617 13.0189 12.0919C13.1366 11.9938 15.8206 9.69518 15.9843 4.73328H2.82747C2.66443 9.23735 0.19251 11.3544 0.166821 11.3755C0.0162208 11.5022 -0.0391879 11.7091 0.0285651 11.8932C0.0958494 12.0769 0.271201 12.1999 0.468054 12.1999Z"}
      fill={"url(#paint0_linear_3248_25797)"}
    />

    <path
      d={"M15.5311 1.93333H13.1872V1.46667C13.1872 1.20533 12.981 1 12.7185 1C12.4559 1 12.2497 1.20533 12.2497 1.46667V1.93333H9.87458V1.46667C9.87458 1.20533 9.66832 1 9.40581 1C9.1433 1 8.93704 1.20533 8.93704 1.46667V1.93333H6.59319V1.46667C6.59319 1.20533 6.38693 1 6.12441 1C5.8619 1 5.65564 1.20533 5.65564 1.46667V1.93333H3.31179C3.04928 1.93333 2.84302 2.13866 2.84302 2.4V3.79999H15.9999V2.4C15.9999 2.13866 15.7936 1.93333 15.5311 1.93333Z"}
      fill={"url(#paint1_linear_3248_25797)"}
    />

    <path
      d={"M13.621 12.8075C13.3665 13.0185 13.0469 13.1333 12.7187 13.1333H2.84326V14.5333C2.84326 14.7913 3.05293 15 3.31203 15H15.5313C15.7904 15 16.0001 14.7913 16.0001 14.5333V9.30212C15.0963 11.5095 13.8351 12.629 13.621 12.8075Z"}
      fill={"url(#paint2_linear_3248_25797)"}
    />

    <defs>
      <linearGradient
        id={"paint0_linear_3248_25797"}
        x1={"-5.95462e-08"}
        y1={"8.4666"}
        x2={"15.9843"}
        y2={"8.4666"}
        gradientUnits={"userSpaceOnUse"}
      >
        <stop stopColor={"currentColor"} />

        <stop offset={"1"} stopColor={"currentColor"} />
      </linearGradient>

      <linearGradient
        id={"paint1_linear_3248_25797"}
        x1={"2.84302"}
        y1={"2.4"}
        x2={"15.9999"}
        y2={"2.4"}
        gradientUnits={"userSpaceOnUse"}
      >
        <stop stopColor={"currentColor"} />

        <stop offset={"1"} stopColor={"currentColor"} />
      </linearGradient>

      <linearGradient
        id={"paint2_linear_3248_25797"}
        x1={"2.84326"}
        y1={"12.1511"}
        x2={"16.0001"}
        y2={"12.1511"}
        gradientUnits={"userSpaceOnUse"}
      >
        <stop stopColor={"currentColor"} />

        <stop offset={"1"} stopColor={"currentColor"} />
      </linearGradient>
    </defs>
  </svg>
));
CalendarIconSvg.displayName = "CalendarIconSvg";

const CalendarSecondsIcon = withProps(Icon)({ svgComponent: CalendarIconSvg });

export { CalendarSecondsIcon };
