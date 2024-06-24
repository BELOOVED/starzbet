import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageStartLoadingMessageDetailsAction } from "../UserMessageActions";

const userMessageStartLoadingMessageDetailsReducer: TReducer<TPlatformAppState, typeof userMessageStartLoadingMessageDetailsAction> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  userMessage: {
    ...state.userMessage,
    detailedId: id,
  },
});

export { userMessageStartLoadingMessageDetailsReducer };
