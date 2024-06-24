import clsx from "clsx";
import { type ButtonHTMLAttributes, type ComponentType, type CSSProperties, type DetailedHTMLProps, memo, useMemo } from "react";
import { getNotNil, isDev, isNotNil } from "@sb/utils";
import classes from "./Icon.module.css";

interface IIconBaseProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  /**
   * @example
   * xss: 8,
   * xs: 12,
   * s: 16,
   * m: 24,
   * l: 32,
   * xxxl: 90,
   */
  size?: TIconSize;
  color?: TIconColor;
  height?: number;
  width?: number;
  colorVar?: string;
  svgComponent: ComponentType;
}

type TIconProps = Omit<IIconBaseProps, "svgComponent">

type TIconSize = "xss" | "xs" | "s" | "m" | "l" | "xl" | "xxxl"

type TIconColor = "text"
  | "darkText"
  | "brand"
  | "success"
  | "validation"
  | "verified"
  | "error"
  | "warning"
  | "hover"
  | "background"
  | "active"
  | "blue"
  | "green"
  | "purple"
  | "black"
  | "lightGrey"
  | "white"
  | "color6"
  | "color1"
  | "color5"
  | "color17"
  | "color8"
  | "orange"
  | "neutral500"
  | "neutral300"
  | "secondaryOpacity"

const sizeMap: Omit<Record<TIconSize, number>, "initial"> = {
  xss: 8,
  xs: 12,
  s: 16,
  m: 24,
  l: 32,
  xl: 64,
  xxxl: 90,
};

const sizeList = Object.keys(sizeMap);

const getColor = (color: string) =>
  getNotNil(classes[color], ["colorMap"], color);

const colorMap: Record<TIconColor, string> = {
  text: getColor("textColor"),
  darkText: getColor("darkTextColor"),
  brand: getColor("brandColor"),
  validation: getColor("validationColor"),
  error: getColor("errorColor"),
  warning: getColor("warningColor"),
  success: getColor("success"),
  verified: getColor("verifiedColor"),
  hover: getColor("hoverColor"),
  background: getColor("backgroundColor"),
  active: getColor("activeColor"),
  white: getColor("white"),
  black: getColor("black"),
  secondaryOpacity: getColor("secondaryOpacity"),
  blue: getColor("blueColor"),
  green: getColor("greenColor"),
  purple: getColor("purpleColor"),
  lightGrey: getColor("lightGrey"),
  color1: getColor("color1"),
  color6: getColor("color6"),
  color5: getColor("color5"),
  color17: getColor("color17"),
  color8: getColor("color8"),
  orange: getColor("orange"),
  neutral500: getColor("neutral500"),
  neutral300: getColor("neutral300"),
};

const reserveSize = isDev ? 1000 : 16;

const Icon = memo<IIconBaseProps>(({
  svgComponent,
  size = "s",
  color,
  className,
  width,
  height,
  colorVar,
  ...props
}) => {
  const Component = svgComponent;

  const wrapperClassName = clsx(
    classes.wrapper,
    color && colorMap[color],
    className,
  );

  const inlineStyle = useMemo<CSSProperties | undefined>(
    () => {
      if (isNotNil(width) && isNotNil(height)) {
        return {
          height,
          width,
          minWidth: width,
          ...colorVar ? { color: `var(${colorVar})` } : {},
        };
      }

      if (isDev && !sizeList.includes(size)) {
        alert(`${size} - Illegal icon size detected!`);
      }

      return {
        height: sizeMap[size] || reserveSize,
        width: sizeMap[size] || reserveSize,
        minWidth: sizeMap[size] || reserveSize,
        ...colorVar ? { color: `var(${colorVar})` } : {},
      };
    },
    [height, width, size],
  );

  return (
    <span style={inlineStyle} className={wrapperClassName} {...props}>
      <Component />
    </span>
  );
});
Icon.displayName = "Icon";

export {
  Icon,
  type TIconProps,
  type TIconColor,
  type TIconSize,
  type IIconBaseProps,
};
