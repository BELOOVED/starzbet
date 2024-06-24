import { type TExplicitAny } from "@sb/utils";
import { type TChatScrollDirection } from "../Model/TChatScrollDirection";
import { type TChatLocale } from "../Model/TChatLocale";
import { type IServiceChatMessage, type IUserChatMessage, type TBaseChatMessage } from "../Model/Message";

type TAction<T = never> = {
  type: string;
  payload: {
    data: T;
  };
}

const actionFactory = <P extends TExplicitAny>(type: string) => (payload?: P): TAction<P> => ({
  type,
  payload: {
    data: payload as P,
  },
});

interface IChatMessagesFetchedDto {
  messages: TBaseChatMessage[];
  repliedMessages: TBaseChatMessage[];
}

const chatMessagesFetchedAction = actionFactory<IChatMessagesFetchedDto>("@COM.CHAT/MESSAGES_FETCHED");

interface IChatMessagesFetchedByCursorDto {
  messages: TBaseChatMessage[];
  repliedMessages: TBaseChatMessage[];
  preservedMessages?: IUserChatMessage[];
  clean?: boolean;
  direction?: "up" | "down";
}

const chatMessagesFetchedByCursorAction = actionFactory<IChatMessagesFetchedByCursorDto>("@COM.CHAT/MESSAGES_FETCHED_BY_CURSOR");

interface IChatMessageUpdatedDto {
  message: IUserChatMessage;
  repliedMessages: TBaseChatMessage[];
}

const chatMessageUpdatedAction = actionFactory<IChatMessageUpdatedDto>("@COM.CHAT/MESSAGE_UPDATED");

interface IChatMessageDeletedDto {
  messageId: string;
}

const chatMessageDeletedAction = actionFactory<IChatMessageDeletedDto>("@COM.CHAT/MESSAGE_DELETED");

interface IChatIntrospectionUpdatedDto {
  message: IServiceChatMessage;
  usersOnline: number;
}

const chatIntrospectionUpdatedAction = actionFactory<IChatIntrospectionUpdatedDto>("@COM.CHAT/INTROSPECTION_UPDATED");

const chatOnlineUsersCountUpdatedAction = actionFactory<number>("@COM.CHAT/ONLINE_USERS_COUNT_UPDATED");

const chatActiveMessageChangedAction = actionFactory<string>("@COM.CHAT/ACTIVE_MESSAGE_CHANGED");

const chatReplyModeChangedAction = actionFactory("@COM.CHAT/REPLY_MODE_CHANGED");

const chatLocaleChangedAction = actionFactory<TChatLocale>("@COM.CHAT/LOCALE_CHANGED");

const chatLocaleChangingDialogVisibilityChangedAction = actionFactory<boolean>("@COM.CHAT/LOCALE_CHANGING_DIALOG_VISIBILITY_CHANGED");

interface IChatFetchingMessageByCursorFiredDto {
  direction: TChatScrollDirection;
  cursorMessageId: string;
}

const chatFetchingMessageByCursorFiredAction = actionFactory<IChatFetchingMessageByCursorFiredDto>("@COM.CHAT/FETCHING_MESSAGES_BY_CURSOR_FIRED");

const chatMessageHighlightedAction = actionFactory<string>("@COM.CHAT/MESSAGE_HIGHLIGHTED");

const chatMessageHighlightHiddenAction = actionFactory("@COM.CHAT/MESSAGE_HIGHLIGHT_HIDDEN");

const chatActiveMessageClosedAction = actionFactory("@COM.CHAT/ACTIVE_MESSAGE_CLOSED");

const chatCleanedAction = actionFactory("@COM.CHAT/CLEANED");

const chatScrollToBottomFiredAction = actionFactory("@COM.CHAT/SCROLL_TO_BOTTOM_FIRED");

export {
  chatMessagesFetchedByCursorAction,
  chatMessageUpdatedAction,
  chatMessageDeletedAction,
  chatCleanedAction,
  chatOnlineUsersCountUpdatedAction,
  chatFetchingMessageByCursorFiredAction,
  chatIntrospectionUpdatedAction,
  chatActiveMessageChangedAction,
  chatActiveMessageClosedAction,
  chatReplyModeChangedAction,
  chatLocaleChangedAction,
  chatLocaleChangingDialogVisibilityChangedAction,
  chatMessageHighlightedAction,
  chatMessageHighlightHiddenAction,
  chatMessagesFetchedAction,
  chatScrollToBottomFiredAction,
};
