import { Logger } from "../InternalLogger";

/** @deprecated use {@link LocalStorage} instead*/
const deprecatedSetLocalStorage = (key: string, value: any): void => localStorage.setItem(key, JSON.stringify(value));

/** @deprecated use {@link LocalStorage} instead*/
const deprecatedRemoveLocalStorage = (key: string): void => localStorage.removeItem(key);

/** @deprecated use {@link LocalStorage} instead*/
const deprecatedGetLocalStorage = <V>(key: string, defaultValue: any | null = null): V => {
  try {
    const storageItem = localStorage.getItem(key);

    if (storageItem === null) {
      return defaultValue;
    }

    // @ts-ignore FIXME @strong-ts
    return JSON.parse(storageItem);

  } catch (e) {
    Logger.error.storage(`Fail parse "${key}" from localStorage with value:`, localStorage.getItem(key));

    localStorage.removeItem(key);

    Logger.warn.storage(`Invalid key "${key}" was removed from localStorage`);

    return defaultValue;
  }
};

export {
  deprecatedSetLocalStorage,
  deprecatedRemoveLocalStorage,
  deprecatedGetLocalStorage,
}
