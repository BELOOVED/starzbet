import { createRootReducer } from "@sb/utils";
import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import {
  closeStatisticAction,
  setExpandedStatisticsAction,
  statisticsLoadedAction,
  statisticsLoadFailedAction,
  statisticViewMountedAction,
  toggleFullScreeStatisticAction,
} from "../StatisticsActions";

const showStatisticReducer: TRootReducer<typeof statisticViewMountedAction> = (state, { payload: { eventId, fullScreen } }) => ({
  ...state,
  statistics: {
    ...state.statistics,
    [eventId]: {
      loading: true,
      error: false,
      statistics: state.statistics[eventId]?.statistics,
      fullScreen,
    },
  },
});

const closeStatisticReducer: TRootReducer<typeof closeStatisticAction> = (state, { payload: { eventId } }) => ({
  ...state,
  statistics: Object.entries(state.statistics).reduce(
    (acc, [id, stats]) => {
      if (id === eventId) {
        return acc;
      }

      acc[id] = stats;

      return acc;
    },
    {},
  ),
});

const statisticsLoadedReducer: TRootReducer<typeof statisticsLoadedAction> = (state, { payload: { eventId, statistics } }) => ({
  ...state,
  statistics: {
    ...state.statistics,
    [eventId]: {
      ...state.statistics[eventId],
      loading: false,
      statistics,
    },
  },
});

const statisticsLoadFailedReducer: TRootReducer<typeof statisticsLoadFailedAction> = (state, { payload: { eventId } }) => ({
  ...state,
  statistics: {
    ...state.statistics,
    [eventId]: {
      ...state.statistics[eventId],
      loading: false,
      error: true,
    },
  },
});

// todo optimize
const toggleFullScreeStatisticReducer: TRootReducer<typeof toggleFullScreeStatisticAction> = (state, { payload: { eventId } }) => {
  const nextState = { ...state, statistics: { ...state.statistics } };

  const currentState = nextState.statistics[eventId].fullScreen;

  // close all full stats
  Object.entries(nextState.statistics).forEach(([id, stats]) => {
    if (stats.fullScreen) {
      nextState.statistics[id] = {
        ...nextState.statistics[id],
        fullScreen: false,
      };
    }
  });

  // set select to full screen
  nextState.statistics[eventId] = {
    ...nextState.statistics[eventId],
    fullScreen: !currentState,
  };

  return nextState;
};

const setExpandedStatisticsReducer: TRootReducer<typeof setExpandedStatisticsAction> = (state, { payload: { eventId, expanded } }) => ({
  ...state,
  statistics: {
    ...state.statistics,
    [eventId]: {
      ...state.statistics[eventId],
      expanded,
      loading: !!expanded,
    },
  },
});

const statisticRootReducer = createRootReducer([
  [showStatisticReducer, statisticViewMountedAction],
  [closeStatisticReducer, closeStatisticAction],
  [statisticsLoadedReducer, statisticsLoadedAction],
  [statisticsLoadFailedReducer, statisticsLoadFailedAction],
  [toggleFullScreeStatisticReducer, toggleFullScreeStatisticAction],
  [setExpandedStatisticsReducer, setExpandedStatisticsAction],
]);

export { statisticRootReducer };
