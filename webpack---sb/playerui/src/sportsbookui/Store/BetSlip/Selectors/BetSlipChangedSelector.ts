// @ts-nocheck
import { createSelector } from "reselect";
import { Time } from "@sb/utils";
import { hasOutrightOutcomeLocked, hasSomeLocked } from "../../Feed/Model/Outcome/HasLocked";
import { eventsSelector, marketsSelector, outcomesSelector, outrightsSelector, scopesSelector } from "../../Feed/Selectors/FeedSelectors";
import { VirtualGamePick } from "../Model/BetPick";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";

const betSlipChangedSelector = createSelector(
  betSlipPicksSelector,
  outcomesSelector,
  marketsSelector,
  scopesSelector,
  eventsSelector,
  outrightsSelector,
  (currentPicks, outcomes, markets, scopes, events, outrights) => (
    currentPicks.some((pick) => {
      if (pick instanceof VirtualGamePick) {
        return Time.isPast(pick.event.startTime);
      }

      const outcome = outcomes[pick.outcomeId];

      if (pick.marketId) {
        const market = markets[pick.marketId];
        const scope = scopes[market.scopeId];
        const event = events[market.eventId];

        if (hasSomeLocked(event, scope, market, outcome)) {
          return true;
        }
      }

      if (pick.outrightId) {
        return hasOutrightOutcomeLocked(outrights[pick.outrightId], outcome);
      }

      return pick.coefficient !== pick.currentCoefficient || pick.updatedAt !== pick.currentUpdatedAt;
    })
  ),
);

export { betSlipChangedSelector };
