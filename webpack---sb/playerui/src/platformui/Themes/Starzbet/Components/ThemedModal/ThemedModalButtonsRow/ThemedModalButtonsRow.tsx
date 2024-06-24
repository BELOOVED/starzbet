import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import classes from "./ThemedModalButtonsRow.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";

const ThemedModalButtonsRow: FC<PropsWithChildren<IWithClassName>> = ({ children, className }) => (
  <div className={clsx(classes.buttonsRow, IS_MOBILE_CLIENT_SIDE && classes.mobile, className)}>
    {children}
  </div>
);
ThemedModalButtonsRow.displayName = "ThemedModalButtonsRow";

export { ThemedModalButtonsRow };
