import { actionWithPayloadCreator, type TExplicitAny } from "@sb/utils";

const cmsEditorAction = actionWithPayloadCreator("@CMS-ON-SITE-EDITOR");

const changeEditorModeAction = cmsEditorAction(
  "CHANGE_EDITOR_MODE",
  (editorMode: boolean) => ({
    editorMode,
  }),
);

const pushAction = cmsEditorAction(
  "PUSH_ACTION",
  (path: string[], value: TExplicitAny) => ({
    path,
    value,
  }),
);

const setConfiguredAction = cmsEditorAction(
  "SET_CONFIGURED",
  (configured: boolean) => ({
    configured,
  }),
);

const setInspectModeAction = cmsEditorAction(
  "SET_INSPECT_MODE",
  (inspectMode: boolean) => ({
    inspectMode,
  }),
);

const openCmsBlockAction = cmsEditorAction(
  "OPEN_CMS_BLOCK_ACTION",
  (payload: string[]) => ({
    payload,
  }),
);

export {
  pushAction,
  changeEditorModeAction,
  setConfiguredAction,
  setInspectModeAction,
  openCmsBlockAction,
};
