import { IMetadata } from "../Model/IMetadata";

enum EWebsocketMessageType {
  subscribe = "subscribe",
  subscribed = "subscribed",
  unsubscribe = "unsubscribe",
  unsubscribed = "unsubscribed",
  event = "event",
  error = "error",
  heartbeat = "heartbeat",
  login = "login",
  loggedIn = "loggedin",
  logout = "logout",
  loggedOut = "loggedout",
}

interface IWebsocketMessage<T = any> {
  type: EWebsocketMessageType;
  uri: string;
  // todo remove for event
  correlationId: string;
  payload?: T;
  metadata?: IMetadata;
}

export { EWebsocketMessageType, IWebsocketMessage };
