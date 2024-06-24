import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const content = (
  <>
    <path
      d={"M17.8116 12.4358C20.0893 12.4358 21.9357 11.3868 21.9357 10.0929C21.9357 8.79895 20.0893 7.75 17.8116 7.75C15.5339 7.75 13.6875 8.79895 13.6875 10.0929C13.6875 11.3868 15.5339 12.4358 17.8116 12.4358Z"}
      fill={"currentColor"}
    />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M17.8731 13.7838C14.9234 13.7838 13.749 12.5476 13.749 11.8315V14.8988C13.749 16.1931 15.5955 17.2405 17.8731 17.2405C20.1531 17.2405 21.9996 16.1931 21.9996 14.8988V11.9052C21.9996 12.6224 20.824 13.7838 17.8731 13.7838Z"}
      fill={"currentColor"}
    />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M17.8731 18.5226C15.2346 18.5226 13.749 17.3339 13.749 16.6179V19.6566C13.749 20.951 15.5955 21.9995 17.8731 21.9995C20.1531 21.9995 21.9996 20.951 21.9996 19.6566V16.5811C21.9996 17.2971 20.5129 18.5226 17.8731 18.5226Z"}
      fill={"currentColor"}
    />

    <path
      d={"M7.6751 7.68578C10.2571 7.68578 12.3502 6.63683 12.3502 5.34289C12.3502 4.04895 10.2571 3 7.6751 3C5.09311 3 3 4.04895 3 5.34289C3 6.63683 5.09311 7.68578 7.6751 7.68578Z"}
      fill={"currentColor"}
    />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M7.82353 9.03327C4.48079 9.03327 3.14844 7.7971 3.14844 7.08105V10.1483C3.14844 11.4427 5.24196 12.49 7.82353 12.49C10.4075 12.49 12.4998 11.4427 12.4998 10.1483V7.15468C12.4998 7.87191 11.1663 9.03327 7.82353 9.03327Z"}
      fill={"currentColor"}
    />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M7.82353 13.7731C4.83228 13.7731 3.14844 12.5844 3.14844 11.8684V14.9071C3.14844 16.2015 5.24196 17.25 7.82353 17.25C10.4075 17.25 12.4998 16.2015 12.4998 14.9071V11.8315C12.4998 12.5476 10.8136 13.7731 7.82353 13.7731Z"}
      fill={"currentColor"}
    />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M7.82353 18.5226C4.83228 18.5226 3.14844 17.3339 3.14844 16.6179V19.6566C3.14844 20.951 5.24196 21.9995 7.82353 21.9995C10.4075 21.9995 12.4998 20.951 12.4998 19.6566V16.5811C12.4998 17.2971 10.8136 18.5226 7.82353 18.5226Z"}
      fill={"currentColor"}
    />
  </>
);

const DepositLimitIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    {content}
  </svg>
));
DepositLimitIconSvg.displayName = "DepositLimitIconSvg";

const DepositLimitIcon = withProps(Icon)({ svgComponent: DepositLimitIconSvg });

export { DepositLimitIcon };
