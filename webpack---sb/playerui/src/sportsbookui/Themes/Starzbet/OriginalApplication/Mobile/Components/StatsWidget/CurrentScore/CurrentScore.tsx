// @ts-nocheck
import { memo } from "react";
import classes from "./CurrentScore.module.css";
import { DashScoreValueByScope } from "../../../../../../../Components/ScoreValue/ScoreValue";

const CurrentScore = memo(({ scopeId, type }) => (
  <div className={classes.currentScore}>
    <DashScoreValueByScope
      scopeId={scopeId}
      type={type}
    />
  </div>
));
CurrentScore.displayName = "CurrentScore";

export { CurrentScore };
