import { type Epic } from "redux-observable";
import { type Action } from "redux";
import { createLocalStorageEpic } from "@sb/utils/EpicUtils/CreateLocalStorageEpic";
import { type TExplicitAny } from "@sb/utils";
import { changePanelPositionAction, changeResizeHeightAction, changeResizeWidthAction } from "../Store/Actions";
import { EPanelLocaleStorageKey, type TAppLocalStorageData, type TPanelLocalStorage } from "./LocalStorageKeys";
import { type IWithAdminPanelState } from "./Model";

const prop = (key: string) => <T>({ payload }: { payload: Record<string, T>; }) => payload[key];

const createAdminPanelRootEpic = <
  Input extends Action,
  Output extends Input = Input,
  State = IWithAdminPanelState,
  Dependencies = TExplicitAny
>(
    panelLocalStorage: TPanelLocalStorage,
  ): Epic<Input, Output, State, Dependencies> => createLocalStorageEpic<TAppLocalStorageData>(
    [
      [changePanelPositionAction, prop("panelPosition"), EPanelLocaleStorageKey.panelPosition],
      [changeResizeWidthAction, prop("width"), EPanelLocaleStorageKey.resizeWidth],
      [changeResizeHeightAction, prop("height"), EPanelLocaleStorageKey.resizeHeight],
    ],
    panelLocalStorage,
  ) as Epic<Input, Output, State, Dependencies>;

export {
  createAdminPanelRootEpic,
};
