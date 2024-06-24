import { type TReducer } from "@sb/utils";
import { type IWithMarketFilterState } from "../MarketFilterState";
import { type marketFilterChangePresetAction } from "../MarketFilterActions";

const marketFilterChangePresetReducer: TReducer<IWithMarketFilterState, typeof marketFilterChangePresetAction> = (
  state,
  { payload: { preset } },
) => ({
  ...state,
  marketFilter: {
    ...state.marketFilter,
    preset,
  },
});

export { marketFilterChangePresetReducer };
