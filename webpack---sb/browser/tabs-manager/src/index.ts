import { MessageChannel } from "@sb/message-channel";
import { getNotNil, isE2E } from "@sb/utils";

enum ETabStatus {
  follower = "follower",
  leader = "leader",
}

enum EEventType {
  statusChange = "statusChange",
  message = "message",
}

type TStatusChangeEvent = {
  status: ETabStatus;
};

type TMessageEvent<Message> = {
  message: Message;
  _namespace: string;
};

type TStatusChangeEventListener = (event: TStatusChangeEvent) => void;

type TMessageEventListener<Message> = (event: TMessageEvent<Message>) => void;

type TInstanceMessageEventListener = TMessageEventListener<unknown> & { original: TMessageEventListener<unknown>; };

type TEventListener<Message> = TStatusChangeEventListener | TMessageEventListener<Message>;

type TListeners = {
  [EEventType.statusChange]: Set<TStatusChangeEventListener>;
  [EEventType.message]: Set<TInstanceMessageEventListener>;
};

type TCommunicator = MessageChannel<TMessageEvent<unknown>>;

const maybePolyfill = () =>
  navigator.locks === undefined
    ? import(/* webpackChunkName: "navigator-locks-polyfill" */"navigator.locks")
    : Promise.resolve();

class TabsManager<Message> {
  private static _listeners: null | TListeners = null;
  private static _communicator: null | TCommunicator = null;
  private static _status: ETabStatus = ETabStatus.follower;
  private static debug: boolean = false;

  constructor(
    private readonly namespace: string,
    debug = false,
  ) {
    if (!TabsManager._listeners) {
      TabsManager._listeners = {
        [EEventType.statusChange]: new Set<TStatusChangeEventListener>(),
        [EEventType.message]: new Set<TInstanceMessageEventListener>(),
      };
    }

    if (!TabsManager._communicator) {
      TabsManager._communicator = new MessageChannel<TMessageEvent<unknown>>(TabsManager.listeners.message);
    }

    TabsManager.debug = debug;

    if (TabsManager.debug) {
      document.title = this.status;
    }

    if (isE2E) {
      this.status = ETabStatus.leader;

      return;
    }

    void maybePolyfill().then(
      () => {
        void navigator.locks.request(
          "@tabs_manager@",
          async () => {
            this.status = ETabStatus.leader;

            await new Promise(() => null);
          },
        );
      },
    );
  }

  public addEventListener(type: EEventType.statusChange, listener: TStatusChangeEventListener): void;
  public addEventListener(type: EEventType.message, listener: TMessageEventListener<Message>): void;
  public addEventListener(
    type: EEventType,
    listener: TEventListener<Message>,
  ): void {
    if (type === EEventType.statusChange) {
      TabsManager.listeners.statusChange.add(listener as TStatusChangeEventListener);

      return;
    }

    if (type === EEventType.message) {
      const instanceListener: TInstanceMessageEventListener = (event) => {
        if (event._namespace === this.namespace) {
          instanceListener.original(event);
        }
      };

      instanceListener.original = listener as TMessageEventListener<unknown>;

      TabsManager.listeners.message.add(instanceListener);

      return;
    }

    throw new Error(`[TabsManager -> addEventListener] Unhandled type - "${type as string}"`);
  }

  public removeEventListener(type: EEventType.statusChange, listener: TStatusChangeEventListener): void;
  public removeEventListener(type: EEventType.message, listener: TMessageEventListener<Message>): void;
  public removeEventListener(
    type: EEventType,
    listener: TEventListener<Message>,
  ): void {
    if (type === EEventType.statusChange) {
      TabsManager.listeners.statusChange.delete(listener as TStatusChangeEventListener);

      return;
    }

    if (type === EEventType.message) {
      for (const it of TabsManager.listeners.message) {
        if (it.original === listener) {
          TabsManager.listeners.message.delete(it);

          return;
        }
      }

      return;
    }

    throw new Error(`[TabsManager -> removeEventListener] Unhandled type - "${type as string}"`);
  }

  public postMessage(message: Message): void {
    TabsManager.communicator.postMessage({
      message,
      _namespace: this.namespace,
    });
  }

  public get status() {
    return TabsManager._status;
  }

  public static get listeners(): TListeners {
    return getNotNil(TabsManager._listeners, ["TabsManager"], "listeners");
  }

  public static get communicator(): TCommunicator {
    return getNotNil(TabsManager._communicator, ["TabsManager"], "communicator");
  }

  private set status(status: ETabStatus) {
    TabsManager._status = status;

    if (TabsManager.debug) {
      document.title = this.status;
    }

    TabsManager.listeners.statusChange.forEach((it) => {
      it({ status: this.status });
    });
  }
}

export {
  ETabStatus,
  EEventType,
  TabsManager,
  type TStatusChangeEvent,
  type TMessageEvent,
};
