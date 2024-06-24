import clsx from "clsx";
import { type ButtonHTMLAttributes, type FC } from "react";
import { voidFn, withPreventDefault } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./ThemedModalButton.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";

interface IThemedModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, IWithQaAttribute {
  variant?: "primary" | "secondary" | "tertiary";
}

const ThemedModalButton: FC<IThemedModalButtonProps> = ({
  children,
  variant = "primary",
  onClick = voidFn,
  className,
  qaAttribute,
  ...props
}) => (
  <button
    {...props}
    onClick={withPreventDefault(onClick)}
    className={clsx(classes.button, classes[variant], IS_MOBILE_CLIENT_SIDE && classes.mobile, className)}
    {...qaAttr(qaAttribute)}
  >
    {children}
  </button>
);
ThemedModalButton.displayName = "ThemedModalButton";

export { ThemedModalButton };
