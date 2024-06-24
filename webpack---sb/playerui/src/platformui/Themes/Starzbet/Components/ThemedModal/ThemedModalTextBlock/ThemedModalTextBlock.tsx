import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import classes from "./ThemedModalTextBlock.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";

const ThemedModalTextBlock: FC<PropsWithChildren> = ({ children }) => (
  <div className={clsx(classes.textBlock, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
    {children}
  </div>
);
ThemedModalTextBlock.displayName = "ThemedModalTextBlock";

export { ThemedModalTextBlock };
