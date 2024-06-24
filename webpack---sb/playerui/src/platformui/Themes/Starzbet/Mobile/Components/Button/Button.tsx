import { type ButtonHTMLAttributes, type FC } from "react";
import classes from "./Button.module.css";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  {
    disabled,
    onClick,
    children,
    className = "",
    ...rest
  },
) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${classes.btn} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
Button.displayName = "Button";

export { Button };
