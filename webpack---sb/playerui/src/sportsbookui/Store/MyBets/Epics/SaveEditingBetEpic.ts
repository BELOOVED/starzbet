import { concat, filter, of, switchMap, tap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  saveEditBetAction,
  saveEditingBetDoneAction,
  saveEditingBetErrorAction,
  startSaveMyBetsAction,
} from "../MyBetsActions";
import { savingEditableBetSelector } from "../Selectors/MyBetsSelectors";
import { editBetCommandSelector } from "../Selectors/EditBetCommandSelector";

//todo implement callManager
const saveEditingBetEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(saveEditBetAction),
  filter(() => !savingEditableBetSelector(state$.value)),
  switchMap(() => {
    const payload = editBetCommandSelector(state$.value);
    Logger.info.epic("[MyBets]", "start saveEditingBet.");

    return concat(
      of(startSaveMyBetsAction()),
      callWithAbort(sportsbookHttpApi.callEditBet, payload).pipe(
        tap(() => {
          Logger.info.epic("[MyBets]", "saveEditingBet done");
        }),
        map(saveEditingBetDoneAction),
        catchError((err) => {
          Logger.warn.epic("[MyBets]", "saveEditingBet error");

          return of(saveEditingBetErrorAction(err));
        }),
      ),
    );
  }),
);

export { saveEditingBetEpic };
