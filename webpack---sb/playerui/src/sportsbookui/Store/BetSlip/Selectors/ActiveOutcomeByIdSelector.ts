// @ts-nocheck
import { createSimpleSelector } from "@sb/utils";
import { editableBetPicksSelector } from "../../MyBets/Selectors/MyBetsSelectors";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";

const someEqual = (picks, id) => picks.some(({ outcomeId, removed }) => outcomeId === id && !removed);

const idSelector = (_, id: string) => id;

const activePickByBetSlipSelectorFactory = createSimpleSelector(
  [
    betSlipPicksSelector,
    idSelector,
  ],
  someEqual,
);

const activePickByEditableBetSelectorFactory = createSimpleSelector(
  [
    editableBetPicksSelector,
    idSelector,
  ],
  someEqual,
);

const activeOutcomeByIdSelector = createSimpleSelector(
  [
    activePickByBetSlipSelectorFactory,
    activePickByEditableBetSelectorFactory,
  ],
  (a, b) => a || b,
);

export { activeOutcomeByIdSelector };
