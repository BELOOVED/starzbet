import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import classes from "./ThemedModalBody.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";

const ThemedModalBody: FC<PropsWithChildren<IWithClassName>> = ({ children, className }) => (
  <div className={clsx(classes.body, IS_MOBILE_CLIENT_SIDE && classes.mobile, className)}>
    {children}
  </div>
);
ThemedModalBody.displayName = "ThemedModalBody";

export { ThemedModalBody };
