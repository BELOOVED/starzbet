// @ts-nocheck
import { createRootReducer } from "@sb/utils";
import { type TAppState } from "../../InitialState";
import {
  appChangePathNamespaceAction,
  appIncrementRestartNumberAction,
  appResetStateAction,
  appSetAsAdminUIFrameAction,
} from "../AppActions";
import { appResetStateReducer } from "./AppResetStateReducer";
import { appIncrementRestartNumberReducer } from "./AppIncrementRestartNumberReducer";
import { appChangePathNamespaceReducer } from "./AppChangePathNamespaceReducer";

const appSetAsAdminUIFrameReducer = (state: TAppState) => ({ ...state, app: { ...state.app, isAdminuiFrame: true } });

const appRootReducer = createRootReducer([
  [appResetStateReducer, appResetStateAction],
  [appIncrementRestartNumberReducer, appIncrementRestartNumberAction],
  [appChangePathNamespaceReducer, appChangePathNamespaceAction],
  [appSetAsAdminUIFrameReducer, appSetAsAdminUIFrameAction],
]);

export { appRootReducer };
