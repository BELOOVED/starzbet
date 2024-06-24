import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const EyeShowIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M13.893 11.5C13.893 12.5432 13.0455 13.3889 12 13.3889C10.9545 13.3889 10.107 12.5432 10.107 11.5C10.107 10.4568 10.9545 9.61111 12 9.61111C13.0455 9.61111 13.893 10.4568 13.893 11.5Z"}
      fill={"currentColor"}
    />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M12 3C6.70771 3 2.26084 6.61186 1 11.5C2.26084 16.3881 6.70771 20 12 20C17.2923 20 21.7392 16.3881 23 11.5C21.7392 6.61186 17.2923 3 12 3ZM15.7859 11.5C15.7859 13.5864 14.0909 15.2778 12 15.2778C9.90908 15.2778 8.21406 13.5864 8.21406 11.5C8.21406 9.41359 9.90908 7.72222 12 7.72222C14.0909 7.72222 15.7859 9.41359 15.7859 11.5Z"}
      fill={"currentColor"}
    />
  </svg>
));
EyeShowIconSvg.displayName = "EyeShowIconSvg";

const EyeShowIcon = withProps(Icon)({ svgComponent: EyeShowIconSvg });

export { EyeShowIcon };

