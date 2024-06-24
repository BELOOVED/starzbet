import { ActionCreator, AnyAction } from "redux";
import { TExplicitAny } from "../TAny";
import { ignoreElements, merge, Observable, tap } from "rxjs";
import { isCreator } from "./IsCreator";
import { deprecatedSetLocalStorage } from "../WindowUtils/DeprecatedLocalStorage";
import { Epic } from "redux-observable";
import { TUnknownObject } from "../UtilityTypes/TUnknownObject";
import { TStringKeyOf } from "../UtilityTypes/TStringKeyOf";

type TStoreConfig<K extends string, C extends ActionCreator<TExplicitAny>> = readonly [
  actionCreator: C,
  extractor: (payload: ReturnType<C>) => TExplicitAny,
  storageKey: K
];

type TStoreBaseHandler = (action$: Observable<AnyAction>) => Observable<never>;

type TStoreHandler<K extends string, C extends ActionCreator<TExplicitAny> = ActionCreator<TExplicitAny>> =
  TStoreConfig<K, C>
  | TStoreBaseHandler;

const isStoreConfig = <K extends string, C extends ActionCreator<AnyAction>>(handler: TStoreHandler<K, C>): handler is TStoreConfig<K, C> => (
  Array.isArray(handler)
);

interface IStorage<Storage extends TUnknownObject = TUnknownObject> {
  set<Key extends TStringKeyOf<Storage>>(key: Key, value: Storage[Key]): void;
}

const doStore = <C extends ActionCreator<TExplicitAny>>(
  actionCreator: C,
  extractor: (payload: ReturnType<C>) => TExplicitAny,
  storageKey: string,
  storage?: IStorage,
) => (action$: Observable<AnyAction>) => (
  action$.pipe(
    isCreator(actionCreator),
    tap((payload: ReturnType<C>) => {
      //todo replace when remove deprecatedSetLocalStorage
      if (storage) {
        storage.set(storageKey, extractor(payload));
      } else {
        deprecatedSetLocalStorage(storageKey, extractor(payload));
      }
    }),
    ignoreElements(),
  )
);

const createLocalStorageEpic = <
  Storage extends TUnknownObject = TUnknownObject,
  Handler extends TStoreHandler<TStringKeyOf<Storage>> = TStoreHandler<TStringKeyOf<Storage>>,
>(
  handlers: Handler[],
  storage?: IStorage<Storage>,
): Epic => (action$) => merge(
  ...handlers.map((handler): TStoreBaseHandler => {
    if (isStoreConfig(handler)) {
      const [actionCreator, extractor, storageKey] = handler;

      return doStore(actionCreator, extractor, storageKey, storage);
    }

    return handler;
  }).map((handler) => handler(action$)),
);


export { createLocalStorageEpic };
