import { keys } from "@sb/utils/Keys";
import { IS_SERVER } from "@sb/utils";
import { EPanelPosition, type IAdminPanelState, type IWithAdminPanelState } from "./Model";
import { EPanelLocaleStorageKey, type TPanelLocalStorage } from "./LocalStorageKeys";

const baseInitial: Omit<IAdminPanelState, "availablePositions"> = {
  panelPosition: EPanelPosition.right,
  resize: {
    width: null,
    height: null,
  },
  showPanel: false,
};

const initialByLocalStorage = (localStorage:TPanelLocalStorage): Omit<IAdminPanelState, "availablePositions"> => ({
  panelPosition: localStorage.get(EPanelLocaleStorageKey.panelPosition) || baseInitial.panelPosition,
  resize: {
    width: localStorage.get(EPanelLocaleStorageKey.resizeWidth),
    height: localStorage.get(EPanelLocaleStorageKey.resizeHeight),
  },
  showPanel: false,
});

const withAdminPanelInitialState = (
  localStorage:TPanelLocalStorage,
  availablePositions = (keys(EPanelPosition) as EPanelPosition[]),
):IWithAdminPanelState => ({
  panel: {
    ...IS_SERVER ? baseInitial : initialByLocalStorage(localStorage),
    availablePositions,
  },
});

export { withAdminPanelInitialState };
