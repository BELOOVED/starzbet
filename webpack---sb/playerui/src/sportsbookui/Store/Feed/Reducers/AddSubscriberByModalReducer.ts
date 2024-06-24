// @ts-nocheck
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";
import { addSubscriberHandler } from "./Handlers/AddSubscriberHandler";

const addSubscriberByModalReducer = (state, { payload: { type, data } }) => {
  if (type !== EModal.additionalMarkets) {
    return state;
  }

  return addSubscriberHandler(state, data.eventId, eventSubscriberEnum.singleEvent);
};

export { addSubscriberByModalReducer };
