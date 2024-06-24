import { createRootReducer } from "@sb/utils";
import { removedTokenAction } from "../../../../platformui/Store/Auth/AuthActions";
import { betSlipCreatePickAction, betSlipRemovePickAction } from "../../BetSlip/BetSlipActions";
import {
  cancelAddingBetAction,
  cancelCommittingPicksAction,
  cancelEditBetAction,
  changeCountPerPageMyBetsAction,
  changeFilterMyBetsAction,
  changeOutcomeAction,
  changePickStakeAction,
  changeSkipAddSelectionTipAction,
  changeSkipEditBetTutorialAction,
  changeTimeRangeMyBetsAction,
  clearEditingBetErrorAction,
  completeAddingBetAction,
  completeCommittingPicksAction,
  loadMoreMyBetsAction,
  nextPageMyBetsAction,
  onRemovePickAction,
  pendingMyBetsAction,
  prevPageMyBetsAction,
  receiveBetAction,
  receiveBetStatesAction,
  receiveCountPlayerBetsAction,
  receiveMyBetsAction,
  receiveOutcomeHistoryAction,
  requestMyBetsAction,
  resetBetStatesAction,
  resetMyBetsAction,
  saveEditingBetDoneAction,
  saveEditingBetErrorAction,
  startAddingBetAction,
  startCommittingPicksAction,
  startEditBetAction,
  startSaveMyBetsAction,
  updateMyBetsAction,
} from "../MyBetsActions";
import { receiveMyBetsReducer } from "./ReceiveMyBetsReducer";
import { receiveCountPlayerBetsReducer } from "./ReceiveCountPlayerBetsReducer";
import { receiveBetReducer } from "./ReceiveBetReducer";
import { startEditBetReducer } from "./StartEditBetReducer";
import { cancelEditBetReducer } from "./CancelEditBetReducer";
import { addPickReducer } from "./AddPickReducer";
import { removeNotAppliedPickReducer } from "./RemoveNotAppliedPickReducer";
import { removePickReducer } from "./RemovePickReducer";
import { receiveOutcomeHistoryReducer } from "./ReceiveOutcomeHistoryReducer";
import { changeSkipAddSelectionTipReducer } from "./ChangeSkipAddSelectionTipReducer";
import { changeSkipEditBetTutorialReducer } from "./ChangeSkipEditBetTutorialReducer";
import { changeCountPerPageReducer } from "./ChangeCountPerPageReducer";
import { nextPageMyBetsReducer } from "./NextPageMyBetsReducer";
import { prevPageMyBetsReducer } from "./PrevPageMyBetsReducer";
import { changeTimeRangeMyBetsReducer } from "./ChangeTimeRangeMyBetsReducer";
import { requestMyBetsReducer } from "./RequestMyBetsReducer";
import { loadMoreMyBetsReducer } from "./LoadMoreMyBetsReducer";
import { changeFilterMyBetsReducer } from "./ChangeFilterMyBetsReducer";
import { pendingMyBetsReducer } from "./PendingMyBetsReducer";
import { resetBetStatesReducer } from "./ResetBetStatesReducer";
import { receiveBetStatesReducer } from "./ReceiveBetStatesReducer";
import { resetMyBetsReducer } from "./ResetMyBetsReducer";
import { changeOutcomeReducer } from "./ChangeOutcomeReducer";
import { changePickStakeReducer } from "./ChangePickStakeReducer";
import { completeAddingBetReducer } from "./CompleteAddingBetReducer";
import { startCancelAddingBetReducer } from "./StartCancelAddingBetReducer";
import { startAddingBetReducer } from "./StartAddingBetReducer";
import { saveErrorReducer } from "./SaveErrorReducer";
import { startSaveEditingMyBetsReducer } from "./StartSaveEditingMyBetsReducer";
import { updateMyBetsReducer } from "./UpdateMyBetsReducer";
import { startCommittingPicksReducer } from "./CommittingPicks/StartCommittingPicksReducer";
import { cancelCommittingPicksReducer } from "./CommittingPicks/CancelCommittingPicksReducer";
import { completeCommittingPicksReducer } from "./CommittingPicks/CompleteCommittingPicksReducer";
import { clearEditingBetErrorReducer } from "./ClearEditingBetErrorReducer";

const myBetsRootReducer = createRootReducer([
  [receiveMyBetsReducer, receiveMyBetsAction],
  [receiveCountPlayerBetsReducer, receiveCountPlayerBetsAction],
  [receiveBetReducer, receiveBetAction],
  [startEditBetReducer, startEditBetAction],
  [cancelEditBetReducer, cancelEditBetAction],
  [addPickReducer, betSlipCreatePickAction],
  [removeNotAppliedPickReducer, betSlipRemovePickAction],
  [removePickReducer, onRemovePickAction],
  [cancelEditBetReducer, saveEditingBetDoneAction],
  [saveErrorReducer, saveEditingBetErrorAction],
  [startSaveEditingMyBetsReducer, startSaveMyBetsAction],
  [startAddingBetReducer, startAddingBetAction],
  [startCancelAddingBetReducer, cancelAddingBetAction],
  [completeAddingBetReducer, completeAddingBetAction],
  [changePickStakeReducer, changePickStakeAction],
  [changeOutcomeReducer, changeOutcomeAction],
  [resetMyBetsReducer, resetMyBetsAction],
  [resetMyBetsReducer, removedTokenAction],
  [receiveBetStatesReducer, receiveBetStatesAction],
  [resetBetStatesReducer, resetBetStatesAction],
  [pendingMyBetsReducer, pendingMyBetsAction],
  [changeFilterMyBetsReducer, changeFilterMyBetsAction],
  [updateMyBetsReducer, updateMyBetsAction],
  [loadMoreMyBetsReducer, loadMoreMyBetsAction],
  [requestMyBetsReducer, requestMyBetsAction],
  [changeSkipEditBetTutorialReducer, changeSkipEditBetTutorialAction],
  [changeSkipAddSelectionTipReducer, changeSkipAddSelectionTipAction],
  [changeTimeRangeMyBetsReducer, changeTimeRangeMyBetsAction],
  [prevPageMyBetsReducer, prevPageMyBetsAction],
  [nextPageMyBetsReducer, nextPageMyBetsAction],
  [changeCountPerPageReducer, changeCountPerPageMyBetsAction],
  [receiveOutcomeHistoryReducer, receiveOutcomeHistoryAction],
  [startCommittingPicksReducer, startCommittingPicksAction],
  [cancelCommittingPicksReducer, cancelCommittingPicksAction],
  [completeCommittingPicksReducer, completeCommittingPicksAction],
  [clearEditingBetErrorReducer, clearEditingBetErrorAction],
]);

export { myBetsRootReducer };
