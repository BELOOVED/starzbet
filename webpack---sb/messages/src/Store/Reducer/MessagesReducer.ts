import { createRootReducer } from "@sb/utils";
import { type IMessagesState } from "../../Types/IMessagesState";
import {
  createMessageAction,
  deleteAllMessagesAction,
  deleteMessageAction,
  setMessageFallbackPositionAction,
} from "../Actions/MessagesActions";
import { allMessagesDeletion, messageCreation, messageDeletion } from "../Helpers/MessagesHelpers";

const messageCreationReducer = (
  state: IMessagesState,
  { payload }: ReturnType<typeof createMessageAction>,
): IMessagesState => messageCreation(state, payload);

const messageDeletionReducer = (
  state: IMessagesState,
  { payload }: ReturnType<typeof deleteMessageAction>,
): IMessagesState => messageDeletion(state, payload.id);

const allMessagesDeletionReducer = (
  state: IMessagesState,
): IMessagesState => allMessagesDeletion(state);

const settingFallbackMessagePositionReducer = (
  state: IMessagesState,
  { payload }: ReturnType<typeof setMessageFallbackPositionAction>,
): IMessagesState => ({
  ...state,
  fallbackPosition: payload.position,
});

const messagesReducer = createRootReducer<IMessagesState>([
  [messageCreationReducer, createMessageAction],
  [messageDeletionReducer, deleteMessageAction],
  [allMessagesDeletionReducer, deleteAllMessagesAction],
  [settingFallbackMessagePositionReducer, setMessageFallbackPositionAction],
]);

export { messagesReducer };
