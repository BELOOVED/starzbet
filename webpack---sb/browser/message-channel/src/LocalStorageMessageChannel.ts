import { JSONParse } from "@sb/utils";
import { AbstractMessageChannel, type TMessageHandler } from "./AbstractMessageChannel";

class LocalStorageMessageChannel<Message> extends AbstractMessageChannel<Message> {
  private static readonly namespace = "@tabs_manager/local_storage_message_channel@";

  constructor(messageHandlers: Set<TMessageHandler<Message>>) {
    super(messageHandlers, "localStorage");

    Object.keys(localStorage).forEach((key) => {
      if (LocalStorageMessageChannel.isMessageKey(key)) {
        localStorage.removeItem(key);
      }
    });

    window.addEventListener(
      "storage",
      (event) => {
        const { key, newValue } = event;

        if (
          key === null ||
          newValue === null
        ) {
          return;
        }

        if (!LocalStorageMessageChannel.isMessageKey(key)) {
          return;
        }

        const message = JSONParse<Message>(newValue);

        this.messageHandlers.forEach((it) => {
          it(message);
        });
      },
    );
  }

  public override postMessage(message: Message) {
    const key = LocalStorageMessageChannel.createMessageKey();

    localStorage.setItem(key, JSON.stringify(message));

    setTimeout(
      () => {
        localStorage.removeItem(key);
      },
      250,
    );
  }

  private static createMessageKey(): string {
    return `${LocalStorageMessageChannel.namespace}-${Math.random()}`;
  }

  private static isMessageKey(key: string): boolean {
    return key.startsWith(LocalStorageMessageChannel.namespace);
  }
}

export { LocalStorageMessageChannel };
