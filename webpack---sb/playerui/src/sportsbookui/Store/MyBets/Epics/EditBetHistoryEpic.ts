import { filter } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { modalCloseAction, modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { resetBetStatesAction } from "../MyBetsActions";
import { fetchBetStates } from "./FetchBetStates";

const openEditHistoryEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(modalOpenAction),
  filter((action): action is {
    type: string;
    payload: { type: EModal; data: { betId: string; }; keepPreviousOpen: boolean; };
  } => action.payload.type === EModal.betHistory),
  switchMap(({ payload: { data } }) => fetchBetStates(data.betId, state$.value, sportsbookHttpApi)),
);

//todo for reducer refactoring
const closeEditHistoryEpic: TAppEpic = (action$) => action$.pipe(
  isCreator(modalCloseAction),
  filter(({ payload: { type } }) => type === EModal.betHistory),
  map(resetBetStatesAction),
);

const editBetHistoryEpic: TAppEpic = combineEpics(
  openEditHistoryEpic,
  closeEditHistoryEpic,
);

export { editBetHistoryEpic };
