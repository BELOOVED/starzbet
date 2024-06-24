// @ts-nocheck
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";

const getColorCountOutcome = (colorCount) => ({
  outcome: String(colorCount),
  predicate: colorCount === 0 ? EOutcomePredicate.eq : EOutcomePredicate.gte,
});

export { getColorCountOutcome };
