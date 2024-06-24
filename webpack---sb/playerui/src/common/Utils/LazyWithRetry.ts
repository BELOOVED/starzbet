import { type ComponentType, lazy } from "react";
import { ESessionStorageKey, sessionStorage } from "../SessionStorage";

declare global {
  interface Window {
    WITH_LAZY_RETRY: typeof withLazyRetry;
  }
}

// a function to retry loading a chunk to avoid chunk load error for out of date code
const withLazyRetry = function <T> (componentImport: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = sessionStorage.get(ESessionStorageKey.retryLazyRefreshed) || false;
    // try to import the component
    componentImport().then((component) => {
      sessionStorage.set(ESessionStorageKey.retryLazyRefreshed, false); // success so reset the refresh
      resolve(component);
    }).catch((error) => {
      if (!hasRefreshed) { // not been refreshed yet
        sessionStorage.set(ESessionStorageKey.retryLazyRefreshed, true); // we are now going to refresh

        // @ts-ignore
        return window.location.reload(true); // refresh the page
      }

      return reject(error); // Default error behaviour as already tried refresh
    });
  });
};

const lazyWithRetry = <T extends ComponentType<unknown>>(factory: () => Promise<{ default: T; }>) => lazy(() => withLazyRetry(factory));

const setupGlobalLazyWithRetry = () => {
  window["WITH_LAZY_RETRY"] = withLazyRetry;
};

export { lazyWithRetry, setupGlobalLazyWithRetry };
