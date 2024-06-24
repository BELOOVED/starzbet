import {
  platformUserMessageQueryOptionalFields,
  platformUserMessageWithoutSeenQueryOptionalFields,
  query_Platform_UserMessage,
  query_Platform_UserMessageWithoutSeen,
} from "@sb/graphql-client/PlayerUI";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { USER_MESSAGE_MESSAGE_LOADING_SYMBOL } from "../UserMessageVariables";
import { userMessageMessageReceivedAction } from "../UserMessageActions";
import { userMessageFindMessageByIdSelector } from "../UserMessageSelectors";

const userMessageLoadMessageByIdEpicFactory = (id: string): TPlatformEpic => gqlLoadingFactory(
  [USER_MESSAGE_MESSAGE_LOADING_SYMBOL, id],
  query_Platform_UserMessage,
  {
    optionalFields: platformUserMessageQueryOptionalFields,
    variables: { id },
  },
  userMessageMessageReceivedAction,
  ({ platform: { UserMessage } }) => [UserMessage, false],
);

const userMessageLoadMessageWithoutSeenByIdEpicFactory = (id: string, created = false): TPlatformEpic =>
  (action$, state$, deps) => gqlLoadingFactory(
    [USER_MESSAGE_MESSAGE_LOADING_SYMBOL, id],
    query_Platform_UserMessageWithoutSeen,
    {
      optionalFields: platformUserMessageWithoutSeenQueryOptionalFields,
      variables: { id },
    },
    userMessageMessageReceivedAction,
    ({ platform: { NotSeenUserMessage } }) => {
      const nextMessage = { ...NotSeenUserMessage };

      const message = userMessageFindMessageByIdSelector(state$.value, id);

      if (message) {
        nextMessage.seenAt = message.seenAt;
      }

      return [nextMessage, created];
    },
  )(action$, state$, deps);

export { userMessageLoadMessageByIdEpicFactory, userMessageLoadMessageWithoutSeenByIdEpicFactory };

