import { assocPath, createRootReducer, isNumber, mergeReducer, type TExplicitAny } from "@sb/utils";
import { ormReducer } from "@sb/rorm";
import { formsRootReducer } from "@sb/form-new";
import { callManagerRootReducer } from "@sb/call-manager";
import { fileServiceRootReducer } from "@sb/file-service";
import { messagesReducer } from "@sb/messages";
import { adminPanelReducers } from "@sb/adminui-panel";
import { BLOCK_TYPE } from "@sb/cms-core";
import { changeEditorModeAction, openCmsBlockAction, pushAction, setConfiguredAction, setInspectModeAction } from "./Actions";
import { type ICMSEditorState } from "./Model";
import { rootOrm } from "./Orm";

const changeEditorModeReducer = (
  state: ICMSEditorState,
  { payload: { editorMode } }: ReturnType<typeof changeEditorModeAction>,
): ICMSEditorState => ({
  ...state,
  cmsEditorMode: editorMode,
});

const pushFunc = (state: ICMSEditorState, value: TExplicitAny, path: string[]) => assocPath(["cmsUI"].concat(path), value, state);

const pushReducer = (
  state: ICMSEditorState,
  { payload: { value, path } }: ReturnType<typeof pushAction>,
): ICMSEditorState => pushFunc(state, value, path);

const setConfiguredReducer = (
  state: ICMSEditorState,
  { payload: { configured } }: ReturnType<typeof setConfiguredAction>,
): ICMSEditorState => ({
  ...state,
  configured,
});

const setInspectModeReducer = (
  state: ICMSEditorState,
  { payload: { inspectMode } }: ReturnType<typeof setInspectModeAction>,
): ICMSEditorState => ({
  ...state,
  inspectMode,
});

const openCmsBlockReducer = (
  state: ICMSEditorState,
  { payload: { payload } }: ReturnType<typeof openCmsBlockAction>,
): ICMSEditorState => {
  let nextState:ICMSEditorState = {
    ...state,
    panel: {
      ...state.panel,
      showPanel: true,
    },
  };

  if (payload[0] !== BLOCK_TYPE){
    nextState = pushFunc(nextState, "Pages", ["activeTab"]);

    const isChildPage = isNumber(Number(payload[2]));

    if (isChildPage){
      //child simple page
      nextState = pushFunc(nextState, [payload[0], payload[1], payload[2]], ["path"]);
    } else  {
      nextState = pushFunc(nextState, [payload[0]], ["path"]);
    }
  } else {
    nextState = pushFunc(nextState, "Blocks", ["activeTab"]);
    nextState = pushFunc(nextState, [payload[0], payload[1]], ["path"]);
  }

  return pushFunc(nextState, payload, ["folderPath"]);
};

const cmsOnSiteEditorReducers =  createRootReducer<ICMSEditorState>(
  [
    [changeEditorModeReducer, changeEditorModeAction],
    [pushReducer, pushAction],
    [setConfiguredReducer, setConfiguredAction],
    [openCmsBlockReducer, openCmsBlockAction],
    [setInspectModeReducer, setInspectModeAction],
  ],
);

const rootReducer =
  mergeReducer(
    ormReducer(rootOrm),
    callManagerRootReducer,
    formsRootReducer,
    cmsOnSiteEditorReducers,
    adminPanelReducers,
    fileServiceRootReducer,
    (state: ICMSEditorState, action) => ({
      ...state,
      messages: messagesReducer(state.messages, action, state),
    }),
  );

export {
  rootReducer,
};
