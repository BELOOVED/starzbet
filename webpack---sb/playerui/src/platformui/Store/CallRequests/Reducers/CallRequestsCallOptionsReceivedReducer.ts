import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type callRequestsCallOptionsReceivedAction } from "../CallRequestsActions";

const callRequestsCallOptionsReceivedReducer: TReducer<TPlatformAppState, typeof callRequestsCallOptionsReceivedAction> =
  (state, { payload }) => ({
    ...state,
    callRequests: {
      ...state.callRequests,
      options: payload,
    },
  });

export { callRequestsCallOptionsReceivedReducer };
