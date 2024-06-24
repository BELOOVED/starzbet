import { type IWithRouterState } from "@sb/router";
import { getLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { betSlipLocalStorageKeySelector } from "../Selectors/BetSlipLocalStorageKeysSelector";

const getPicksFromLocalStorage = (state: IWithRouterState) => {
  const key = betSlipLocalStorageKeySelector(state);

  try {
    return getLocalStorage(key) || [];
  } catch (e) {
    return [];
  }
};

export { getPicksFromLocalStorage };
