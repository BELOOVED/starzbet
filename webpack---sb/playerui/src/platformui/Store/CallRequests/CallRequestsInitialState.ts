import type { TPlatform_CallOption_Fragment, TPlatform_CallRequest_Fragment, TPlatform_Slot_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPageInfo_Fragment } from "@sb/graphql-client";
import { type IWithCursor } from "../Paginator/IWithCursor";

interface ICallRequestState {
  callRequests: {
    requests: TPlatform_CallRequest_Fragment[];
    pageInfo: TPageInfo_Fragment;
    options: TPlatform_CallOption_Fragment[];
    activeActualSlots: Record<string, TPlatform_Slot_Fragment>;
    variables: IWithCursor;
  };
}

const callRequestsInitialState: ICallRequestState = {
  callRequests: {
    requests: [],
    activeActualSlots: {},
    options: [],
    pageInfo: {} as TPageInfo_Fragment,
    variables: {
      cursor: { first: 20 },
    },
  },
};

export { callRequestsInitialState, type ICallRequestState };
