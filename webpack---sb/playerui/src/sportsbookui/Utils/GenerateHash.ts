import { type TBet, type TBetPickEntry } from "../Store/MyBets/Model/TBet";
import { isNotDuplicate, isNotRemoved } from "../Store/MyBets/Model/Bet";

const generateHash = (bet: TBet, picks: TBetPickEntry[]) => {
  const filtered = picks.filter(isNotRemoved).filter(isNotDuplicate);

  return bet.picks.length === filtered.length
    ? bet.hash
    : `${filtered.length}/${filtered.length}`;
};

export { generateHash };
