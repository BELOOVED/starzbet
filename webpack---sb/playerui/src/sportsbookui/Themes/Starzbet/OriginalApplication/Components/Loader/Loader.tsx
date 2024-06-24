// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import classes from "./Loader.module.css";
import { LoaderImg } from "../../../../../../common/Themes/Starzbet/Components/LoaderImg/LoaderImg";

const Loader = memo<IWithClassName>(({ className }) => (
  <div className={clsx(classes.spinner, className)}>
    <LoaderImg className={classes.loader} />

    <div className={classes.circle} />
  </div>
));
Loader.displayName = "Loader";

export { Loader };
