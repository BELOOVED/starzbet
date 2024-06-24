import { createSelector } from "reselect";
import { isFlatOutrightOutcome } from "@sb/betting-core/Feed/Utils";
import { getNotNil } from "@sb/utils";
import { outcomeIdsByOutrightIdAndTypeSelector, outcomesSelector, outrightsSelector } from "../../Feed/Selectors/FeedSelectors";
import { type IWithFeed } from "../../Feed/FeedState";

const outrightIdByOutcomeIdSelector = (outcomeId: string) => (state: IWithFeed) => {
  const outcome = getNotNil(outcomesSelector(state)[outcomeId], ["outrightIdByOutcomeIdSelector"], "outcome");
  if (!isFlatOutrightOutcome(outcome)) {
    throw new Error("[outrightIdByOutcomeIdSelector]: It's not outright outcome");
  }

  return outcome.outrightId;
};

const outrightTypeByOutcomeIdSelector = (outcomeId: string) => createSelector(
  outrightIdByOutcomeIdSelector(outcomeId),
  outrightsSelector,
  (outrightId, outrights) => outrights[outrightId].type,
);

const editOutrightPickIdsByIdSelector = (outcomeId: string) => (state) => outcomeIdsByOutrightIdAndTypeSelector(
  outrightTypeByOutcomeIdSelector(outcomeId)(state),
)(state, outrightIdByOutcomeIdSelector(outcomeId)(state));

export { editOutrightPickIdsByIdSelector };
