// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { shared_market_score_lucky_loot_first_ball } from "@sb/translates/shared/SharedTKeys";
import { MarketNameByParams } from "../../MarketName/MarketName";

const FirstBallMarket = memo(
  ({
    outcomeParameters,
    market,
    scope,
    participants,
    sportId,
  }) => {
    const [t] = useTranslation();

    const outcome = outcomeParameters.outcome.split(",");

    if (outcome.length === 1) {
      return t(shared_market_score_lucky_loot_first_ball);
    }

    return (
      <MarketNameByParams
        market={market}
        scope={scope}
        participants={participants}
        sportId={sportId}
      />
    );
  },
);
FirstBallMarket.displayName = "FirstBallMarket";

export { FirstBallMarket };
