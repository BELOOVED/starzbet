import { type TMessageConfig, type TMessageType } from "@sb/messages";
import { isNotNil } from "@sb/utils";
import { type TMessageContent, type TMessageCreationParameters } from "./TMessageContent";

const MESSAGE_AUTO_CLOSE = 5_000;

const messageConfigCreator = <T extends string>(
  type: TMessageType,
  parameters: TMessageCreationParameters<T>,
): TMessageConfig<TMessageContent<T>> => {
  const body = isNotNil(parameters[1])
    ? {
      tKey: parameters[0],
      options: { ...parameters[1] },
    }
    : undefined;

  return {
    closable: true,
    autoClose: MESSAGE_AUTO_CLOSE,
    type,
    position: "top-center",
    content: {
      title: {
        tKey: parameters[0],
        options: {},
      },
      body,
    },
  };
};

export { messageConfigCreator };
