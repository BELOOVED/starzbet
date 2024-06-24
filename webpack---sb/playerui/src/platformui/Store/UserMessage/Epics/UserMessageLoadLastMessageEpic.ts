import { EMPTY } from "rxjs";
import { platformUserMessagesQueryOptionalFields, query_Platform_UserMessages } from "@sb/graphql-client/PlayerUI";
import { extractNodesFromEdges } from "@sb/utils";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { userMessagesIsMessagesRouteMatchedSelector } from "../UserMessageSelectors";
import { USER_MESSAGE_LAST_MESSAGE_LOADING_SYMBOL } from "../UserMessageVariables";
import { userMessageLastMessageReceivedAction } from "../UserMessageActions";

const userMessageLoadLastMessageEpic: TPlatformEpic = (action$, state$, deps) => {
  const isMessagesRoute = userMessagesIsMessagesRouteMatchedSelector(state$.value);

  if (isMessagesRoute) {
    return EMPTY;
  }

  return gqlLoadingFactory(
    USER_MESSAGE_LAST_MESSAGE_LOADING_SYMBOL,
    query_Platform_UserMessages,
    {
      optionalFields: platformUserMessagesQueryOptionalFields,
      variables: { cursor: { first: 1 } },
    },
    userMessageLastMessageReceivedAction,
    ({ platform: { UserMessages } }) => {
      const messages = extractNodesFromEdges(UserMessages);

      return [messages[0] ?? null];
    },
  )(action$, state$, deps);
};

export { userMessageLoadLastMessageEpic };
