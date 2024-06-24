import { defer, Observable, of } from "rxjs";
import { type EPostfix } from "@sb/sdk";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type IVersionedDiff } from "@sb/sdk/diff/protocol/VersionedDiff";
import { type IDiffProvider } from "@sb/diff-protocol";
import { logArrayError, logWarnOrError } from "../../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../../common/Utils/EpicUtils/CallWithAbort";
import type { HttpApi } from "../../../../Api/HttpApi";
import { feedUpdatedAction } from "../../FeedActions";

class FeedDiffProvider implements IDiffProvider {
  protected uri: string;

  constructor(
    private sportsbookHttpApi: HttpApi,
    private connection: IWebsocketConnection,
    private postfix: EPostfix,
  ) {
    this.uri = `sumstats.frontserver.events_updates.${this.postfix}`;
  }

  getGap(version: number) {
    return callWithAbort(this.sportsbookHttpApi.callGetMainLineGap, { postfix: this.postfix, version });
  }

  onLoad(update: IVersionedDiff | IVersionedDiff[]) {
    return of(feedUpdatedAction(update));
  }

  subscribe() {
    return defer(() => new Observable<IVersionedDiff>((subscriber) => {
      let subscribed = false;

      this.connection.subscribe(
        this.uri,
        {
          subscriber: (payload: IVersionedDiff) => subscriber.next(payload),
          unsubscriber: () => subscriber.unsubscribe(),
        },
      )
        .then(() => subscribed = true)
        .catch((err) => subscriber.error(err));

      return () => subscribed && this.connection.unsubscribe(this.uri).catch((error) => {
        logArrayError(error, (e) => logWarnOrError(e).epic("[FeedDiffProvider]", e));
      });
    }));
  }
}

export { FeedDiffProvider };
