import clsx from "clsx";
import { memo } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./Loader.module.css";
import { LoaderImg } from "../LoaderImg/LoaderImg";

interface ILoaderCircleProps {
  size: `${string}px`;
}

const LoaderCircle = memo<ILoaderCircleProps>(({ size = "40px" }) => {
  const style = { width: size, height: size };

  return <div className={classes.circle} style={style} />;
});
LoaderCircle.displayName = "LoaderCircle";

const Loader = memo<IWithClassName>(({ className }) => (
  <div className={clsx(classes.spinner, className)} {...qaAttr(PlayerUIQaAttributes.Loader)}>
    <LoaderImg className={classes.loader} />

    <div className={classes.circle} />
  </div>
));
Loader.displayName = "Loader";

export { Loader, LoaderCircle };
