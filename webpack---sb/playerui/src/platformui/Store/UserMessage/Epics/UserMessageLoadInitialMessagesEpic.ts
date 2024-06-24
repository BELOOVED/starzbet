import { EMPTY } from "rxjs";
import { platformUserMessagesQueryOptionalFields, query_Platform_UserMessages } from "@sb/graphql-client/PlayerUI";
import { extractNodesFromEdges } from "@sb/utils";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { userMessageMessagesWasLoadedSelector } from "../UserMessageSelectors";
import { USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL } from "../UserMessageVariables";
import { userMessageInitialMessagesReceivedAction } from "../UserMessageActions";

const userMessageLoadInitialMessagesEpic: TPlatformEpic = (action$, state$, deps) => {
  const wasLoaded = userMessageMessagesWasLoadedSelector(state$.value);

  if (wasLoaded) {
    return EMPTY;
  }

  return gqlLoadingFactory(
    USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL,
    query_Platform_UserMessages,
    {
      optionalFields: platformUserMessagesQueryOptionalFields,
      variables: { cursor: { first: 20 } },
    },
    userMessageInitialMessagesReceivedAction,
    ({ platform: { UserMessages } }) => [
      extractNodesFromEdges(UserMessages),
      UserMessages.pageInfo,
    ],
  )(action$, state$, deps);
};

export { userMessageLoadInitialMessagesEpic };
