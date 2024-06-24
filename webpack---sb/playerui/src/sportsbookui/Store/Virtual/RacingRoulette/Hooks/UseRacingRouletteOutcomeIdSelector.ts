// @ts-nocheck
import { createSimpleSelector, isVoid, useParamSelector } from "@sb/utils";
import { marketTypeByIdSelector } from "../../../Feed/Selectors/FeedSelectors";
import { virtualGameGetOutcomeId } from "../../Common/Model/GetOutcomeId";
import { getRacingRouletteOutcomeParameters } from "../Model/GetOutcomeParameters";

const racingRouletteOutcomeIdSelector = createSimpleSelector(
  [
    marketTypeByIdSelector,
    (_, marketId) => marketId,
    (_, __, outcome) => outcome,
  ],
  (marketType, marketId, outcome) => {
    if (isVoid(outcome)) {
      return void 0;
    }
    const outcomeParameters = getRacingRouletteOutcomeParameters(marketType, outcome);

    delete outcomeParameters["@kind"];
    delete outcomeParameters.parameters;

    return virtualGameGetOutcomeId(marketId, outcomeParameters);
  },
);

const useRacingRouletteOutcomeIdSelector = (marketId, outcome) => useParamSelector(
  racingRouletteOutcomeIdSelector,
  [marketId, outcome],
);

export { useRacingRouletteOutcomeIdSelector };
