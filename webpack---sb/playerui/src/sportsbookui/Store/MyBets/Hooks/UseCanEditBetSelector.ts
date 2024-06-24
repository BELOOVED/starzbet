// @ts-nocheck
import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { cashOutStateSelector } from "../../CashOut/CashOutSelectors";
import { canEditMyBet } from "../Model/Bet";

const canEditBetSelectorFactory = createSimpleSelector(
  [
    canEditMyBet,
    cashOutStateSelector,
    (_, betId: string) => betId,
  ],
  (canEdit, cashOutState, betId) => {
    const cashOut = cashOutState?.[betId];

    return canEdit && !cashOut?.inProgress && !cashOut?.success;
  },
);

const useCanEditBetSelector = (betId: string) => useParamSelector(
  canEditBetSelectorFactory,
  [betId],
);

export { useCanEditBetSelector };
