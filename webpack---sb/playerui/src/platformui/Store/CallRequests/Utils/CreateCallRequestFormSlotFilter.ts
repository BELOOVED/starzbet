import { type TPlatform_Slot_Fragment } from "@sb/graphql-client/PlayerUI";
import { type ELocale, Time } from "@sb/utils";
import { CALL_REQUESTS_VOID_REQUEST_STATUSES } from "../CallRequestVariables";

const callRequestsIsSlotMatchWithDate = (slot: TPlatform_Slot_Fragment, date: string | Date, locale: ELocale, offset: number) => {
  const a = Time.format(Number(slot.startTime), "dd/MM/yyyy", { locale, offset });
  const b = Time.format(
    Number(date),
    "dd/MM/yyyy",
    {
      locale,
      offset,
    },
  );

  return a === b;

  return Time.isSameDay(Number(slot.startTime), Number(date), { locale, offset });
};

const callRequestsIsSlotMaxCountExceeded = (slot: TPlatform_Slot_Fragment) => {
  const requestedCount = slot
    .callRequests
    .filter((callRequest) => !CALL_REQUESTS_VOID_REQUEST_STATUSES.includes(callRequest.status))
    .length;

  return requestedCount >= slot.maxCallCount;
};

const createCallRequestFormSlotFilter = (slot: TPlatform_Slot_Fragment, date: string | undefined, locale: ELocale, offset: number) =>
  !date || !callRequestsIsSlotMatchWithDate(slot, date, locale, offset) || callRequestsIsSlotMaxCountExceeded(slot);

export { createCallRequestFormSlotFilter, callRequestsIsSlotMatchWithDate };
