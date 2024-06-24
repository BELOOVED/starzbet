import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { createAdminPanelRootEpic } from "@sb/adminui-panel";
import { Logger } from "../../Utils/Logger";
import { type TTranslateEpic } from "./TTranslateEpic";
import { providerEpic } from "./ProviderEpic";
import { translateEpic } from "./TranslateEpic";
import { commitEpic } from "./CommitEpic";
import { editModeCheatCodesEpic } from "./EditModeCheatCodesEpic";
import { localStorageEpic } from "./LocalStorageEpic";
import { panelLocalStorage } from "./PanelLocalStorage";

const rootEpic: TTranslateEpic = (
  action$,
  state$,
  dependencies,
) => combineEpics(
  providerEpic,
  translateEpic,
  commitEpic,
  editModeCheatCodesEpic,
  createAdminPanelRootEpic(panelLocalStorage),
  localStorageEpic,
)(action$, state$, dependencies).pipe(
  catchError(
    (error) => {
      Logger.error.epic("rootEpic", error);

      return EMPTY;
    },
  ),
);

export { rootEpic };
