import { type TReducer } from "@sb/utils";
import { type ICallRequestState } from "../CallRequestsInitialState";
import { type callRequestsReceivedAction } from "../CallRequestsActions";

const callRequestsReceivedReducer: TReducer<ICallRequestState, typeof callRequestsReceivedAction> = (
  state,
  {
    payload: {
      requests,
      pageInfo,
    },
  },
) => ({
  ...state,
  callRequests: {
    ...state.callRequests,
    requests,
    pageInfo,
  },
});

export { callRequestsReceivedReducer };
