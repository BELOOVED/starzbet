import { EMarketType } from "@sb/betting-core/MarketType";
import { FirstBallMarket } from "./FirstBallMarket";
import { InFirstThreeMarket } from "./InFirstThreeMarket";

const marketTypeWithCustomNameMap = {
  [EMarketType.score_lucky_loot_first_balls]: FirstBallMarket,
  [EMarketType.place_number_racing_roulette_in_first_three]: InFirstThreeMarket,
};

export { marketTypeWithCustomNameMap };

