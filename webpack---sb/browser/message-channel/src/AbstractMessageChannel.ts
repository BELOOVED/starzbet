import { Logger } from "./Logger";

type TMessageHandler<Message> = (message: Message) => void;

abstract class AbstractMessageChannel<Message> {
  protected readonly messageHandlers: Set<TMessageHandler<Message>>;

  constructor(messageHandlers: Set<TMessageHandler<Message>>, implementation: string) {
    this.messageHandlers = messageHandlers;

    Logger.info.app(`[MessageChannel] ${implementation}`);
  }

  public abstract postMessage(message: Message): void
}

export { type TMessageHandler, AbstractMessageChannel };
