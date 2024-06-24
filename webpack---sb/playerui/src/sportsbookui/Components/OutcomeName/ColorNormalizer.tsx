// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";
import classes from "./ColorNormalizer.module.css";

const PredicateNormalizer = memo(({ outcomeParameters }) => {
  if (outcomeParameters.predicate === EOutcomePredicate.eq) {
    return (
      outcomeParameters.outcome
    );
  }

  return (
    <>
      {outcomeParameters.outcome}

      {"+"}
    </>
  );
});
PredicateNormalizer.displayName = "PredicateNormalizer";

const ColorNormalizer = memo(({ outcomeParameters, marketParameters }) => {
  const classBall = clsx(
    classes.ball,
    classes[marketParameters[EMarketParameter.color]],
  );

  return (
    <div className={classes.colorNormalizer}>
      <div className={classBall} />

      <PredicateNormalizer outcomeParameters={outcomeParameters} />
    </div>
  );
});
ColorNormalizer.displayName = "ColorNormalizer";

export { ColorNormalizer };
