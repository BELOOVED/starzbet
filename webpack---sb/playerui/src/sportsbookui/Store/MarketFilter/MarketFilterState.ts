import { type EMarketType } from "@sb/betting-core/MarketType";
import { EMarketPreset } from "./Model/MarketPreset";

interface IWithMarketFilterState {
  marketFilter: {
    preset: EMarketPreset;
    tournamentMap: Record<string, EMarketType>;
    typeList: Record<string, EMarketType[]>;
  };
}

const marketFilterState: IWithMarketFilterState = {
  marketFilter: {
    preset: EMarketPreset.FULL_TIME_RESULT,
    tournamentMap: {},
    typeList: {},
  },
};

export { marketFilterState, type IWithMarketFilterState };
