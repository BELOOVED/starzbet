import { createPropertySelectors, createSimpleSelector } from "@sb/utils";
import { type ICMSEditorState } from "./Model";

const cmsEditorSelectors = createPropertySelectors((state: ICMSEditorState) => state);

const cmsPanelVisibleSelector = createSimpleSelector(
  [cmsEditorSelectors.cmsEditorMode, cmsEditorSelectors.configured],
  (mode, configured) => mode && configured,
);

const cmsUISelectors = createPropertySelectors(cmsEditorSelectors.cmsUI);

export {
  cmsPanelVisibleSelector,
  cmsEditorSelectors,
  cmsUISelectors,
};
