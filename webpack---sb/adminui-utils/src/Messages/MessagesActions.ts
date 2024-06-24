import { createMessageAction, type TMessageType } from "@sb/messages";
import { messageConfigCreator } from "./MessageConfigCreator";
import { type TMessageContent, type TMessageCreationParameters } from "./TMessageContent";

const messageActionCreator = (type: TMessageType) =>
  <T extends string>(...parameters: TMessageCreationParameters<T>) =>
    createMessageAction<TMessageContent<T>>(messageConfigCreator(type, parameters));

const appServiceShowSuccessMessageAction = messageActionCreator("success");

const appServiceShowWarnMessageAction = messageActionCreator("warning");

const appServiceShowErrorMessageAction = messageActionCreator("error");

const appServiceShowInfoMessageAction = messageActionCreator("info");

export {
  appServiceShowInfoMessageAction,
  appServiceShowErrorMessageAction,
  appServiceShowWarnMessageAction,
  appServiceShowSuccessMessageAction,
};
