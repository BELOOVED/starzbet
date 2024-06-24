import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import { qaAttr } from "@sb/qa-attributes";
import classes from "./ThemedModalText.module.css";

type TThemedModalTextColor = "white" | "success" | "error" | "warning" | "dark"

type TThemedModalTextSize = "xl" | "lg" | "md" | "sm"

type TThemedModalTextProps = PropsWithChildren & {
  size?: "xl" | "lg" | "md" | "sm";
  capitalize?: boolean;
  color?: TThemedModalTextColor;
  qaAttribute?: string;
  wide?: boolean;
  className?: string;
}

const sizeMap: Record<TThemedModalTextSize, string | undefined> = {
  xl: classes.xl,
  lg: classes.lg,
  md: classes.md,
  sm: classes.sm,
};

const colorMap: Record<TThemedModalTextColor, string | undefined> = {
  error: classes.error,
  success: classes.success,
  white: classes.white,
  warning: classes.warning,
  dark: classes.dark,
};

const ThemedModalText: FC<TThemedModalTextProps> = ({
  children,
  size = "md",
  capitalize = false,
  color = "white",
  qaAttribute,
  wide,
  className,
  ...props
}) => (
  <div
    className={clsx(classes.text, sizeMap[size], capitalize && classes.capitalize, wide && classes.wide, colorMap[color], className)}
    {...props}
    {...qaAttr(qaAttribute)}
  >
    {children}
  </div>
);
ThemedModalText.displayName = "ThemedModalText";

export { ThemedModalText };
export type  { TThemedModalTextColor };
