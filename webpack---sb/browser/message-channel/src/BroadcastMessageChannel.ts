import { AbstractMessageChannel, type TMessageHandler } from "./AbstractMessageChannel";

class BroadcastMessageChannel<Message> extends AbstractMessageChannel<Message> {
  private static readonly namespace = "@tabs_manager/broadcast_message_channel@";
  private readonly broadcastChannel: BroadcastChannel;

  constructor(messageHandlers: Set<TMessageHandler<Message>>) {
    super(messageHandlers, "BroadcastChannel");

    this.broadcastChannel = new BroadcastChannel(BroadcastMessageChannel.namespace);

    this.broadcastChannel.onmessage = (event) => {
      this.messageHandlers.forEach((it) => {
        it(event.data as Message);
      });
    };
  }

  public override postMessage(message: Message) {
    this.broadcastChannel.postMessage(message);
  }
}

export { BroadcastMessageChannel };
