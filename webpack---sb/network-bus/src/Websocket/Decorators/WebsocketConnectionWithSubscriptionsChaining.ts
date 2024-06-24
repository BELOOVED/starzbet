/**
 * Chains subscriptions and unsubscriptions with same URI to execute sequentially
 */

import { type IWebsocketConnection } from "../IWebsocketConnection";
import { PromiseChainer } from "@sb/utils";

const websocketConnectionWithSubscriptionsChaining = <W extends IWebsocketConnection>(websocketConnect: W): W => {
  const promiseChainer = new PromiseChainer();

  const originalSubscribe = websocketConnect.subscribe;
  const originalUnsubscribe = websocketConnect.unsubscribe;

  websocketConnect.subscribe = (uri, subscriber, payload, metadata) => {
    return promiseChainer.add(
      () => originalSubscribe.apply(websocketConnect, [uri, subscriber, payload, metadata]),
      [uri],
    );
  };

  websocketConnect.unsubscribe = (uri) => {
    return promiseChainer.add(
      () => originalUnsubscribe.apply(websocketConnect, [uri]),
      [uri],
    );
  }

  return websocketConnect;
};

export { websocketConnectionWithSubscriptionsChaining };
