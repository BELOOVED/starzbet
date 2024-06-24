// @ts-nocheck
import { memo } from "react";
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";

const symbols = {
  [EOutcomePredicate.eq]: "=",
  [EOutcomePredicate.lt]: "<",
  [EOutcomePredicate.gt]: ">",
  [EOutcomePredicate.lte]: "<=",
  [EOutcomePredicate.gte]: ">=",
};

const MultiValueNormalizer = memo(({ outcomeParameters }) => {
  const { value1, value2, predicate } = outcomeParameters;

  return `${value1}${symbols[predicate]}${value2}`;
});
MultiValueNormalizer.displayName = "MultiValueNormalizer";

export { MultiValueNormalizer };
