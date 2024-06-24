import { type TNil } from "@sb/utils";

enum EPanelPosition {
  right = "right",
  left = "left",
  bottom = "bottom",
  outer = "outer",
}

const isOuter = (pos: string): boolean => pos === EPanelPosition.outer;

interface IAdminPanelState {
  showPanel: boolean;
  panelPosition: EPanelPosition;
  availablePositions: EPanelPosition[];
  resize: {
    width: number | TNil;
    height: number | TNil;
  };
}

interface IWithAdminPanelState {
  panel: IAdminPanelState;
}

export {
  isOuter,
  EPanelPosition,
};

export type {
  IWithAdminPanelState,
  IAdminPanelState,
};
