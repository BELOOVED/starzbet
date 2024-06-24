// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  shared_market_place_number_race_place,
  shared_market_place_number_racing_roulette_in_first_three_for_two,
} from "@sb/translates/shared/SharedTKeys";
import { MarketNameByParams } from "../../MarketName/MarketName";

const InFirstThreeMarket = memo(
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
      return t(shared_market_place_number_race_place);
    }

    if (outcome.length === 2) {
      return t(
        shared_market_place_number_racing_roulette_in_first_three_for_two,
      );
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
InFirstThreeMarket.displayName = "InFirstThreeMarket";

export { InFirstThreeMarket };
