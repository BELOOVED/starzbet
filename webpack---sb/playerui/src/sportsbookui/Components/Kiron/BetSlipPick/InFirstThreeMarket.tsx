// @ts-nocheck
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  shared_market_place_number_race_place,
  shared_market_place_number_racing_roulette_in_first_three_for_two,
} from "@sb/translates/shared/SharedTKeys";
import { parametersByOutcomeIdSelector } from "../../../Store/Feed/Selectors/OutcomeByIdSelector";
import { MarketName } from "../../MarketName/MarketName";

const InFirstThreeMarket = memo(({ outcomeId, marketId }) => {
  const [t] = useTranslation();
  const outcomeParameters = useParamSelector(parametersByOutcomeIdSelector, [outcomeId]);
  const outcome = outcomeParameters.outcome.split(",");

  if (outcome.length === 1) {
    return t(shared_market_place_number_race_place);
  }

  if (outcome.length === 2) {
    return t(
      shared_market_place_number_racing_roulette_in_first_three_for_two,
    );
  }

  return <MarketName id={marketId} />;
});
InFirstThreeMarket.displayName = "InFirstThreeMarket";

export { InFirstThreeMarket };
