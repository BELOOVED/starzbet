import { IS_SERVER, type TExplicitAny } from "@sb/utils";
import { Logger } from "../../Utils/Logger";
import { createLocalStorageKeys } from "../../Utils/CreateLocalStorageKeys";

const localStorageKeys = createLocalStorageKeys(
  "@@sbui",
  [
    "betChangeAmount",
    "betSlipPicks",
    "kironBetSlipPicks",
    "betSlipMinimize",
    "betSlipPos",
    "betGroup",
    "betStrategy",
    "crashDebug",
    "traceDebug",
    "traceDebugMinTime",
    "eventDebug",
    "favourites",
    "liveFavourites",
    "preLiveFavourites",
    "awareFollow",
    "locale",
    "widgetEnabled",
    "skipEditBetTutorial",
    "skipAddSelectionTip",
    "skipCouponCreateTip",
    "awaitedPromotionBonusIds",
    "theme",
    "skippedModals",
    "comingSoon",
    "domainLabelOpen",
  ],
);

const setLocalStorage = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));

const getLocalStorage = <T = TExplicitAny>(key: string): T | undefined => {
  if (IS_SERVER) {
    return void 0;
  }

  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return undefined;
    }

    return JSON.parse(value) as T;
  } catch (e) {
    Logger.warn.app("[getLocalStorage]", `Fail parse "${key}" from localStorage with value:`, localStorage.getItem(key));

    localStorage.removeItem(key);

    Logger.warn.app("[getLocalStorage]", `Invalid key "${key}" was removed from localStorage`);

    return void 0;
  }
};

export {
  localStorageKeys,
  setLocalStorage,
  getLocalStorage,
};
