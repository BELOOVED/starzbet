import { EBlockTypeMap, EThemeSegment } from "@sb/cms-core";
import { FORMS_STATE, formsInitialState } from "@sb/form-new";
import { withCallManagerDefaultState } from "@sb/call-manager";
import { getWithInitialFileServiceState, type TFileServiceConfig } from "@sb/file-service";
import { getMessagesInitialState } from "@sb/messages";
import { EPanelPosition, withAdminPanelInitialState } from "@sb/adminui-panel";
import { type ESportsbookUiTheme } from "@sb/utils";
import { type ICMSEditorState } from "./Model";
import { panelLocalStorage } from "./PanelLocalStorage";

const createCMSEditorState = (
  fileConfig: TFileServiceConfig,
  theme: ESportsbookUiTheme,
):ICMSEditorState => ({
  cmsEditorMode: false,
  configured: false,
  cmsUI: {
    path: [],
    activeTab: EBlockTypeMap.PAGES,
    theme: EThemeSegment.allTheme,
    searchFilterValue: "",
    filteredPaths: [[]],
    folderPath: [],
    openedStructure: [],
  },
  inspectMode: false,
  [FORMS_STATE]: formsInitialState,
  ...withCallManagerDefaultState,
  ...getWithInitialFileServiceState(fileConfig),
  orm: {},
  messages: getMessagesInitialState(),
  ...withAdminPanelInitialState(
    panelLocalStorage,
    [EPanelPosition.bottom, EPanelPosition.left, EPanelPosition.right, EPanelPosition.outer],
  ),
  theme,
});

export { createCMSEditorState };
