import { defer, from } from "rxjs";
import { createWebsocketConnection } from "@sb/network-bus/Websocket";

const connectionFactory = (socketUrl: string) => defer(
  () => from(createWebsocketConnection(socketUrl)),
);

export { connectionFactory };
