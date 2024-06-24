import { defer, from, Observable, of } from "rxjs";
import { type Action } from "redux";
import { map } from "rxjs/operators";
import { DiffProtocolWithBaseExtractor, type IDiffProvider, type ISnapshotProvider, nonMonotonicFn } from "@sb/diff-protocol";
import { type IRpcClient } from "@sb/network-bus/RpcClient";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type IVersionedDiff } from "@sb/sdk/diff/protocol/VersionedDiff";
import { type ELocale, isArray } from "@sb/utils";
import { type ICurrentTranslatesDto } from "@sb/sdk/sportsbook/frontserver/api/dto/CurrentTranslatesDto";
import { type ITranslateDiff } from "@sb/sdk/sportsbook/frontserver/api/dto/TranslateDiff";
import { isClientTimeoutError } from "@sb/network-bus/Utils";
import { type ITranslateResource } from "../../@types/TLocaleResource";
import { updateTranslatesAction } from "../Store/Actions";
import { Logger } from "../Utils/Logger";
import { type TGetCurrentTranslatesCall } from "./TGetCurrentTranslatesCall";
import { type TGetTranslatesGapCall } from "./TGetTranslatesGapCall";

type TTranslateSnapshot = IVersionedDiff & Pick<ICurrentTranslatesDto, "translates">;

type TTranslateDiff = IVersionedDiff & ITranslateDiff;

class LineTranslatesSnapshotProvider implements ISnapshotProvider<TTranslateSnapshot> {
  constructor(
    private rpcClient: IRpcClient,
    private locale: ELocale,
    private getCurrentTranslatesCall: TGetCurrentTranslatesCall,
  ) {
  }

  getSnapshot() {
    return defer(() => from(this.getCurrentTranslatesCall(this.rpcClient, { locale: this.locale }))).pipe(
      map((response) => ({ translates: response.translates, versions: [response.version] })),
    );
  }

  onLoad(snapshot: TTranslateSnapshot): Observable<Action> {
    return of(
      updateTranslatesAction({
        snapshot: { [this.locale]: snapshot.translates } as Record<ELocale, ITranslateResource>,
      }),
    );
  }
}

class LineTranslatesDiffProvider implements IDiffProvider<TTranslateDiff> {
  constructor(
    private rpcClient: IRpcClient,
    private connection: IWebsocketConnection,
    private locale: ELocale,
    private wsLineTranslatesUri: string,
    private getTranslatesGapCall: TGetTranslatesGapCall,
  ) {
  }

  getGap(version: number): Observable<TTranslateDiff[]> {
    return defer(() => from(this.getTranslatesGapCall(this.rpcClient, { locale: this.locale, version }))).pipe(
      map((response) => response.map((value) => ({ ...value, versions: [value.version] }))),
    );
  }

  onLoad(update: TTranslateDiff | TTranslateDiff[]): Observable<Action> {
    if (Array.isArray(update)) {
      return of(
        updateTranslatesAction({
          updates: { [this.locale]: update },
        }),
      );
    }

    return of(
      updateTranslatesAction({
        updates: { [this.locale]: [update] },
      }),
    );
  }

  subscribe(): Observable<TTranslateDiff> {
    const uri = `${this.wsLineTranslatesUri}.${this.locale}`;

    return defer(() => new Observable<TTranslateDiff>((subscriber) => {
      let subscribed = false;

      this.connection.subscribe(
        uri,
        {
          subscriber: (payload: ITranslateDiff) => subscriber.next({ ...payload, versions: [payload.version] }),
          unsubscriber: () => subscriber.unsubscribe(),
        },
      )
        .then(() => subscribed = true)
        .catch((err) => subscriber.error(err));

      return () => subscribed && this.connection.unsubscribe(uri).catch((error) => {
        const e = isArray(error) ? error : [error];

        e.forEach((it) => {
          const log = isClientTimeoutError(it) ? Logger.warn : Logger.error;

          log.epic("[LineTranslatesDiffProvider]", it);
        });
      });
    }));
  }
}

class LineTranslatesProtocol extends DiffProtocolWithBaseExtractor {
  protected override versionComparator = nonMonotonicFn;

  constructor(
    rpcClient: IRpcClient,
    connection: IWebsocketConnection,
    locale: ELocale,
    wsLineTranslatesUri: string,
    getCurrentTranslatesCall: TGetCurrentTranslatesCall,
    getTranslatesGapCall: TGetTranslatesGapCall,
  ) {
    super(
      new LineTranslatesSnapshotProvider(
        rpcClient,
        locale,
        getCurrentTranslatesCall,
      ),
      new LineTranslatesDiffProvider(
        rpcClient,
        connection,
        locale,
        wsLineTranslatesUri,
        getTranslatesGapCall,
      ),
    );
  }

  protected getCurrentVersion(): number {
    return 0;
  }

  protected hasInitSnapshot(): boolean {
    return false;
  }
}

export { LineTranslatesProtocol };

