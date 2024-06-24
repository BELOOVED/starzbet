import { type CSSProperties, type FC, type HTMLAttributes, type PropsWithChildren, useMemo } from "react";
import { clsx } from "clsx";
import classes from "./Scrollbar.module.css";

interface IScrollbarProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
  hasScrollX?: boolean;
  noScrollY?: boolean;
  width?: number;
  trackWidth?: number;
  background?: string;
  borderRadius?: number;
  thumbColor?: string;
  thumbHeight?: number;
  withStableGutter?: boolean;
}

interface IScrollbarCSSProperties extends CSSProperties {
  [key: `--${string}`]: string | number;
}

const handleColor = (color: string): string => color.startsWith("#") ? color : `var(--${color})`;
const handleTrackWidth = (scrollbarWidth: number, trackWidth: number): number => (scrollbarWidth - trackWidth) / 2;

/**
 * Custom scrollbar with implementation via CSS.
 * Container height is `100%`. If parent container position is `absolute` without `height` (select options for example),
 * provide `max-height` through classname.
 * Colors are wrapped in `var(--${color})` if not starts with `#`
 */
const Scrollbar: FC<IScrollbarProps> = (({
  children,
  className,
  hasScrollX = false,
  noScrollY = false,
  width = 8,
  trackWidth = 8,
  background = "background",
  borderRadius = 10,
  thumbColor = "brand",
  withStableGutter = false,
  ...props
}) => {
  const inlineStyle = useMemo<IScrollbarCSSProperties>(
    () => ({
      ...props.style,
      "--scrollbar-overflow-x": hasScrollX ? "auto" : "hidden",
      "--scrollbar-overflow-y": !noScrollY ? "auto" : "hidden",
      "--scrollbar-width": `${width}px`,
      "--scrollbar-track-width": `${handleTrackWidth(width, trackWidth)}px`,
      "--scrollbar-background": handleColor(background),
      "--scrollbar-border-radius": `${borderRadius}px`,
      "--scrollbar-thumb-color": handleColor(thumbColor),
      "--scrollbar-gutter": withStableGutter ? "stable" : "auto",
    }),
    [hasScrollX, noScrollY, width, trackWidth, background, borderRadius, thumbColor, withStableGutter],
  );

  return (
    <div {...props} style={inlineStyle} className={clsx(className, classes.scrollContainer)}>
      <div className={classes.scrollContent}>
        {children}
      </div>
    </div>
  );
});
Scrollbar.displayName = "Scrollbar";

export { Scrollbar };
