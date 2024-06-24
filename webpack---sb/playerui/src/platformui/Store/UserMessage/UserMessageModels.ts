import { isObject, isString, type TExplicitAny } from "@sb/utils";

type TUserMessageSubscriptionPayload = {
  messageId: string;
  type: EUserMessageAction;
};

enum EUserMessageAction {
  created = "CREATED",
  updated = "UPDATED",
  deleted = "DELETED",
}

enum EUserMessageState {
  loading = "LOADING",
  empty = "EMPTY",
  full = "FULL"
}

const userMessageActions = Object.values(EUserMessageAction);

const isUserMessageSubscription = (source: TExplicitAny): source is TUserMessageSubscriptionPayload => {
  if (!isObject(source)) {
    return false;
  }

  const { messageId, type } = source as Record<string, string>;

  if (!isString(messageId)) {
    return false;
  }

  return userMessageActions.includes(type as EUserMessageAction);
};

export { EUserMessageAction, EUserMessageState, isUserMessageSubscription };
