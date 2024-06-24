import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const ProfileOctagonIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <path
      d={"M8.00035 0C3.58234 0 0 3.58164 0 8C0 12.4184 3.58199 16 8.00035 16C12.4191 16 16.0007 12.4184 16.0007 8C16.0007 3.58164 12.4191 0 8.00035 0ZM8.00035 2.39209C9.46224 2.39209 10.6469 3.57707 10.6469 5.03826C10.6469 6.4998 9.46224 7.68443 8.00035 7.68443C6.53916 7.68443 5.35454 6.4998 5.35454 5.03826C5.35454 3.57707 6.53916 2.39209 8.00035 2.39209ZM7.99859 13.9084C6.54057 13.9084 5.20518 13.3774 4.17518 12.4985C3.92427 12.2845 3.77949 11.9707 3.77949 11.6414C3.77949 10.1595 4.97887 8.97342 6.46115 8.97342H9.54026C11.0229 8.97342 12.2177 10.1595 12.2177 11.6414C12.2177 11.971 12.0736 12.2841 11.8224 12.4981C10.7927 13.3774 9.45697 13.9084 7.99859 13.9084Z"}
      fill={"url(#paint0_linear_3248_25935)"}
    />

    <defs>
      <linearGradient
        id={"paint0_linear_3248_25935"}
        x1={"-5.96073e-08"}
        y1={"8"}
        x2={"16.0007"}
        y2={"8"}
        gradientUnits={"userSpaceOnUse"}
      >
        <stop stopColor={"#FF9E00"} />

        <stop offset={"1"} stopColor={"#FF6D00"} />
      </linearGradient>
    </defs>
  </svg>
));
ProfileOctagonIconSvg.displayName = "ProfileOctagonIconSvg";

const ProfileOctagonIcon = withProps(Icon)({ svgComponent: ProfileOctagonIconSvg });

export { ProfileOctagonIcon };
