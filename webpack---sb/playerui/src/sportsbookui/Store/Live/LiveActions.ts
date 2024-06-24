const liveAddFavoriteAction = (id: string) => ({
  type: "@LIVE/ADD_FAVORITE",
  payload: { id },
});

const liveRemoveFavoriteAction = (id: string) => ({
  type: "@LIVE/REMOVE_FAVORITE",
  payload: { id },
});

const liveTogglePinEventAction = (eventId: string) => ({
  type: "@LIVE/PIN_EVENT",
  payload: { eventId },
});

const liveFavoritesFetchedAction = (favorites: string[]) => ({
  type: "@LIVE/FETCHED_FAVOURITES",
  payload: { favorites },
});

const liveToggleFavouriteAction = (tournamentId: string) => ({
  type: "@LIVE/TOGGLE_FAVOURITE",
  payload: { tournamentId },
});

const liveChangeSportIdAction = (sportId: string) => ({
  type: "@LIVE/CHANGE_SPORT_ID",
  payload: { sportId },
});

const liveAddClosableSportIdAction = (sportId: string) => ({
  type: "@LIVE/ADD_CLOSABLE_SPORT_ID",
  payload: { sportId },
});

const liveAddClosableSportIdsAction = (sportIds: string[]) => ({
  type: "@LIVE/ADD_CLOSABLE_SPORT_IDS",
  payload: { sportIds },
});

const liveRemoveClosableSportIdAction = (sportId: string) => ({
  type: "@LIVE/REMOVE_CLOSABLE_SPORT_ID",
  payload: { sportId },
});

const liveAddClosableTournamentIdAction = (tournamentId: string) => ({
  type: "@LIVE/ADD_CLOSABLE_TOURNAMENT_ID",
  payload: { tournamentId },
});

const liveRemoveClosableTournamentIdAction = (tournamentId: string) => ({
  type: "@LIVE/REMOVE_CLOSABLE_TOURNAMENT_ID",
  payload: { tournamentId },
});

const addLiveViewAction = (eventId: string, showed: boolean) => ({
  type: "@LIVE/ADD_LIVE_VIEW",
  payload: { eventId, showed },
});

const removeLiveViewAction = (eventId: string) => ({
  type: "@LIVE/REMOVE_LIVE_VIEW",
  payload: { eventId },
});

const showLiveViewAction = (eventId: string) => ({
  type: "@LIVE/SHOW_LIVE_VIEW",
  payload: { eventId },
});

const changeLiveSelectedMapAction = (sportId: string, tournamentId: string) => ({
  type: "@LIVE/SET_SELECTED_MAP",
  payload: {
    sportId,
    tournamentId,
  },
});

const addEventToMultiViewAction = (eventId: string) => ({
  type: "@LIVE/ADD_EVENT_TO_MULTIVIEW",
  payload: {
    eventId,
  },
});

const startMultiViewAction = (eventId: string) => ({
  type: "@LIVE/START_MULTI_VIEW",
  payload: {
    eventId,
  },
});

const removeEventFromMultiViewAction = (eventId: string) => ({
  type: "@LIVE/REMOVE_EVENT_FROM_MULTIVIEW",
  payload: {
    eventId,
  },
});

const insertEventToMultiViewAction = (eventId: string | null, place: number) => ({
  type: "@LIVE/INSERT_EVENT_TO_MULTIVIEW",
  payload: {
    eventId,
    place,
  },
});

const startSwapEventInMultiViewAction = (eventId: string) => ({
  type: "@LIVE/START_SWAP_EVENT_ID_IN_MULTIVIEW",
  payload: {
    eventId,
  },
});

const startInsertEventInMultiViewAction = (eventId: string) => ({
  type: "@LIVE/START_INSERT_EVENT_ID_IN_MULTIVIEW",
  payload: {
    eventId,
  },
});

const moveDockedEventToMultiViewAction = (eventId: string) => ({
  type: "@LIVE/MOVE_DOCKED_EVENT_TO_MULTIVIEW",
  payload: {
    eventId,
  },
});

