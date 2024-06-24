import { BehaviorSubject, EMPTY, filter, finalize, mergeMap, switchMap } from "rxjs";
import { combineEpics, type Epic } from "redux-observable";
import { type Action } from "redux";
import { type ELocale } from "@sb/utils";
import { type IRpcClient } from "@sb/network-bus/RpcClient";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type ILineTranslatesProvider } from "./ILineTranslatesProvider";
import { LineTranslatesProtocol } from "./LineTranslatesProtocol";
import { type TGetCurrentTranslatesCall } from "./TGetCurrentTranslatesCall";
import { type TGetTranslatesGapCall } from "./TGetTranslatesGapCall";

interface IWithWebsocketConnection {
  connection: IWebsocketConnection;
}

class LineTranslatesProvider implements ILineTranslatesProvider {
  private list$: BehaviorSubject<Set<ELocale>>;

  private readonly epic$: BehaviorSubject<Epic>;

  private connection$: BehaviorSubject<IWebsocketConnection | undefined>;

  constructor(
    private rpcClient: IRpcClient,
    private wsLineTranslatesUri: string,
    private getCurrentTranslatesCall: TGetCurrentTranslatesCall,
    private getTranslatesGapCall: TGetTranslatesGapCall,
  ) {
    this.epic$ = new BehaviorSubject(combineEpics());
    this.connection$ = new BehaviorSubject<IWebsocketConnection | undefined>(undefined);
    this.list$ = new BehaviorSubject<Set<ELocale>>(new Set());
  }

  setConnection(connection: IWebsocketConnection) {
    this.connection$.next(connection);
  }

  run(): Epic {
    return (action$, state$, deps) => this.connection$.pipe(
      filter(Boolean),
      switchMap((connection) => this.epic$.pipe(mergeMap((epic) => epic(action$, state$, { ...deps, connection })))),
      finalize(() => {
        this.epic$.complete();
        this.connection$.complete();
        this.list$.complete();
      }),
    );
  }

  mergeTranslates(locales: ELocale[]) {
    this.list$.value.forEach((value) => {
      if(!locales.includes(value)){
        this.removeEpic(value);
      }
    });

    locales.forEach((locale) => {
      if(this.list$.value.has(locale)) {
        return;
      }

      this.addEpic(locale);
    });
  }

  spawnTranslates(locale: ELocale) {
    this.addEpic(locale);
  }

  private addEpic(locale: ELocale){
    if (this.list$.value.has(locale)) {
      return;
    }

    const epic: Epic<Action, Action, unknown, IWithWebsocketConnection> = (
      action$,
      state$,
      dependencies,
    ) => this.list$.pipe(
      switchMap((set) => {
        if(!set.has(locale)) {
          return EMPTY;
        }

        return new LineTranslatesProtocol(
          this.rpcClient,
          dependencies.connection,
          locale,
          this.wsLineTranslatesUri,
          this.getCurrentTranslatesCall,
          this.getTranslatesGapCall,
        ).runEpic(action$, state$, dependencies);
      }),
    );

    this.list$.next(this.list$.value.add(locale));

    this.epic$.next(epic);
  }

  private removeEpic(locale: ELocale){
    if (!this.list$.value.has(locale)) {
      return;
    }

    const newSet = new Set(this.list$.value);

    newSet.delete(locale);

    this.list$.next(newSet);
  }
}

export { LineTranslatesProvider };
