import {
  ascend,
  createOptionalPropertySelector,
  createPropertySelector,
  createSimpleSelector,
  descend,
  getNotNil,
  isEmpty,
  isNil,
  sortWith,
} from "@sb/utils";
import { callManagerStartedSelector, type TCallManagerSymbol, type TWithCallManagerState } from "@sb/call-manager";
import { isServiceChatMessage } from "../../Utils/IsServiceChatMessage";
import { isUserChatMessage } from "../../Utils/IsUserChatMessage";
import { EMPTY_CHAT_LOCALE } from "../../Model/TChatLocale";
import { type IUserChatMessage, type TChatMessage } from "../../Model/Message";
import { isChatMessageBlocked } from "../../Utils/IsChatMessageBlocked";
import { type IChatConfigContext } from "../../Context/ChatConfigContext";
import { type IWithChatState } from "../State";
import { chatStateSelector } from "./Selectors";
import { chatLocaleSelector } from "./MetaSelectors";

const chatMessagesSelector = createPropertySelector(
  chatStateSelector,
  "messages",
);

const chatRepliedMessagesSelector = createPropertySelector(
  chatStateSelector,
  "repliedMessages",
);

const chatMessagesCountSelector = (state: IWithChatState, blockedUsersIdsSelector: IChatConfigContext["blockedUsersIdsSelector"]) => {
  const messages = chatMessagesSelector(state);

  if (isEmpty(messages)) {
    return 0;
  }

  const blockedUsersIds = blockedUsersIdsSelector(state);

  return Object
    .values(messages)
    .reduce<number>(
      (acc, message) => {
        if (
          message.deleted ||
          isChatMessageBlocked(message, blockedUsersIds)
        ) {
          return acc;
        }

        return acc + 1;
      },
      0,
    );
};

const chatHasMessagesSelector = createSimpleSelector(
  [chatMessagesCountSelector],
  Boolean,
);

const chatHasNoLoadedMessagesSelector = (
  state: IWithChatState & TWithCallManagerState,
  preloaderCallSymbol: TCallManagerSymbol,
  prevPreloaderCallSymbol: TCallManagerSymbol,
  nextPreloaderCallSymbol: TCallManagerSymbol,
  blockedUsersIdsSelector: IChatConfigContext["blockedUsersIdsSelector"],
): boolean => {
  const loading = callManagerStartedSelector(state, [preloaderCallSymbol, prevPreloaderCallSymbol, nextPreloaderCallSymbol]);

  if (loading) {
    return false;
  }

  return !chatHasMessagesSelector(state, blockedUsersIdsSelector);
};

const chatSortedByDateMessagesIdsSelector = (state: IWithChatState, blockedUsersIdsSelector: IChatConfigContext["blockedUsersIdsSelector"]) => {
  const messages = chatMessagesSelector(state);
  const blockedUsersIds = blockedUsersIdsSelector(state);

  /**
   * Sort by messageId needed for sync messages order with backend.
   * Messages can have same timestamps.
   */
  return sortWith(
    [
      ascend((message) => message.timestamp),
      descend((message) => message.id),
    ],
    Object.values(messages),
  ).reduce<string[]>(
    (acc, message) => {
      if (
        message.deleted ||
        isChatMessageBlocked(message, blockedUsersIds)
      ) {
        return acc;
      }

      acc.push(message.id);

      return acc;
    },
    [],
  );
};

const chatSortedByDateMessagesSelector = (state: IWithChatState, blockedUsersIdsSelector: IChatConfigContext["blockedUsersIdsSelector"]) => {
  const messages = chatMessagesSelector(state);
  const blockedUsersIds = blockedUsersIdsSelector(state);

  /**
   * Sort by messageId needed for sync messages order with backend.
   * Messages can have same timestamps.
   */
  return sortWith(
    [
      ascend((message) => message.timestamp),
      descend((message) => message.id),
    ],
    Object.values(messages),
  ).reduce<IUserChatMessage[]>(
    (acc, message) => {
      const isAuthorBlocked = !isServiceChatMessage(message) && blockedUsersIds.includes(message.author.id);
      const isServiceMessageAuthorBlocked = isServiceChatMessage(message) && blockedUsersIds.includes(message.subjectId);

      if (
        isAuthorBlocked ||
        isServiceMessageAuthorBlocked ||
        isServiceChatMessage(message)
      ) {
        return acc;
      }

      acc.push(message);

      return acc;
    },
    [],
  );
};

const findChatMessageByIdSelector = (state: IWithChatState, messageId: string) =>
  chatMessagesSelector(state)[messageId];

const findChatRepliedMessageByIdSelector = (state: IWithChatState, messageId: string): null | TChatMessage => {
  const repliedMessage = chatRepliedMessagesSelector(state)[messageId];

  if (!repliedMessage) {
    return null;
  }

  if (repliedMessage.deleted) {
    return null;
  }

  return repliedMessage ?? null;
};

