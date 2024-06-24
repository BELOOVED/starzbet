// @ts-nocheck
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { shared_market_score_lucky_loot_first_ball } from "@sb/translates/shared/SharedTKeys";
import { parametersByOutcomeIdSelector } from "../../../Store/Feed/Selectors/OutcomeByIdSelector";
import { MarketName } from "../../MarketName/MarketName";

const FirstBallMarket = memo(({ outcomeId, marketId }) => {
  const [t] = useTranslation();
  const outcomeParameters = useParamSelector(parametersByOutcomeIdSelector, [outcomeId]);
  const outcome = outcomeParameters.outcome.split(",");

  if (outcome.length === 1) {
    return t(shared_market_score_lucky_loot_first_ball);
  }

  return <MarketName id={marketId} />;
});
FirstBallMarket.displayName = "FirstBallMarket";

export { FirstBallMarket };
