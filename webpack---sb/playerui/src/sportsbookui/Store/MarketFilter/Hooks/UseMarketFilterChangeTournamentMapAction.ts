import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { marketFilterChangeTournamentMapAction } from "../MarketFilterActions";

const useMarketFilterChangeTournamentMapAction = (tournamentId: string) => {
  const dispatch = useDispatch();

  return useCallback(
    (marketType: EMarketType) => dispatch(marketFilterChangeTournamentMapAction(tournamentId, marketType)),
    [tournamentId],
  );
};

export { useMarketFilterChangeTournamentMapAction };
