// @ts-nocheck
import { memo } from "react";
import classes from "./DeclineIcon.module.css";

const DeclineIcon = memo(() => (
  <div className={classes.icon}>
    <svg
      width={"14"}
      height={"14"}
      viewBox={"0 0 14 14"}
      fill={"none"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={"M13 1L1 13"}
        stroke={"#323232"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M1 1L13 13"}
        stroke={"#323232"}
        strokeWidth={"2"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </svg>
  </div>
));
DeclineIcon.displayName = "DeclineIcon";

export { DeclineIcon };
