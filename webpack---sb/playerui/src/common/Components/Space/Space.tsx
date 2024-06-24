import clsx from "clsx";
import { type CSSProperties, type DetailedHTMLProps, type FC, type HTMLAttributes, type PropsWithChildren } from "react";
import classes from "./Space.module.css";

interface ISpaceProps extends IWithClassName, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vertical?: boolean;
  value?: number;
  wide?: boolean;
  alignCenter?: boolean;
  flexEnd?: boolean;
  spaceBetween?: boolean;
}

const Space: FC<PropsWithChildren<ISpaceProps>> = ({
  children,
  className,
  vertical,
  value,
  wide,
  alignCenter,
  flexEnd,
  spaceBetween,
  ...rest
}) => {
  const enhancedClassName = clsx(
    className,
    classes.space,
    vertical && classes.vertical,
    wide && classes.wide,
    alignCenter && classes.alignCenter,
    flexEnd && classes.flexEnd,
    spaceBetween && classes.spaceBetween,
  );
  const style: CSSProperties = {
    gap: `${value ?? 0}px`,
  };

  return (
    <div {...rest} className={enhancedClassName} style={style}>
      {children}
    </div>
  );
};
Space.displayName = "Space";

export { Space };
