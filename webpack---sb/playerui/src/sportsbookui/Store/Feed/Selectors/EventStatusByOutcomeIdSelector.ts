import { getNotNil, createSimpleSelector } from "@sb/utils";
import { isFlatEventOutcome } from "@sb/betting-core/Feed/Utils";
import { eventsSelector, marketsSelector, outcomeByIdSelector } from "./FeedSelectors";

const eventStatusByOutcomeIdSelector = createSimpleSelector(
  [
    outcomeByIdSelector,
    eventsSelector,
    marketsSelector,
  ],
  (outcome, events, markets) => {
    if (!isFlatEventOutcome(outcome)) {
      throw new Error(`[eventStatusByOutcomeIdSelector]: outcome with ${outcome?.id} is not event outcome`);
    }

    const market = getNotNil(markets[outcome.marketId], ["eventStatusByOutcomeIdSelector"], "market");
    const event = getNotNil(events[market.eventId], ["eventStatusByOutcomeIdSelector"], "event");

    return event.status;
  },
);
export { eventStatusByOutcomeIdSelector };
