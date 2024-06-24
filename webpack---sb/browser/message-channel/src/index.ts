import { type AbstractMessageChannel, type TMessageHandler } from "./AbstractMessageChannel";
import { BroadcastMessageChannel } from "./BroadcastMessageChannel";
import { LocalStorageMessageChannel } from "./LocalStorageMessageChannel";

class MessageChannel<Message> {
  private readonly channel: AbstractMessageChannel<Message>;

  constructor(messageHandlers: Set<TMessageHandler<Message>>) {
    if (typeof BroadcastChannel === "undefined") {
      this.channel = new LocalStorageMessageChannel<Message>(messageHandlers);
    } else {
      this.channel = new BroadcastMessageChannel<Message>(messageHandlers);
    }
  }

  public postMessage(message: Message) {
    this.channel.postMessage(message);
  }
}

export { MessageChannel };
