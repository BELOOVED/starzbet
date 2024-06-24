import { defer, Observable, of } from "rxjs";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type EPostfix } from "@sb/sdk";
import { type IVersionedDiff } from "@sb/sdk/diff/protocol/VersionedDiff";
import { type IDiffProvider } from "@sb/diff-protocol";
import { logArrayError, logWarnOrError } from "../../../../../common/Utils/Logger";
import { feedEventFetchedAction } from "../../FeedActions";

class EventDiffProvider implements IDiffProvider{
  protected uri: string;

  constructor(
    private connection: IWebsocketConnection,
    private postfix: EPostfix,
    private eventId: string,
  ) {
    this.uri = `sumstats.frontserver.event_updated.${this.postfix}.${this.eventId}`;
  }

  getGap(): Observable<never> {
    throw new Error("Gap in EventDiffProvider not supported");
  }

  onLoad(update: IVersionedDiff | IVersionedDiff[]) {
    return of(feedEventFetchedAction(update, this.eventId));
  }

  subscribe() {
    return defer(() => new Observable<IVersionedDiff>((subscriber) => {
      let subscribed = false;

      this.connection.subscribe(
        this.uri,
        {
          subscriber: (payload: IVersionedDiff) =>  subscriber.next(payload),
          unsubscriber: () => subscriber.unsubscribe(),
        },
      )
        .then(() => subscribed = true)
        .catch((err) => subscriber.error(err));

      return () => subscribed && this.connection.unsubscribe(this.uri).catch((error) => {
        logArrayError(
          error,
          (e) => logWarnOrError(e).epic("[EventDiffProvider]", e),
        );
      });
    }));
  }
}

export { EventDiffProvider };

