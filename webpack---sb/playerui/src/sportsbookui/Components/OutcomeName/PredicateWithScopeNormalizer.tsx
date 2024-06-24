// @ts-nocheck
import { memo } from "react";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { FullScopeName } from "../ScopeName/ScopeName";

const PredicateWithScopeNormalizer = memo(({ sportId, marketParameters, outcomeParameters }) => {
  const scope = {
    type: marketParameters[EMarketParameter.scopeType],
    number: outcomeParameters.outcome,
  };

  return (
    <FullScopeName scope={scope} sportId={sportId} />
  );
});
PredicateWithScopeNormalizer.displayName = "PredicateWithScopeNormalizer";

export { PredicateWithScopeNormalizer };
