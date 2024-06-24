// @ts-nocheck
import { useParamSelector } from "@sb/utils";
import { canCashOutMyBet } from "../Model/Bet";

const useCanCashOutBetSelector = (betId: string) => useParamSelector(
  canCashOutMyBet,
  [betId],
);

export { useCanCashOutBetSelector };
