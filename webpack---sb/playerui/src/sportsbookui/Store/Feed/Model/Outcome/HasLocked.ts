// @ts-nocheck
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { type IFlatEvent, type IFlatMarket, type IFlatOutright, type IFlatScope, type TFlatOutcome } from "@sb/betting-core/Feed/Types";

const tooSmall = (coefficient: string) => +coefficient <= 1.01;

const hasLocked = (outcome: TFlatOutcome) => outcome.locked || tooSmall(outcome.coefficient);

const hasOutrightOutcomeLocked = (outright: IFlatOutright, outcome: TFlatOutcome) => outright.locked || hasLocked(outcome);

const hasSomeParentLocked = (event: IFlatEvent, scope: IFlatScope, market: IFlatMarket) => {
  if (marketTypeToMarketGroupMap[market.type] === EMarketGroup.custom) {
    return market.locked;
  }

  return event.locked || scope.locked || market.locked;
};

const hasSomeLocked = (event: IFlatEvent, scope: IFlatScope, market: IFlatMarket, outcome: TFlatOutcome) => (
  hasSomeParentLocked(event, scope, market) || hasLocked(outcome)
);

export {
  hasLocked,
  hasSomeLocked,
  hasSomeParentLocked,
  hasOutrightOutcomeLocked,
};
