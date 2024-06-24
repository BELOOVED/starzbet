import { EMPTY, filter, of, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { getNotNil, isCreator } from "@sb/utils";
import { isFlatOutrightOutcome } from "@sb/betting-core/Feed/Utils";
import { Logger } from "../../../../common/Utils/Logger";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { betSlipCreatePickAction } from "../../BetSlip/BetSlipActions";
import { pickKind } from "../../BetSlip/Model/BetPick";
import { outcomeByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { receiveOutcomeHistoryAction, startEditBetAction } from "../MyBetsActions";
import { editableBetPicksSelector, hasEditableBet, pickHasConflictByIdSelector } from "../Selectors/MyBetsSelectors";
import { saveEditingBetEpic } from "./SaveEditingBetEpic";

//todo for reducer refactoring
const startEditBetEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(startEditBetAction),
  switchMap(({ payload: { betId } }) => callWithAbort(sportsbookHttpApi.callBetStates, betId).pipe(
    map((res) => receiveOutcomeHistoryAction(res)),
    catchError((e) => {
      Logger.warn.epic("[MyBets]", "startEditBetEpic failed.", e);

      return EMPTY;
    }),
  )),
);

const editConflictEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(betSlipCreatePickAction),
  filter(({ payload: { kind } }) => kind === pickKind.base),
  filter(() => hasEditableBet(state$.value)),
  switchMap(({ payload: { id } }) => {
    const picks = editableBetPicksSelector(state$.value);
    const outcome = getNotNil(outcomeByIdSelector(state$.value, id), ["editConflictEpic"], "outcome");
    const conflict = pickHasConflictByIdSelector(id)(state$.value);

    if (isFlatOutrightOutcome(outcome) || picks.some((pick) => pick.outrightId || conflict)) {
      return of(modalOpenAction(EModal.betConflict));
    }

    return EMPTY;
  }),
);

const editBetEpic: TAppEpic = combineEpics(
  startEditBetEpic,
  saveEditingBetEpic,
  editConflictEpic,
);

export { editBetEpic };
