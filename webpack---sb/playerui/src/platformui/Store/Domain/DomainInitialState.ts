import { getLocalStorage, localStorageKeys } from "../../../common/Store/LocalStorage/localStorageKeys";

interface IWithCurrentDomain {
  currentDomain: string | null;
  showLabel: boolean;
}

const domainInitialState: IWithCurrentDomain = {
  currentDomain: null,
  showLabel: getLocalStorage(localStorageKeys.domainLabelOpen) ?? true,
};

export { domainInitialState };
export type { IWithCurrentDomain };
