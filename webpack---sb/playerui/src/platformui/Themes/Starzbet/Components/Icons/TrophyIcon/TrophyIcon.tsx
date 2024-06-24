import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const TrophyIconSvg = memo(
  () => (
    <svg
      width={"24"}
      height={"24"}
      viewBox={"0 0 24 24"}
      fill={"none"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={"M22 8.16216V8.23516C22 9.09516 22 9.52616 21.793 9.87816C21.586 10.2302 21.209 10.4392 20.457 10.8582L19.664 11.2982C20.21 9.45016 20.393 7.46416 20.46 5.76616L20.47 5.54516L20.472 5.49316C21.123 5.71916 21.489 5.88816 21.717 6.20416C22 6.59716 22 7.11916 22 8.16216ZM2 8.16216V8.23516C2 9.09516 2 9.52616 2.207 9.87816C2.414 10.2302 2.791 10.4392 3.543 10.8582L4.337 11.2982C3.79 9.45016 3.607 7.46416 3.54 5.76616L3.53 5.54516L3.529 5.49316C2.877 5.71916 2.511 5.88816 2.283 6.20416C2 6.59716 2 7.12016 2 8.16216Z"}
        fill={"currentColor"}
      />

      <path
        fillRule={"evenodd"}
        clipRule={"evenodd"}
        d={"M16.377 2.34724C14.9302 2.11011 13.4661 1.99404 12 2.00024C10.217 2.00024 8.74701 2.15724 7.62301 2.34724C6.48401 2.53924 5.91501 2.63524 5.43901 3.22124C4.96401 3.80724 4.98901 4.44024 5.03901 5.70624C5.21201 10.0542 6.15001 15.4862 11.25 15.9662V19.5002H9.82001C9.58891 19.5004 9.365 19.5805 9.18634 19.7271C9.00768 19.8737 8.8853 20.0776 8.84001 20.3042L8.65001 21.2502H6.00001C5.80109 21.2502 5.61033 21.3293 5.46968 21.4699C5.32902 21.6106 5.25001 21.8013 5.25001 22.0002C5.25001 22.1991 5.32902 22.3899 5.46968 22.5306C5.61033 22.6712 5.80109 22.7502 6.00001 22.7502H18C18.1989 22.7502 18.3897 22.6712 18.5303 22.5306C18.671 22.3899 18.75 22.1991 18.75 22.0002C18.75 21.8013 18.671 21.6106 18.5303 21.4699C18.3897 21.3293 18.1989 21.2502 18 21.2502H15.35L15.16 20.3042C15.1147 20.0776 14.9923 19.8737 14.8137 19.7271C14.635 19.5805 14.4111 19.5004 14.18 19.5002H12.75V15.9662C17.85 15.4862 18.789 10.0552 18.961 5.70624C19.011 4.44024 19.037 3.80624 18.561 3.22124C18.085 2.63524 17.516 2.53924 16.377 2.34724Z"}
        fill={"currentColor"}
      />
    </svg>
  ),
);
TrophyIconSvg.displayName = "TrophyIconSvg";

const TrophyIcon = withProps(Icon)({ svgComponent: TrophyIconSvg });

export { TrophyIcon };