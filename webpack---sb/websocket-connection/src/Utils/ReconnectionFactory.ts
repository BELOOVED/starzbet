import { retry, tap } from "rxjs";
import { connectionFactory } from "./ConnectionFactory";
import { Logger } from "./Logger";

const getReconnectionUrl = (socketUrl: string) => `${socketUrl}&reconnect`;

const reconnectionFactory = (
  socketUrl: string,
  retryInterval: number,
) => connectionFactory(
  getReconnectionUrl(socketUrl),
).pipe(
  tap({
    next: (connection) => {
      connection.disconnect("Test reconnect finished");

      Logger.info.websocket(`Successfully reconnected to "${socketUrl}"`);
    },
    error: () => Logger.warn.websocket(`Reconnecting to "${socketUrl}" has been failed. Retrying...`),
  }),
  retry({ delay: retryInterval }),
);

export { reconnectionFactory };
