import { actionWithPayloadCreator } from "@sb/utils";
import { type EPanelPosition } from "./Model";

const panelAction = actionWithPayloadCreator("@ADMINUI_PANEL");

const changePanelPositionAction = panelAction(
  "CHANGE_PANEL_POSITION",
  (panelPosition: EPanelPosition) => ({
    panelPosition,
  }),
);

const changeResizeWidthAction = panelAction("CHANGE_RESIZE_WIDTH", (width: number) => ({ width } ));

const changeResizeHeightAction = panelAction("CHANGE_RESIZE_HEIGHT", (height: number) =>  ({ height }));

const changeShowPanelAction = panelAction("CHANGE_SHOW_PANEL", (showPanel: boolean) =>  ({ showPanel }));

export {
  changePanelPositionAction,
  changeResizeWidthAction,
  changeResizeHeightAction,
  changeShowPanelAction,
};