const selectEventForSwapModeAction = (eventId: string, place: number) => ({
  type: "@LIVE/SELECT_EVENT_FOR_SWAP_MODE",
  payload: {
    eventId,
    place,
  },
});

const addNewEventInMultiViewAction = (place: number) => ({
  type: "@LIVE/ADD_NEW_EVENT_IN_MULTIVIEW",
  payload: {
    place,
  },
});

const completeSwapEventInMultiViewAction = () => ({
  type: "@LIVE/COMPLETE_SWAP_EVENT_IN_MULTIVIEW",
});

const completeInsertEventInMultiViewAction = () => ({
  type: "@LIVE/COMPLETE_INSERT_EVENT_IN_MULTIVIEW",
});

const swapEventInMultiViewAction = (eventId: string, place: number) => ({
  type: "@LIVE/SWAP_EVENT_ID_IN_MULTIVIEW",
  payload: {
    eventId,
    place,
  },
});

const addDockToSideEventAction = (maxEvents: number, eventId: string) => ({
  type: "@LIVE/ADD_DOCK_TO_SIDE_EVENT",
  payload: {
    maxEvents,
    eventId,
  },
});

const removeDockToSideEventAction = (eventId: string | null) => ({
  type: "@LIVE/REMOVE_DOCK_TO_SIDE_EVENT",
  payload: {
    eventId,
  },
});

const toggleDockedEventAction = (eventId: string) => ({
  type: "@LIVE/TOGGLE_DOCKED_EVENT",
  payload: {
    eventId,
  },
});

const selectEventByMultiviewMenuAction = (eventId: string) => ({
  type: "@LIVE/SELECT_EVENT_BY_MULTIVIEW_MENU",
  payload: {
    eventId,
  },
});

const setLiveOnlyWidgetAction = (onlyWidget: boolean) => ({
  type: "@LIVE/SET_LIVE_ONLY_WIDGET",
  payload: {
    onlyWidget,
  },
});

const setLiveOnlyVideoAction = (onlyVideo: boolean) => ({
  type: "@LIVE/SET_LIVE_ONLY_VIDEO",
  payload: {
    onlyVideo,
  },
});

const setStreamingTabAction = (streamingTab: string) => ({
  type: "@LIVE/SET_STREAMING_TAB",
  payload: {
    streamingTab,
  },
});

const setVideoIdAction = (videoId: number | string) => ({
  type: "@LIVE/SET_VIDEO_ID",
  payload: {
    videoId,
  },
});

export {
  liveAddFavoriteAction,
  liveRemoveFavoriteAction,
  liveFavoritesFetchedAction,
  liveToggleFavouriteAction,
  liveChangeSportIdAction,
  liveAddClosableSportIdAction,
  liveAddClosableSportIdsAction,
  liveRemoveClosableSportIdAction,
  liveAddClosableTournamentIdAction,
  liveRemoveClosableTournamentIdAction,
  addLiveViewAction,
  removeLiveViewAction,
  showLiveViewAction,
  changeLiveSelectedMapAction,
  liveTogglePinEventAction,
  addDockToSideEventAction,
  removeDockToSideEventAction,
  toggleDockedEventAction,
  addEventToMultiViewAction,
  removeEventFromMultiViewAction,
  insertEventToMultiViewAction,
  startSwapEventInMultiViewAction,
  swapEventInMultiViewAction,
  completeSwapEventInMultiViewAction,
  startInsertEventInMultiViewAction,
  selectEventForSwapModeAction,
  completeInsertEventInMultiViewAction,
  addNewEventInMultiViewAction,
  moveDockedEventToMultiViewAction,
  startMultiViewAction,
  selectEventByMultiviewMenuAction,
  setLiveOnlyWidgetAction,
  setLiveOnlyVideoAction,
  setStreamingTabAction,
  setVideoIdAction,
};
