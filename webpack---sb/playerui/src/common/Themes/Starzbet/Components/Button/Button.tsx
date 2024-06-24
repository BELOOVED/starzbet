import clsx from "clsx";
import { type ButtonHTMLAttributes, createElement, type DetailedHTMLProps, type FC, Fragment, type PropsWithChildren } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./Button.module.css";
import { Ellipsis } from "../../../../../platformui/Components/Ellipsis/Ellipsis";

type TButtonColorScheme = "orange-gradient" | "blue-gradient" |
  "secondary-transparent" | "secondary-grey" | "secondary-orange" | "error" | "success"

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, IWithQaAttribute {
  colorScheme: TButtonColorScheme;
  wide?: boolean;
  capitalize?: boolean;
  loading?: boolean;
  contentClassName?: string;
  ellipsis?: boolean;
}

const colorSchemeToClassNameMap: Record<TButtonColorScheme, string | undefined> = {
  "orange-gradient": classes.orangeGradient,
  "blue-gradient": classes.blueGradient,
  "secondary-transparent": classes.secondaryTransparent,
  "secondary-grey": classes.secondaryGrey,
  "secondary-orange": classes.secondaryOrange,
  "error": classes.error,
  "success": classes.success,
};

const Button: FC<PropsWithChildren<IButtonProps>> = ({
  children,
  className,
  contentClassName,
  colorScheme,
  wide = false,
  capitalize = false,
  qaAttribute,
  loading = false,
  ellipsis,
  ...rest
}) => (
  <button
    className={clsx(className, colorSchemeToClassNameMap[colorScheme], wide && classes.wide, capitalize && classes.capitalize)}
    disabled={loading}
    {...qaAttr(qaAttribute)}
    {...rest}
  >
    {loading ? <div className={classes.circle} /> : null}

    <div className={clsx(classes.content, loading && classes.loading, contentClassName)}>
      {createElement(ellipsis ? Ellipsis : Fragment, {}, children)}
    </div>
  </button>
);
Button.displayName = "Button";

export { Button };
