import clsx from "clsx";
import { type ComponentType, createElement, type CSSProperties, type FC, type PropsWithChildren } from "react";
import { withProps } from "@sb/utils";
import classes from "./SectionTitle.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { LogoIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/LogoIcon/LogoIcon";
import { type TIconProps } from "../../../../../common/Components/Icon/Icon";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";

type TLandingSectionTitleProps = PropsWithChildren<{
  markerColor: string;
  icon?: ComponentType<TIconProps>;
}>

const logoIcon = withProps(LogoIcon)({ size: "m" });

const SectionTitle: FC<TLandingSectionTitleProps> = (
  ({ markerColor, children, icon }) => {
    const markerStyle: CSSProperties = {
      backgroundColor: `rgb(${markerColor})`,
      boxShadow: `0 0 12px 0 rgba(${markerColor} / .4)`,
    };

    return (
      <div className={clsx(classes.sectionTitle, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
        <div className={classes.sectionTitleMarker} style={markerStyle} />

        {createElement(icon ?? logoIcon, { className: classes.sectionTitleLogo })}

        <Ellipsis className={classes.sectionTitleText}>
          {children}
        </Ellipsis>
      </div>
    );
  });
SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
