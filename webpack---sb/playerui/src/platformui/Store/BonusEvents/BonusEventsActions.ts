import { type TBonusEvent } from "./BonusEventsInitialState";

const bonusEventsModalClosedAction = (eventType: TBonusEvent, skipBonusUpdate = false) => ({
  type: "@PLATFORM/BONUSE_EVENTS_MODAL_CLOSED",
  payload: { eventType, skipBonusUpdate },
});

export { bonusEventsModalClosedAction };
