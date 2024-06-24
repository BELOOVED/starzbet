import { type TPageInfo_Fragment } from "@sb/graphql-client";
import type { TPlatform_CallOption_Fragment, TPlatform_CallRequest_Fragment, TPlatform_Slot_Fragment } from "@sb/graphql-client/PlayerUI";

const callRequestsReceivedAction = (requests: TPlatform_CallRequest_Fragment[], pageInfo: TPageInfo_Fragment) => ({
  type: "@CALL_REQUESTS/REQUESTS_RECEIVED",
  payload: { requests, pageInfo },
});

const callRequestsCallOptionsReceivedAction = (payload: TPlatform_CallOption_Fragment[]) => ({
  type: "@CALL_REQUESTS/CALL_OPTIONS_RECEIVED",
  payload,
});

const callRequestsSlotsReceivedAction = (payload: TPlatform_Slot_Fragment[]) => ({
  type: "@CALL_REQUESTS/SLOTS_RECEIVED",
  payload,
});

const cancelCallRequestAction = (callRequestId: string) => ({
  type: "@CALL_REQUESTS/CANCEL_REQUEST",
  payload: { callRequestId },
});

const callRequestsNextPageAction = () => ({
  type: "@CALL_REQUESTS/NEXT_PAGE",
});

const callRequestsPrevPageAction = () => ({
  type: "@CALL_REQUESTS/PREV_PAGE",
});

export {
  callRequestsReceivedAction,
  callRequestsCallOptionsReceivedAction,
  callRequestsSlotsReceivedAction,
  cancelCallRequestAction,
  callRequestsNextPageAction,
  callRequestsPrevPageAction,
};
