import { combineEpics } from "redux-observable";
import { pushBlockEpic, pushImportedBlockEpic, validBlockEpic } from "./PushBlockEpic";
import { loadBlockContentRootEpic } from "./LoadBlockContentRootEpic";
import { mountPageContentWrapperEpic } from "./MountPageContentWrapperEpic";
import { mountVariablesEpic } from "./MountVariablesEpic";
import { mountNoPageContentBlockEpic } from "./MountNoPageContentEpic";
import { resetBlockContentEpic } from "./ResetBlockContentEpic";
import { exportBlockContentEpic } from "./ExportBlockContentEpic";
import { loadVariablesEpic } from "./LoadVariablesEpic";
import { mountMetaContentWrapperEpic } from "./MountMetaContentWrapperEpic";
import { exportCmsCheatCodeEpic, importCmsCheatCodeEpic } from "./ImportExport/ImportExportEpic";

const rootBlockEpic = combineEpics(
  validBlockEpic,
  pushBlockEpic,
  loadBlockContentRootEpic,
  resetBlockContentEpic,
  mountNoPageContentBlockEpic,
  mountPageContentWrapperEpic,
  mountVariablesEpic,
  mountMetaContentWrapperEpic,
  pushImportedBlockEpic,
  exportBlockContentEpic,
  loadVariablesEpic,
  importCmsCheatCodeEpic,
  exportCmsCheatCodeEpic,
);

export { rootBlockEpic };
