import clsx from "clsx";
import { type BaseHTMLAttributes, type DetailedHTMLProps, type FC, type PropsWithChildren } from "react";
import classes from "./Text.module.css";

type TTextColorScheme = "inherit" | "light-grey" | "text" | "light-400" | "light-700" | "grey-text" | "blue-text" | "green-text"

type TTextSize = "12" | "14" | "16" | "18" | "24"

type TTextGap = "16" | "24" | "32"

type TTextWeight = "500" | "400"

type TTextAlign = "center"

interface ITextProps extends DetailedHTMLProps<BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  colorScheme: TTextColorScheme;
  textSize: TTextSize;
  textGap: TTextGap;
  textWeight: TTextWeight;
  textAlign?: TTextAlign;
  noWrap?: boolean;
  className?: string;
  wide?: boolean;
  capitalize?: boolean;
}

const colorSchemeToClassNameMap: Record<TTextColorScheme, string | undefined> = {
  "inherit": classes.inherit,
  "light-grey": classes.light150,
  "text": classes.text,
  "light-400": classes.light400,
  "light-700": classes.light700,
  "grey-text": classes.greyText,
  "blue-text": classes.blueText,
  "green-text": classes.greenText,
};

const sizeSchemeToClassNameMap: Record<TTextSize, string | undefined> = {
  "12": classes.fontSize12,
  "14": classes.fontSize14,
  "16": classes.fontSize16,
  "18": classes.fontSize18,
  "24": classes.fontSize16,
};

const textAlignSchemeToClassNameMap: Record<TTextAlign, string | undefined> = {
  "center": classes.textAlignCenter,
};

const gapSchemeToClassNameMap: Record<TTextGap, string | undefined> = {
  "16": classes.lineHeight16,
  "24": classes.lineHeight24,
  "32": classes.lineHeight32,
};

const weightSchemeToClassNameMap: Record<TTextWeight, string | undefined> = {
  "500": classes.fontWeight500,
  "400": classes.fontWeight400,
};

const Text: FC<PropsWithChildren<ITextProps>> = ({
  children,
  className,
  colorScheme,
  textGap,
  textWeight,
  textSize,
  textAlign,
  noWrap = false,
  capitalize = false,
  wide = false,
  ...rest
}) => {
  const textClasses = clsx(
    className,
    colorSchemeToClassNameMap[colorScheme],
    sizeSchemeToClassNameMap[textSize],
    gapSchemeToClassNameMap[textGap],
    weightSchemeToClassNameMap[textWeight],
    textAlign && textAlignSchemeToClassNameMap[textAlign],
    wide && classes.wide,
    capitalize && classes.capitalize,
    noWrap && classes.noWrap,
  );

  return (
    <div {...rest} className={textClasses}>{children}</div>
  );
};
Text.displayName = "Text";

export { Text };
