import { SessionStorage } from "@sb/storage";

const ns = "@@pui";

enum ESessionStorageKey {
  retryLazyRefreshed = `${ns}/retry-lazy-refreshed`,
}

interface ISessionStorage {
  [ESessionStorageKey.retryLazyRefreshed]: boolean;
}

const sessionStorage = new SessionStorage<ISessionStorage>();

export { sessionStorage, ESessionStorageKey };
