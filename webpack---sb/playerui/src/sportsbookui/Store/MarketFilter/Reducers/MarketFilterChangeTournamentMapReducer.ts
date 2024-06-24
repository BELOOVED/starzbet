import { type TReducer } from "@sb/utils";
import { type IWithMarketFilterState } from "../MarketFilterState";
import { type marketFilterChangeTournamentMapAction } from "../MarketFilterActions";

const marketFilterChangeTournamentMapReducer: TReducer<IWithMarketFilterState, typeof marketFilterChangeTournamentMapAction> = (
  state,
  {
    payload: {
      tournamentId,
      marketType,
    },
  },
) => ({
  ...state,
  marketFilter: {
    ...state.marketFilter,
    tournamentMap: {
      ...state.marketFilter.tournamentMap,
      [tournamentId]: marketType,
    },
  },
});

export { marketFilterChangeTournamentMapReducer };
