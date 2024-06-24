import { type IWebsocketConnection } from "@sb/network-bus/Websocket";

const awaitConnectionClose = (connection: IWebsocketConnection) => (
  new Promise((resolve: (reason: string) => void) => connection.setCloseHandler(resolve))
);

export { awaitConnectionClose };
