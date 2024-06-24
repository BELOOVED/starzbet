import { hasOwnProperty, isNil } from "@sb/utils";
import { createLoginRequest, createLogoutRequest, createSubscribeRequest, createUnsubscribeRequest } from "./WebsocketRequestCreators";
import { IRequestResolvers, ISubscribeHandler, IWebsocketConnection, TCloseHandler } from "./IWebsocketConnection";
import { IError } from "../Model/IError";
import { IMetadata } from "../Model/IMetadata";
import { EWebsocketMessageType, IWebsocketMessage } from "./IWebsocketMessage";
import { Logger } from "../Utils/Logger";
import { clientTimeoutError } from "../Utils/ErrorUtil";

const isUriHaveWildCard = (uri: string) => uri.split(".").some((el) => el === "*");

const findWildUri = (uri: string, uriList: string[]) => {
  const parts = uri.split(".");

  return uriList.find((el) => {
    const uriParts = el.split(".");

    if (parts.length !== uriParts.length) {
      return undefined;
    }

    let successCount = 0;

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] !== uriParts[i] && uriParts[i] !== "*") {
        return undefined;
      }

      if (parts[i] === uriParts[i]) {
        successCount += 1;
      }
    }

    return successCount === parts.length - 1
  })
}

class WebsocketConnection implements IWebsocketConnection {
  private requestResolvers: IRequestResolvers = {};

  private subscriptions: { [key: string]: ISubscribeHandler } = {};

  private wildSubscriptionsList: string[] = [];

  private heartbeatTimeoutId: ReturnType<typeof setTimeout> | null = null;

  private waitTimeout = 30_000;
  private heartbeatTimeout = 30_000;

  constructor(private ws: WebSocket) {
    this.ws.onmessage = this.handleMessage;

    this.ws.onclose = (e: CloseEvent) => {
      this.closeHandler(e.reason || "caused by the server");
    };
  }

  setWaitingTimeout(timeout: number) {
    this.waitTimeout = timeout;
  }

  setCloseHandler(closeHandler: TCloseHandler) {
    this.closeHandler = closeHandler;
  }

  disconnect(reason = "Disconnect") {
    Logger.info.websocket("[disconnect]", `${new Date()}: Close socket by client. Reason "${reason}".`);

    this.ws.close(1000, reason);

    this.requestResolvers = {};
    this.subscriptions = {};

    this.closeHandler(reason);
  }

