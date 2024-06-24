import clsx from "clsx";
import { memo } from "react";
import classes from "./LoaderImg.module.css";

const LoaderImg = memo<IWithClassName>(({ className }) => (
  <div className={clsx(className, classes.loader)} />
));
LoaderImg.displayName = "LoaderImg";

export { LoaderImg };
