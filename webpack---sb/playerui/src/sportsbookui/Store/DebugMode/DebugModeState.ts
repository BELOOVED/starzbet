import { isE2E, isNil } from "@sb/utils";
import { production } from "../../../common/Constants/Production";
import { isProdServerEnv } from "../../../ServerEnvironment";
import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";
import { EDebugMode } from "./Model/EDebugMode";

interface IDebugModeState {
  [EDebugMode.crashDebug]: boolean;
  [EDebugMode.eventDebug]: boolean;
  [EDebugMode.traceDebug]: boolean;
  [EDebugMode.comingSoon]: boolean;
}

interface IWithDebugModeState {
  debugMode: IDebugModeState;
}

const getInitialCommingSoon = () => {
  if (isE2E || !isProdServerEnv || process.env.THEME !== "starzbet-in") {
    return true;
  }

  const fromStorage = getLocalStorage(localStorageKeys.comingSoon);

  if (isNil(fromStorage)) {
    return false;
  }

  return fromStorage;
};

const debugModeState: IWithDebugModeState = {
  debugMode: {
    [EDebugMode.crashDebug]: !production || !!getLocalStorage(localStorageKeys.crashDebug),
    [EDebugMode.eventDebug]: !!getLocalStorage(localStorageKeys.eventDebug) || false,
    [EDebugMode.traceDebug]: !production || !!getLocalStorage(localStorageKeys.traceDebug),
    [EDebugMode.comingSoon]: getInitialCommingSoon(),
  },
};

export { debugModeState };
export type { IWithDebugModeState };
