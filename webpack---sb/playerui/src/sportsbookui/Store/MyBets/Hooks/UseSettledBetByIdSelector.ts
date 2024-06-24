// @ts-nocheck
import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { isSettled } from "../../../Utils/IsSettled";
import { selectMyBetById } from "../Model/Bet";

const settledBetByIdSelector = createSimpleSelector(
  [
    selectMyBetById,
  ],
  (bet) => isSettled(bet),
);

const useSettledBetByIdSelector = (betId: string) => useParamSelector(
  settledBetByIdSelector,
  [betId],
);

export { useSettledBetByIdSelector };
