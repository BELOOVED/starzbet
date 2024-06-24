// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";
import { shared_outcomeOtherValue_and_more } from "@sb/translates/shared/SharedTKeys";

const PredicateNormalizer = memo(({ outcomeParameters }) => {
  const [t] = useTranslation();

  if (outcomeParameters.predicate === EOutcomePredicate.eq) {
    return (
      outcomeParameters.outcome
    );
  }

  return (
    <>
      {`${outcomeParameters.outcome} `}

      {t(shared_outcomeOtherValue_and_more)}
    </>
  );
});
PredicateNormalizer.displayName = "PredicateNormalizer";

export { PredicateNormalizer };
