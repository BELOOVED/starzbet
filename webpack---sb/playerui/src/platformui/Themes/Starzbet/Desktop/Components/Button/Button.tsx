import { type ButtonHTMLAttributes, type FC } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./Button.module.css";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & IWithQaAttribute> = (
  {
    disabled,
    onClick,
    children,
    className = "",
    qaAttribute = "",
    ...rest
  },
) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${classes.btn} ${className}`}
    {...rest}
    {...qaAttr(qaAttribute)}
  >
    {children}
  </button>
);
Button.displayName = "Button";

export { Button };
