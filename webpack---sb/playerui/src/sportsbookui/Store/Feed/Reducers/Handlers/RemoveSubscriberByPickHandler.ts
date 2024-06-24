// @ts-nocheck
import { betSlipPicksSelector } from "../../../BetSlip/Selectors/BetSlipPicksSelectors";
import { eventSubscriberEnum } from "../../Model/EventSubscriberEnum";
import { eventIdByOutcomeIdSelector } from "../../Selectors/FeedSelectors";
import { removeSubscriberHandler } from "./RemoveSubscriberHandler";

const removeSubscriberByPickHandler = (state, outcomeId) => {
  const eventId = eventIdByOutcomeIdSelector(state, outcomeId);

  if (!eventId) {
    return state;
  }
  const picks = betSlipPicksSelector(state);

  if (picks.filter((pick) => pick.eventId === eventId).length <= 1) {
    return removeSubscriberHandler(state, eventId, eventSubscriberEnum.betSlip);
  }

  return state;
};

export { removeSubscriberByPickHandler };
