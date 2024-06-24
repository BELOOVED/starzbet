import clsx from "clsx";
import { type CSSProperties, memo } from "react";
import classes from "./SkeletonLoader.module.css";

interface ISkeletonLoaderProps extends IWithClassName {
  isFullHeight?: boolean;
  height?: number;
}

const SkeletonLoader = memo<ISkeletonLoaderProps>(({ isFullHeight, className, height = 50 }) => {
  const style: CSSProperties = {
    height: isFullHeight ? "100dvh" : `${height}px`,
  };

  return (
    <div className={clsx(classes.skeletonLoader, className)}>
      <div className={classes.skeletonLoaderItem} style={style} />
    </div>
  );
})
;
SkeletonLoader.displayName = "SkeletonLoader";

export { SkeletonLoader };
