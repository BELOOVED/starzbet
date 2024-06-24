import { type ILocalStorage, PrefixedLocalStorage } from "@sb/storage";
import { type EPanelPosition } from "./Model";

type TPanelLocalStorage = ILocalStorage<TAppLocalStorageData>;

enum EPanelLocaleStorageKey {
  panelPosition = "panelPosition",
  resizeWidth = "resizeWidth",
  resizeHeight = "resizeHeight",
}

type TAppLocalStorageData = {
  [EPanelLocaleStorageKey.panelPosition]: EPanelPosition;
  [EPanelLocaleStorageKey.resizeWidth]: number;
  [EPanelLocaleStorageKey.resizeHeight]: number;
}

const VERSIONS: Record<EPanelLocaleStorageKey, number> = {
  [EPanelLocaleStorageKey.panelPosition]: 1,
  [EPanelLocaleStorageKey.resizeWidth]: 1,
  [EPanelLocaleStorageKey.resizeHeight]: 1,
};

const createPanelLocalStorage = (namespace: string) => new PrefixedLocalStorage<TAppLocalStorageData>(namespace, VERSIONS);

export {
  EPanelLocaleStorageKey,
  createPanelLocalStorage,
  type TPanelLocalStorage,
  type TAppLocalStorageData,
};