  subscribe(uri: string, subscriber: ISubscribeHandler, payload?: any, metadata?: IMetadata): Promise<void> {
    const isWildCard = isUriHaveWildCard(uri);
    const request = createSubscribeRequest(uri, payload, metadata);

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(clientTimeoutError(`subscribe to uri: "${uri}" rejected by waiting timeout. Current wait timeout: ${this.waitTimeout}`));

        delete this.requestResolvers[uri];
      }, this.waitTimeout);

      this.subscriptions[uri] = subscriber;

      if (isWildCard) {
        this.wildSubscriptionsList.push(uri);
      }

      this.requestResolvers[request.correlationId] = {
        onSuccess: () => {
          clearTimeout(timeoutId);
          resolve();
        },
        onError: (e) => {
          clearTimeout(timeoutId);

          if (this.subscriptions.hasOwnProperty(uri)) {
            delete (this.subscriptions[uri]);
          }

          if (this.wildSubscriptionsList.includes(uri)) {
            this.wildSubscriptionsList = this.wildSubscriptionsList.filter((el) => el !== uri);
          }

          Logger.warn.websocket("[subscribe]", `subscribe to uri: "${uri}" rejected by ${JSON.stringify(e)}`);

          reject(e);
        },
      };

      this.ws.send(JSON.stringify(request));
    });
  }

  login(uri: string, payload?: any, metadata?: IMetadata): Promise<void> {
    const request = createLoginRequest(uri, payload, metadata)

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(clientTimeoutError(`call "${uri}" rejected by waiting timeout. Current wait timeout: ${this.waitTimeout}`));

        delete this.requestResolvers[uri];
      }, this.waitTimeout);

      this.requestResolvers[request.correlationId] = {
        onSuccess: () => {
          clearTimeout(timeoutId);

          resolve();
        },
        onError: (e) => {
          clearTimeout(timeoutId);

          Logger.warn.websocket("[login]", `call "${uri}" rejected by ${JSON.stringify(e)}`);

          reject(e);
        },
      };

      this.ws.send(JSON.stringify(request));
    });
  }

  logout(): Promise<void> {
    const uri = EWebsocketMessageType.logout

    const request = createLogoutRequest(uri);

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(clientTimeoutError(`call "${uri}" rejected by waiting timeout. Current wait timeout: ${this.waitTimeout}`));

        delete this.requestResolvers[uri];
      }, this.waitTimeout);

      this.requestResolvers[request.correlationId] = {
        onSuccess: () => {
          clearTimeout(timeoutId);

          resolve();
        },
        onError: (e) => {
          clearTimeout(timeoutId);

          Logger.warn.websocket("[logout]", `call "${uri}" rejected by ${JSON.stringify(e)}`);

          reject(e);
        },
      };

      this.ws.send(JSON.stringify(request));
    });
  }

  unsubscribe(uri: string): Promise<void> {
    const request = createUnsubscribeRequest(uri);

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(clientTimeoutError(`unsubscribe to uri: "${uri}" rejected by waiting timeout. Current wait timeout: ${this.waitTimeout}`));

        delete this.requestResolvers[uri];
      }, this.waitTimeout);

      if (hasOwnProperty(this.subscriptions, uri)) {
        this.subscriptions[uri]!.unsubscriber();
      }

      this.requestResolvers[request.correlationId] = {
        onSuccess: () => {
          clearTimeout(timeoutId);

          if (this.subscriptions.hasOwnProperty(uri)) {
            delete (this.subscriptions[uri]);
          }

          if (this.wildSubscriptionsList.includes(uri)) {
            this.wildSubscriptionsList = this.wildSubscriptionsList.filter((el) => el !== uri);
          }

          resolve();
        },
        onError: (e) => {
          clearTimeout(timeoutId);

          if (this.subscriptions.hasOwnProperty(uri)) {
            delete (this.subscriptions[uri]);
          }

          if (this.wildSubscriptionsList.includes(uri)) {
            this.wildSubscriptionsList = this.wildSubscriptionsList.filter((el) => el !== uri);
          }

          Logger.warn.websocket("[unsubscribe]", `unsubscribe to uri: "${uri}" rejected by ${JSON.stringify(e)}`);

          reject(e);
        },
      };

      this.ws.send(JSON.stringify(request));
    });
  }

  isClosed() {
    return this.ws.readyState === this.ws.CLOSED;
  }

  private closeHandler: TCloseHandler = () => {
  };

  private handleMessage = (message: MessageEvent) => {
    if (message.data === "") {
      return;
    }

    // @ts-ignore FIXME @strong-ts
    const response: IWebsocketMessage = JSON.parse(message.data); // todo support lazy gzip message
    const type = response.type;

    if (type === EWebsocketMessageType.heartbeat) {
      this.handleHeartbeat();

      return;
    }

    const { uri, correlationId, payload, metadata } = response;

    if (isNil(correlationId)) {
      throw new Error(`CorrelationId is null. Uri - ${uri}. Response - ${message.data}`)
    }

    switch (type as EWebsocketMessageType) {
      case EWebsocketMessageType.subscribed:
        this.resolveByCorrelationId(uri, correlationId, payload, metadata);
        break;
      case EWebsocketMessageType.unsubscribed:
        this.resolveByCorrelationId(uri, correlationId, payload, metadata);
        break;
      case EWebsocketMessageType.event:
        this.notifyUriSubscribers(uri, payload, metadata);
        break;
      case EWebsocketMessageType.login:
        this.resolveByCorrelationId(uri, correlationId, payload, metadata);
        break;
      case EWebsocketMessageType.loggedIn:
        this.resolveByCorrelationId(uri, correlationId, payload, metadata);
        break;
      case EWebsocketMessageType.logout:
        this.resolveByCorrelationId(uri, correlationId, payload, metadata);
        break;
      case EWebsocketMessageType.loggedOut:
        this.resolveByCorrelationId(uri, correlationId, payload, metadata);
        break;
      case EWebsocketMessageType.error:
        this.rejectByCorrelationId(uri, correlationId, payload);
        break;
      default:
        Logger.error.websocket("[handleMessage]", `Not supported message type: ${type}`);
    }
  }

  private resolveByCorrelationId(uri: string, correlationId: string, payload?: any, metadata?: IMetadata) {
    if (this.requestResolvers.hasOwnProperty(correlationId)) {
      const resolver = this.requestResolvers[correlationId];

      resolver!.onSuccess(payload, metadata);

      delete this.requestResolvers[correlationId];
    } else {
      Logger.error.websocket("[resolveByCorrelationId]", `Request resolver for correlationId: ${correlationId} with uri: ${uri} not found`);
    }
  }

  private rejectByCorrelationId(uri: string, correlationId: string, errors: IError[]) {
    if (this.requestResolvers.hasOwnProperty(correlationId)) {
      const resolver = this.requestResolvers[correlationId];

      resolver!.onError(errors);
      delete this.requestResolvers[correlationId];
    } else {
      Logger.error.websocket("[rejectByCorrelationId]", `Request resolver for correlationId: ${correlationId} with uri: ${uri} not found`);
    }
  }

  private notifyUriSubscribers(uri: string, payload?: any, metadata?: IMetadata) {
    const wildUri = findWildUri(uri, this.wildSubscriptionsList);

    if (this.subscriptions.hasOwnProperty(uri)) {
      this.subscriptions[uri]!.subscriber(payload, metadata, uri);

    } else if (wildUri && this.subscriptions.hasOwnProperty(wildUri)) {
      this.subscriptions[wildUri]!.subscriber(payload, metadata, uri);

    } else {
      /*
      1. message was received with unknown uri
      2. unsubscribe was called, subscription was deleted, but message from server arrived
      */
      Logger.warn.websocket("[notifyUriSubscribers]", `Subscriber for uri: ${uri} not found.`);
    }
  }

  private handleHeartbeat() {
    if (this.heartbeatTimeoutId) {
      clearTimeout(this.heartbeatTimeoutId);
    }

    const timeout = this.heartbeatTimeout + (Math.ceil(this.heartbeatTimeout * 0.1));

    this.heartbeatTimeoutId = setTimeout(() => this.disconnect("Heart beat outdated."), timeout);
  }
}

export { WebsocketConnection, findWildUri }
