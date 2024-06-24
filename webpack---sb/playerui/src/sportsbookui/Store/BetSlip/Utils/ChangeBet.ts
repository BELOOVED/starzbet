import { getNotNil } from "@sb/utils";
import { isSingleHash, type TBetSlipHash } from "../Model/BetHash";
import type { TBetSlipBet } from "../Model/TBetSlip";

const changeBet = (hash: TBetSlipHash, prevBet: Record<string, TBetSlipBet>, outcomeId: string, value: boolean | undefined = undefined) => {
  const isSingle = isSingleHash(hash);

  const bet = getNotNil(
    isSingle
      ? prevBet[outcomeId]
      : prevBet,
    ["ChangeBet"],
    "Bet",
  );

  const nextBet = { ...bet, applyBoost: value ?? !bet.applyBoost };

  if (isSingle) {
    return { ...prevBet, [outcomeId]: nextBet };
  }

  return nextBet;
};

export { changeBet };
