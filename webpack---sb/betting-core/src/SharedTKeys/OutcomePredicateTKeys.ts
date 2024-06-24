import {
  shared_outcomePredicate_equal,
  shared_outcomePredicate_greater,
  shared_outcomePredicate_greaterThanOrEqual,
  shared_outcomePredicate_lessThanOrEqual,
  TSharedKey
} from "@sb/translates/shared/SharedTKeys";
import { EOutcomePredicate } from "../EOutcomePredicate";

export const outcomePredicateTKeys: Record<EOutcomePredicate, TSharedKey> = {
  [EOutcomePredicate.eq]: shared_outcomePredicate_equal,
  [EOutcomePredicate.gte]: shared_outcomePredicate_greaterThanOrEqual,
  [EOutcomePredicate.lte]: shared_outcomePredicate_lessThanOrEqual,
  [EOutcomePredicate.gt]: shared_outcomePredicate_greater,
};

