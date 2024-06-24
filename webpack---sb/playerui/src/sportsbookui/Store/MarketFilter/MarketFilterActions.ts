import { type EMarketType } from "@sb/betting-core/MarketType";
import { type EMarketPreset } from "./Model/MarketPreset";

const marketFilterChangeAction = (sportId: string, currentList: EMarketType[], prev: EMarketType, next: EMarketType) => ({
  type: "@MARKET_FILTER/CHANGE",
  payload: {
    sportId,
    currentList,
    prev,
    next,
  },
});

const marketFilterChangePresetAction = (preset: EMarketPreset) => ({
  type: "@MARKET_FILTER/CHANGE_PRESET",
  payload: { preset },
});

const marketFilterChangeTournamentMapAction = (tournamentId: string, marketType: EMarketType) => ({
  type: "@MARKET_FILTER/CHANGE_TOURNAMENT_MAP",
  payload: {
    tournamentId,
    marketType,
  },
});

export { marketFilterChangeAction, marketFilterChangePresetAction, marketFilterChangeTournamentMapAction };
