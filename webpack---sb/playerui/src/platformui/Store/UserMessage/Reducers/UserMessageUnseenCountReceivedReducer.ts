import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageUnseenCountReceivedAction } from "../UserMessageActions";
import { userMessagePropertySelectors } from "../UserMessageSelectors";

const userMessageUnseenCountReceivedReducer: TReducer<TPlatformAppState, typeof userMessageUnseenCountReceivedAction> = (
  state,
  { payload },
) => {
  const unseenCount = userMessagePropertySelectors.unseenCount(state);
  const { unseenCount: nextUnseenCount } = payload;

  if (unseenCount === nextUnseenCount) {
    return state;
  }

  return {
    ...state,
    userMessage: {
      ...state.userMessage,
      unseenCount: nextUnseenCount,
    },
  };
};

export { userMessageUnseenCountReceivedReducer };
