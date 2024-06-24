import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { createSimpleSelector, getNotNil, Time } from "@sb/utils";
import { betSlipPickByOutcomeIdSelector } from "../../BetSlip/Selectors/BetSlipSelectors";
import { VirtualGamePick } from "../../BetSlip/Model/BetPick";
import { eventsSelector, outcomeByIdSelector } from "./FeedSelectors";

const livePickByOutcomeIdSelector = createSimpleSelector(
  [
    outcomeByIdSelector,
    betSlipPickByOutcomeIdSelector,
    eventsSelector,
  ],
  (outcome, pick, events) => {
    if (pick instanceof VirtualGamePick) {
      return Time.isPast(pick.event.startTime);
    }

    if (!pick || (outcome && outcome.hasOwnProperty("outrightId"))) {
      return false;
    }

    return isLive(getNotNil(events[pick.eventId], ["LivePickByOutcomeIdSelector"], "Event").status);
  },
);

export { livePickByOutcomeIdSelector };
