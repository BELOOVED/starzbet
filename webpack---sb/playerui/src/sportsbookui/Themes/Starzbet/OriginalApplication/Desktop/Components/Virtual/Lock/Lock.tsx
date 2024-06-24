import { memo } from "react";
import classes from "./Lock.module.css";

const Lock = memo(() => (
  <div className={classes.lock} />
));
Lock.displayName = "Lock";

export { Lock };
