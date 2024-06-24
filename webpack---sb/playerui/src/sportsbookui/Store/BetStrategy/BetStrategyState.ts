import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";
import { EBetStrategy } from "./Model/EBetStrategy";

interface IWithBetStrategyState {
  betStrategy: EBetStrategy;
}

const betStrategyState = {
  betStrategy: getLocalStorage(localStorageKeys.betStrategy) || EBetStrategy.higher,
};

export { betStrategyState, type IWithBetStrategyState };
