import { of } from "rxjs";
import { cheaterEpicFactory } from "@sb/utils";
import { changeTranslateModeAction } from "../Actions";
import { type TTranslateEpic } from "./TTranslateEpic";

const editModeCheatCodesEpic = cheaterEpicFactory<TTranslateEpic>(
  ["translator"],
  () => of(changeTranslateModeAction(true)),
  "Enables translator edit mode",
);

export { editModeCheatCodesEpic };
