import { type TReducer } from "@sb/utils";
import { type  TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageMessageCreatedAction } from "../UserMessageActions";

const userMessageMessageCreatedReducer: TReducer<TPlatformAppState, typeof userMessageMessageCreatedAction> = (
  state,
) => ({
  ...state,
  userMessage: {
    ...state.userMessage,
    unseenCount: state.userMessage.unseenCount + 1,
  },
});

export { userMessageMessageCreatedReducer };
