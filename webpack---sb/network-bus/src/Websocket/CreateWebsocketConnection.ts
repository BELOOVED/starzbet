import { IWebsocketConnection } from "./IWebsocketConnection";
import { WebsocketConnection } from "./WebsocketConnection";
import { v4 as uuidv4 } from "uuid";
import { isNotNil } from "@sb/utils";
import {
  websocketConnectionWithSubscriptionsChaining
} from "./Decorators/WebsocketConnectionWithSubscriptionsChaining";

const key = "@@ws/id"

const getId = () => {
  const fromStorage = localStorage.getItem(key);

  if (isNotNil(fromStorage)) {
    return JSON.parse(fromStorage);
  }

  const id = uuidv4();

  localStorage.setItem(key, JSON.stringify(id));

  return id;
}

const createWebsocketConnection =
  async (url: string): Promise<IWebsocketConnection> => new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);

    // @ts-ignore FIXME @strong-ts
    parsedUrl.searchParams.set("id", getId());

    const ws = new WebSocket(parsedUrl);

    ws.onopen = () => {
      resolve(websocketConnectionWithSubscriptionsChaining(new WebsocketConnection(ws)));
    };

    ws.onerror = (e) => {
      reject(`Connection failed, url: ${parsedUrl.toString()}, event: ${JSON.stringify(e)}`);
    };
  });

export { createWebsocketConnection };
