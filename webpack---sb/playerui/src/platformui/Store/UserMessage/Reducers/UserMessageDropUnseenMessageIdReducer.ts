import { type TReducer } from "@sb/utils";
import { setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageDropUnseenMessageIdAction } from "../UserMessageActions";

const userMessageDropUnseenMessageIdReducer: TReducer<TPlatformAppState, typeof userMessageDropUnseenMessageIdAction> = (
  state,
) => {
  setLocalStorage(platformLocalStorageKeys.lastClosedUserMessageId, state.userMessage.unseenId);

  return {
    ...state,
    userMessage: {
      ...state.userMessage,
      unseenId: null,
    },
  };
};

export { userMessageDropUnseenMessageIdReducer };
