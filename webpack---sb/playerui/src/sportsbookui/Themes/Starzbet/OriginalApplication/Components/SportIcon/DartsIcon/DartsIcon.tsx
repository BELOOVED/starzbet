import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const DartsIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M11.0161 12.8589L15.1831 8.69189"}
      stroke={"currentColor"}
      strokeWidth={"1.5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M15.1831 8.692L15.7511 4.942L18.9991 1.75L19.5011 4.374L22.1251 4.876L18.9331 8.124L15.1831 8.692Z"}
      stroke={"currentColor"}
      strokeWidth={"1.5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M21.0549 10.513C21.5849 12.5221 21.4592 14.6479 20.6962 16.5805C19.9332 18.5132 18.5727 20.1515 16.8132 21.2566C15.0536 22.3617 12.9871 22.8758 10.9148 22.7239C8.8426 22.5721 6.87307 21.7622 5.29345 20.4124C3.71383 19.0625 2.60673 17.2434 2.13359 15.2202C1.66046 13.197 1.84603 11.0755 2.66325 9.16521C3.48047 7.25488 4.8866 5.65558 6.67659 4.60052C8.46657 3.54546 10.5468 3.08982 12.6139 3.30004"}
      stroke={"currentColor"}
      strokeWidth={"1.5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M16.7221 11.737C16.9852 12.7977 16.9107 13.914 16.5092 14.9304C16.1076 15.9468 15.399 16.8126 14.482 17.4071C13.565 18.0015 12.4854 18.2951 11.3937 18.2469C10.3019 18.1986 9.2524 17.8109 8.39144 17.1379C7.53048 16.4648 6.90097 15.5399 6.59066 14.4921C6.28034 13.4442 6.30469 12.3257 6.66029 11.2923C7.0159 10.259 7.68506 9.36231 8.57448 8.72733C9.46391 8.09236 10.5293 7.75071 11.6221 7.75"}
      stroke={"currentColor"}
      strokeWidth={"1.5"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>
));
DartsIconSvg.displayName = "DartsIconSvg";

const DartsIcon = withProps(Icon)({ svgComponent: DartsIconSvg });

export { DartsIcon };
