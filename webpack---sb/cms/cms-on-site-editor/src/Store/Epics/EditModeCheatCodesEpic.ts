import { of } from "rxjs";
import { cheaterEpicFactory } from "@sb/utils";
import { changeEditorModeAction } from "../Actions";
import { type TCMSEditorEpic } from "../Model";

const editModeCheatCodesEpic: TCMSEditorEpic = cheaterEpicFactory(
  ["cmseditor"],
  () => of(changeEditorModeAction(true)),
  "Enables cms edit mode",
);

export { editModeCheatCodesEpic };
