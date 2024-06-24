import { createSimpleSelector } from "@sb/utils";
import { betSlipPicksSelector } from "../Selectors/BetSlipPicksSelectors";

const disableBetSlipPickSelector = createSimpleSelector(
  [
    betSlipPicksSelector,
    (_, outcomeId: string) => outcomeId,
  ],
  (picks, outcomeId) => Boolean(picks.find((pick) => pick.is(outcomeId))?.disable),
);

export { disableBetSlipPickSelector };
