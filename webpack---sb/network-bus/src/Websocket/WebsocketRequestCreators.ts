import { IMetadata } from "../Model/IMetadata";
import { EWebsocketMessageType, IWebsocketMessage } from "./IWebsocketMessage";

const createRandomString = (length: number) => Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, length)
;

const createClientRequest = <T>(
  type: EWebsocketMessageType,
  uri: string,
  payload?: T,
  metadata?: IMetadata,
): IWebsocketMessage<T> => ({
    type: type,
    uri: uri,
    correlationId: createRandomString(7),
    payload,
    metadata,
  });

const createSubscribeRequest = <T>(uri: string, payload?: T, metadata?: IMetadata) =>
  createClientRequest<T>(EWebsocketMessageType.subscribe, uri, payload, metadata);

const createLoginRequest = <T>(uri: string, payload?: T, metadata?: IMetadata) =>
  createClientRequest<T>(EWebsocketMessageType.login, uri, payload, metadata);

const createLogoutRequest = <T>(uri: string, payload?: T, metadata?: IMetadata) =>
  createClientRequest<T>(EWebsocketMessageType.logout, uri, payload, metadata);

const createUnsubscribeRequest = <T>(uri: string, payload?: T, metadata?: IMetadata) =>
  createClientRequest<T>(EWebsocketMessageType.unsubscribe, uri, payload, metadata);

const createHeartbeatRequest = () => ({
  type: EWebsocketMessageType.heartbeat,
  payload: { t: Date.now() },
});

export {
  createSubscribeRequest,
  createUnsubscribeRequest,
  createHeartbeatRequest,
  createLoginRequest,
  createLogoutRequest,
};
