import { type FC, type PropsWithChildren } from "react";
import classes from "./BetRow.module.css";

const BetRow: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.row}>
    {children}
  </div>
);
BetRow.displayName = "BetRow";

export { BetRow };
