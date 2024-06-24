import {
  finalize,
  from,
  merge,
  of,
  retry,
  share,
  switchMap,
  tap,
  timer,
} from "rxjs";
import { voidFn } from "@sb/utils";
import { connectionFactory } from "./Utils/ConnectionFactory";
import { reconnectionFactory } from "./Utils/ReconnectionFactory";
import { awaitConnectionClose } from "./Utils/AwaitConnectionClose";
import { Logger } from "./Utils/Logger";

interface IWebsocketConnectionFactoryConfig {
    socketUrl: string;
    onRetry?: () => void;
    onStop?: () => void;
}

const getRandomInt = (from: number, to: number) => {
  const min = Math.ceil(from);
  const max = Math.floor(to);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const websocketConnectionFactory = ({
  socketUrl,
  onRetry = voidFn,
  onStop = voidFn,
}: IWebsocketConnectionFactoryConfig) => (
  connectionFactory(socketUrl).pipe(
    tap(() => Logger.info.websocket(`Connection with "${socketUrl}" has been opened`)),
    switchMap(
      (connection) => merge(
        from(
          awaitConnectionClose(connection),
        ).pipe(
          switchMap((reason) => {
            throw new Error(`Connection with "${socketUrl}" has been lost, reason: ${reason}, reconnecting...`);
          }),
          finalize(() => {
            onStop();

            if (!connection.isClosed()) {
              connection.disconnect("Disconnect caused by the client");
            }
          }),
        ),
        of(connection),
      ),
    ),
    retry({
      delay: (error) => {
        Logger.warn.websocket("websocketConnectionFactory", error);

        onRetry();

        const testReconnectionRetryMillis = getRandomInt(5, 10) * 1000;

        return timer(testReconnectionRetryMillis).pipe(
          switchMap(() => reconnectionFactory(socketUrl, testReconnectionRetryMillis)),
        );
      },
    }),
    share(),
  )
);

export {
  type IWebsocketConnectionFactoryConfig,
  websocketConnectionFactory,
};
