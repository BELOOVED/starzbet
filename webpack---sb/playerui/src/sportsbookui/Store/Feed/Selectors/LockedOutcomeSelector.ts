import { createSimpleSelector, getNotNil, Time } from "@sb/utils";
import { isFlatOutrightOutcome } from "@sb/betting-core/Feed/Utils";
import { betSlipPicksSelector } from "../../BetSlip/Selectors/BetSlipPicksSelectors";
import { VirtualGamePick } from "../../BetSlip/Model/BetPick";
import { isVirtualPick } from "../../BetSlip/Model/Utils";
import { type TAppState } from "../../InitialState";
import { hasOutrightOutcomeLocked, hasSomeLocked, hasSomeParentLocked } from "../Model/Outcome/HasLocked";
import {
  eventByMarketIdSelector,
  eventsSelector,
  marketByIdSelector,
  marketsSelector,
  outcomeByIdSelector,
  outrightsSelector,
  scopeByMarketIdSelector,
  scopesSelector,
} from "./FeedSelectors";

const lockedOutcomeSelector = (state: TAppState, id: string) => {
  const picks = betSlipPicksSelector(state);

  const pick = picks.find((pick) => pick.is(id) && pick instanceof VirtualGamePick);

  if (isVirtualPick(pick)) {
    return Time.isPast(pick.event.startTime);
  }

  const outcome = getNotNil(outcomeByIdSelector(state, id), ["LockedOutcomeSelector"], "Outcome");

  if (isFlatOutrightOutcome(outcome)) {
    const outrights = outrightsSelector(state);

    return hasOutrightOutcomeLocked(getNotNil(outrights[outcome.outrightId], ["LockedOutcomeSelector"], "Outright"), outcome);
  }

  const markets = marketsSelector(state);
  const scopes = scopesSelector(state);
  const events = eventsSelector(state);

  const market = getNotNil(markets[outcome.marketId], ["LockedOutcomeSelector"], "Market");
  const scope = getNotNil(scopes[market.scopeId], ["LockedOutcomeSelector"], "Scope");
  const event = getNotNil(events[market.eventId], ["LockedOutcomeSelector"], "Event");

  return hasSomeLocked(event, scope, market, outcome);
};

const lockedMarketSelector = createSimpleSelector(
  [
    eventByMarketIdSelector,
    scopeByMarketIdSelector,
    marketByIdSelector,
  ],
  hasSomeParentLocked,
);

export {
  lockedOutcomeSelector,
  lockedMarketSelector,
};
