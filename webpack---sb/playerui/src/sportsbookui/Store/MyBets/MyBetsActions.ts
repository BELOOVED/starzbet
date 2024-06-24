import { type IMoney } from "@sb/utils";
import { type TBetTypeFilter } from "./Model/BetTypeFilter";
import { type TBet, type TBetHistoryState, type TBetHistoryStateListItem, type TPageInfo, type TTimeRange, type TWhere } from "./Model/TBet";

const loadMoreMyBetsAction = () => ({
  type: "@MYBETS/LOAD_MORE",
});

const pendingMyBetsAction = (pending: boolean) => ({
  type: "@MYBETS/PENDING",
  payload: { pending },
});

const receiveMyBetsAction = (payload: {
  where: TWhere;
  filter: TBetTypeFilter;
  bets: TBet[];
  pageInfo: TPageInfo;
}) => ({
  type: "@MYBETS/RECEIVE",
  payload,
});

const updateMyBetsAction = (bets: TBet[], pageInfo: TPageInfo) => ({
  type: "@MYBETS/UPDATE",
  payload: { bets, pageInfo },
});

const receiveCountPlayerBetsAction = (totalBetsCount: number, openedBetsCount: number) => ({
  type: "@MYBETS/COUNT_PLAYER_BETS",
  payload: { totalBetsCount, openedBetsCount },
});

const resetMyBetsAction = () => ({
  type: "@MYBETS/RESET",
});

const changeFilterMyBetsAction = (filter: TBetTypeFilter) => ({
  type: "@MYBETS/CHANGE_FILTER",
  payload: { filter },
});

const startEditBetAction = (betId: string, adding: boolean) => ({
  type: "@MYBETS/START_EDIT",
  payload: { betId, adding },
});

const cancelEditBetAction = () => ({
  type: "@MYBETS/CANCEL_EDIT",
});

const saveEditBetAction = () => ({
  type: "@MYBETS/SAVE",
});

const onRemovePickAction = (id: string) => ({
  type: "@MYBETS/REMOVE_PICK",
  payload: { id },
});

const saveEditingBetDoneAction = () => ({
  type: "@MYBETS/SAVE_DONE",
});

const saveEditingBetErrorAction = (error: Error) => ({
  type: "@MYBETS/SAVE_ERROR",
  payload: { error },
});

const clearEditingBetErrorAction = () => ({
  type: "@MYBETS/CLEAR_EDITING_BET_ERROR",
});

const startSaveMyBetsAction = () => ({
  type: "@MYBETS/START_SAVE",
});

const changeOutcomeAction = (
  oldOutcomeId: string,
  newOutcomeId: string,
) => ({
  type: "@MYBETS/CHANGE_OUTCOME",
  payload: { oldOutcomeId, newOutcomeId },
});

const startAddingBetAction = () => ({
  type: "@MYBETS/START_ADDING",
});

const cancelAddingBetAction = () => ({
  type: "@MYBETS/CANCEL_ADDING",
});

const completeAddingBetAction = () => ({
  type: "@MYBETS/COMPLETE_ADDING",
});

const changePickStakeAction = (stake: IMoney) => ({
  type: "@MYBETS/CHANGE_PICK_STAKE",
  payload: { stake },
});

const requestBetStatesAction = (betId: string) => ({
  type: "@MYBETS/REQUEST_BET_STATES",
  payload: { betId },
});

const receiveBetStatesAction = (betId: string, history: TBetHistoryState) => ({
  type: "@MYBETS/RECEIVE_BET_STATES",
  payload: { betId, history },
});

const resetBetStatesAction = () => ({
  type: "@MYBETS/RESET_BET_STATES",
});

const requestBetByIdAction = (betId: string) => ({
  type: "@MYBETS/REQUEST_BET_BY_ID",
  payload: {
    betId,
  },
});

const receiveBetAction = (bet: TBet) => ({
  type: "@MYBETS/RECEIVE_BET",
  payload: {
    bet,
  },
});

const changeSkipEditBetTutorialAction = (value: boolean) => ({
  type: "@MYBETS/CHANGE_SKIP_EDIT_BET_TUTORIAL",
  payload: {
    value,
  },
});

const changeSkipAddSelectionTipAction = (value: boolean) => ({
  type: "@MYBETS/CHANGE_SKIP_ADD_SELECTION_TIP",
  payload: {
    value,
  },
});

const requestMyBetsAction = (typeFilters: TBetTypeFilter[], countPerPage: number, timeRange: TTimeRange | null = null) => ({
  type: "@MYBETS/REQUEST",
  payload: {
    typeFilters,
    countPerPage,
    timeRange,
  },
});

const changeTimeRangeMyBetsAction = (timeRange: TTimeRange) => ({
  type: "@MYBETS/CHANGE_TIMERANGE",
  payload: {
    timeRange,
  },
});

const prevPageMyBetsAction = () => ({
  type: "@MYBETS/PREV_PAGE",
});

const nextPageMyBetsAction = () => ({
  type: "@MYBETS/NEXT_PAGE",
});

const changeCountPerPageMyBetsAction = (countPerPage: number) => ({
  type: "@MYBETS/CHANGE_COUNT_PER_PAGE",
  payload: {
    countPerPage,
  },
});

const receiveOutcomeHistoryAction = (betHistory: TBetHistoryStateListItem[]) => ({
  type: "@MYBETS/RECEIVE_OUTCOME_HISTORY",
  payload: {
    betHistory,
  },
});

const startCommittingPicksAction = () => ({
  type: "@MYBETS/START_COMMITTING_PICKS",
});

const cancelCommittingPicksAction = () => ({
  type: "@MYBETS/CANCEL_COMMITTING_PICKS",
});

const completeCommittingPicksAction = () => ({
  type: "@MYBETS/COMPLETE_COMMITTING_PICKS",
});

export {
  pendingMyBetsAction,
  receiveMyBetsAction,
  receiveCountPlayerBetsAction,
  resetMyBetsAction,
  changeFilterMyBetsAction,
  startEditBetAction,
  cancelEditBetAction,
  saveEditBetAction,
  onRemovePickAction,
  saveEditingBetDoneAction,
  saveEditingBetErrorAction,
  startSaveMyBetsAction,
  changeOutcomeAction,
  startAddingBetAction,
  cancelAddingBetAction,
  completeAddingBetAction,
  changePickStakeAction,
  requestBetStatesAction,
  receiveBetStatesAction,
  resetBetStatesAction,
  requestBetByIdAction,
  receiveBetAction,
  changeSkipEditBetTutorialAction,
  changeSkipAddSelectionTipAction,
  requestMyBetsAction,
  loadMoreMyBetsAction,
  updateMyBetsAction,
  changeTimeRangeMyBetsAction,
  prevPageMyBetsAction,
  nextPageMyBetsAction,
  changeCountPerPageMyBetsAction,
  receiveOutcomeHistoryAction,
  startCommittingPicksAction,
  cancelCommittingPicksAction,
  completeCommittingPicksAction,
  clearEditingBetErrorAction,
};
