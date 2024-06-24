// @ts-nocheck
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";
import { removeSubscriberHandler } from "./Handlers/RemoveSubscriberHandler";

const removeSubscriberByModalReducer = (state, { payload: { type, data } }) => {
  if (type !== EModal.additionalMarkets) {
    return state;
  }

  return removeSubscriberHandler(state, data.eventId, eventSubscriberEnum.singleEvent);
};

export { removeSubscriberByModalReducer };