const getChatMessageByIdSelector = (state: IWithChatState, messageId: string) =>
  getNotNil(
    chatMessagesSelector(state)[messageId],
    ["ChatMessagesSelectors.ts", "getChatMessageByIdSelector"],
    `chatMessagesSelector(state)[${messageId}]`,
  );

const getChatRepliedMessageByIdSelector = (state: IWithChatState, messageId: string) => {
  const message = getNotNil(
    chatRepliedMessagesSelector(state)[messageId],
    ["ChatMessagesSelectors.ts", "getChatRepliedMessageByIdSelector"],
    `getChatRepliedMessageByIdSelector(state)[${messageId}]`,
  );

  if (isServiceChatMessage(message)) {
    throw new Error("Cannot reply to ServiceMessage");
  }

  return message;
};

const chatUserMessageByIdSelectorFactory = <M extends IUserChatMessage>() =>
  (state: IWithChatState, messageId: string) =>
    chatUserMessageByIdSelector(state, messageId) as M;

const chatUserMessageByIdSelector = (state: IWithChatState, messageId: string) => {
  const message = getNotNil(
    chatMessagesSelector(state)[messageId],
    ["ChatMessagesSelectors.ts", "chatUserMessageByIdSelector"],
    `chatMessagesSelector(state)[${messageId}]`,
  );

  if (isServiceChatMessage(message)) {
    throw new Error("Message with type SERVICE_MESSAGE cannot be selected in chatUserMessageByIdSelector");
  }

  return message;
};

const chatServiceMessageByIdSelector = (state: IWithChatState, messageId: string) => {
  const message = getNotNil(
    chatMessagesSelector(state)[messageId],
    ["ChatMessagesSelectors.ts", "chatServiceMessageByIdSelector"],
    `chatMessagesSelector(state)[${messageId}]`,
  );

  if (isUserChatMessage(message)) {
    throw new Error("Message with type USER_MESSAGE cannot be selected in chatServiceMessageByIdSelector");
  }

  return message;
};

const messageAuthorByIdSelector = createPropertySelector(
  chatUserMessageByIdSelector,
  ["author", "name"],
);

const messageAuthorIdByMessageIdSelector = (state: IWithChatState, messageId: string) => {
  const message = getChatMessageByIdSelector(state, messageId);

  if (isServiceChatMessage(message)) {
    return message.subjectId;
  }

  return message.author.id;
};

const messageSubjectNameByIdSelector = createOptionalPropertySelector(
  chatServiceMessageByIdSelector,
  "subjectName",
);

const messageSubjectIdByIdSelector = createOptionalPropertySelector(
  chatServiceMessageByIdSelector,
  "subjectId",
);

const messageTypeByIdSelector = createPropertySelector(
  getChatMessageByIdSelector,
  "type",
);

const messageTextByIdSelector = (state: IWithChatState, messageId: string, userId: string | null) => {
  const message = chatUserMessageByIdSelector(state, messageId);
  const locale = chatLocaleSelector(state);

  if (locale === EMPTY_CHAT_LOCALE || message.translates[locale] === undefined || message.author.id === userId) {
    return message.text;
  }

  return message.translates[locale];
};

const messageRepliedSelector = (state: IWithChatState, messageId: string) => {
  const { repliedTo } = chatUserMessageByIdSelector(state, messageId);
  const repliedMessages = chatRepliedMessagesSelector(state);

  if (isNil(repliedTo)) {
    return null;
  }

  return repliedMessages[repliedTo];
};

const chatTranslatesLoadingSelector = (state: IWithChatState, messageId: string, userId: string | null) => {
  const locale = chatLocaleSelector(state);
  const message = chatUserMessageByIdSelector(state, messageId);

  const timestamp = message.originalMessageTimestamp;

  if (timestamp === undefined || locale === EMPTY_CHAT_LOCALE || message.author.id === userId) {
    return false;
  }

  return Date.now() - message.timestamp < 300;
};

export {
  chatMessagesCountSelector,
  chatSortedByDateMessagesIdsSelector,
  getChatMessageByIdSelector,
  chatHasMessagesSelector,
  chatHasNoLoadedMessagesSelector,
  messageAuthorByIdSelector,
  messageTextByIdSelector,
  messageAuthorIdByMessageIdSelector,
  messageSubjectIdByIdSelector,
  messageSubjectNameByIdSelector,
  messageTypeByIdSelector,
  messageRepliedSelector,
  chatTranslatesLoadingSelector,
  findChatMessageByIdSelector,
  findChatRepliedMessageByIdSelector,
  getChatRepliedMessageByIdSelector,
  chatUserMessageByIdSelector,
  chatSortedByDateMessagesSelector,
  chatUserMessageByIdSelectorFactory,
};
