import { type TReducer } from "@sb/utils";
import { type TPlatform_Slot_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type callRequestsSlotsReceivedAction } from "../CallRequestsActions";

const callRequestsSlotsReceivedReducer: TReducer<TPlatformAppState, typeof callRequestsSlotsReceivedAction> = (state, { payload }) => ({
  ...state,
  callRequests: {
    ...state.callRequests,
    activeActualSlots: payload.reduce<Record<string, TPlatform_Slot_Fragment>>(
      (acc, value) => {
        acc[value.id] = value;

        return acc;
      },
      {},
    ),
  },
});

export { callRequestsSlotsReceivedReducer };
