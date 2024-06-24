import { createSimpleSelector } from "@sb/utils";
import { getMarketTypeListBySportId } from "../../Feed/Model/Market/Market";
import { type IWithMarketFilterState } from "../MarketFilterState";

const marketTypeListSelector = ({ marketFilter }: IWithMarketFilterState) => marketFilter.typeList;

const marketPresetSelector = ({ marketFilter }: IWithMarketFilterState) => marketFilter.preset;

const marketFilterTournamentMapSelector = ({ marketFilter }: IWithMarketFilterState) => marketFilter.tournamentMap;

const marketFilterTypeByTournamentMapSelector = (state: IWithMarketFilterState, tournamentId: string, sportId: string) => (
  marketFilterTournamentMapSelector(state)[tournamentId] || getMarketTypeListBySportId(sportId)[0]
);

const marketFilterCurrentTypeListBySportIdSelector = createSimpleSelector(
  [
    marketTypeListSelector,
    (_, sportId: string) => sportId,
  ],
  (map, sportId) => map[sportId] || getMarketTypeListBySportId(sportId),
);

export {
  marketPresetSelector,
  marketFilterTypeByTournamentMapSelector,
  marketFilterCurrentTypeListBySportIdSelector,
};
