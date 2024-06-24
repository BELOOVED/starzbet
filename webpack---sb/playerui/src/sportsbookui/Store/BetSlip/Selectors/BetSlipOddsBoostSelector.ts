import { getNotNil } from "@sb/utils";
import type { TAppState } from "../../InitialState";

const betSlipOddsBoostSelector = ({ betSlip: { bets } }: TAppState, outcomeId: string, hash: string) => {
  const bet = getNotNil(bets[hash]?.[outcomeId], ["betSlipOddsBoostSelector"], `Bet by hash ${hash} and ID ${outcomeId}`);

  return bet.applyBoost;
};

export { betSlipOddsBoostSelector };
