// @ts-nocheck
import { pickKind } from "../../BetSlip/Model/BetPick";
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";
import { eventIdByOutcomeIdSelector } from "../Selectors/FeedSelectors";
import { addSubscriberHandler } from "./Handlers/AddSubscriberHandler";

const addSubscriberByBetSlipReducer = (state, { payload: { kind, id } }) => {
  if (kind === pickKind.base) {
    const eventId = eventIdByOutcomeIdSelector(state, id);

    if (eventId) {
      return addSubscriberHandler(state, eventId, eventSubscriberEnum.betSlip);
    }
  }

  return state;
};

export { addSubscriberByBetSlipReducer };
