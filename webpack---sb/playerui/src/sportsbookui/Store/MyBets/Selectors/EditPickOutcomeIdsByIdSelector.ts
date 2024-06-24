import { isFlatEventOutcome } from "@sb/betting-core/Feed/Utils";
import { outcomesSelector } from "../../Feed/Selectors/FeedSelectors";
import { outcomesByMarketIdSelector } from "../../Feed/Selectors/OutcomesByMarketIdSelector";
import { type TAppState } from "../../InitialState";
import { isIncreaseOddByOutcomeHistorySelector, outcomeBetOrCurrentByIdSelector } from "./MyBetsSelectors";

const editPickOutcomeIdsByIdSelector = (outcomeId: string) => (state: TAppState) => {
  const outcome = outcomeBetOrCurrentByIdSelector(state, outcomeId);

  if (!isFlatEventOutcome(outcome)) {
    throw new Error(`[editPickOutcomeIdsByIdSelector]: Outcome with ${outcomeId} is not event outcome`);
  }

  const ids = outcomesByMarketIdSelector(state, outcome.marketId);

  const outcomes = outcomesSelector(state);

  return ids.filter((id) => !isIncreaseOddByOutcomeHistorySelector(id, outcomes[id]?.coefficient)(state));
};

export { editPickOutcomeIdsByIdSelector };
