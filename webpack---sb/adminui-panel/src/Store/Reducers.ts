import { createRootReducer, simpleReducer } from "@sb/utils";
import { changePanelPositionAction, changeResizeHeightAction, changeResizeWidthAction, changeShowPanelAction } from "./Actions";

const changePanelPositionReducer = simpleReducer(["panelPosition"], ["panel", "panelPosition"]);
const changeResizeWidthReducer = simpleReducer(["width"], ["panel", "resize", "width"]);
const changeResizeHeightReducer = simpleReducer(["height"], ["panel", "resize", "height"]);
const changeShowPanelReducer = simpleReducer(["showPanel"], ["panel", "showPanel"]);

const adminPanelReducers = createRootReducer(
  [
    [changePanelPositionReducer, changePanelPositionAction],
    [changeResizeWidthReducer, changeResizeWidthAction],
    [changeResizeHeightReducer, changeResizeHeightAction],
    [changeShowPanelReducer, changeShowPanelAction],
  ],
);

export {
  adminPanelReducers,
};
