import { combineEpics, type Epic } from "redux-observable";
import { EMPTY, ignoreElements, of, tap } from "rxjs";
import { cheaterEpicFactory, isCreator } from "@sb/utils";
import { production } from "../../../../common/Constants/Production";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { debugModeToggleAction } from "../DebugModeActions";
import { EDebugMode } from "../Model/EDebugMode";

const storageKeys = {
  [EDebugMode.eventDebug]: localStorageKeys.eventDebug,
  [EDebugMode.crashDebug]: localStorageKeys.crashDebug,
  [EDebugMode.traceDebug]: localStorageKeys.traceDebug,
  [EDebugMode.comingSoon]: localStorageKeys.comingSoon,
};

const switchDebugMode = (mode: EDebugMode, word = mode.toLowerCase()) => cheaterEpicFactory<Epic>(
  [word],
  () => of(debugModeToggleAction(mode)),
  "Enables debug mode",
);

const storeDebugMode = (mode: EDebugMode, initSetup: boolean): Epic => (action$) => {
  const key = storageKeys[mode];

  if (initSetup) {
    setLocalStorage(key, true);
  }

  return action$.pipe(
    isCreator(debugModeToggleAction),
    tap(() => {
      const debugMode = getLocalStorage(key);

      if (debugMode) {
        localStorage.removeItem(key);
      } else {
        setLocalStorage(key, true);
      }
    }),
    ignoreElements(),
  );
};

const setupTraceDebugMinTime: Epic = () => {
  const traceDebugMinTime = getLocalStorage(localStorageKeys.traceDebugMinTime);

  if (!traceDebugMinTime) {
    setLocalStorage(localStorageKeys.traceDebugMinTime, 2000);
  }

  return EMPTY;
};

const debugModeRootEpic = combineEpics(
  switchDebugMode(EDebugMode.crashDebug),
  switchDebugMode(EDebugMode.eventDebug),
  switchDebugMode(EDebugMode.traceDebug),
  switchDebugMode(EDebugMode.comingSoon, "soonsoon"),
  storeDebugMode(EDebugMode.crashDebug, !production),
  storeDebugMode(EDebugMode.eventDebug, false),
  storeDebugMode(EDebugMode.traceDebug, !production),
  storeDebugMode(EDebugMode.comingSoon, false),
  setupTraceDebugMinTime,
);

export { debugModeRootEpic };

