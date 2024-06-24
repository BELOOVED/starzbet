import { createRootReducer, type TReducer } from "@sb/utils";
import { changeLinkTypeAction, playGameLinkReceivedAction } from "../Actions/PlayGameActions";
import { type TWithPlayGameState } from "../PlayGameState";
import {
  diffVipClubInfoAction,
  neighboursVipClubReceiveAction,
  neighboursVipClubUpdateAction,
  pinVipClubInfoAction,
  pinVipClubInfoUpdateAction,
  racesVipClubReceiveAction,
  selfAndNeighboursVipClubUpdateAction,
  selfVipClubPlacesReceiveAction,
  selfVipClubUpdateAction,
  setVipClubInfoPeriodAction,
  setVipClubInfoTypeAction,
} from "../Actions/VipClubInfoActions";
import {
  neighboursVipClubReceiveReducer,
  neighboursVipClubUpdateReducer,
  pinVipClubInfoReducer,
  pinVipClubInfoUpdateReducer,
  selfAndNeighboursVipClubUpdateReducer,
  selfVipClubPlacesReceiveReducer,
  selfVipClubUpdateReducer,
  setVipClubInfoPeriodReducer,
  setVipClubInfoTypeReducer,
} from "./VipClubInfoReducers";
import { setDiffVipClubReducer } from "./DiffReducer";
import { raceReducer } from "./RaceReducer";

const playGameLinkReceivedReducer: TReducer<TWithPlayGameState, typeof playGameLinkReceivedAction> = (
  state,
  { payload: { link, type } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    link,
    type,
  },
});

const loadGameLinkReducer: TReducer<TWithPlayGameState, typeof changeLinkTypeAction> = (
  state,
  { payload: { isDemo } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    isDemo,
  },
});

const playGameRootReducerNew = createRootReducer([
  [playGameLinkReceivedReducer, playGameLinkReceivedAction],
  [loadGameLinkReducer, changeLinkTypeAction],
  [pinVipClubInfoReducer, pinVipClubInfoAction],
  [setVipClubInfoTypeReducer, setVipClubInfoTypeAction],
  [setVipClubInfoPeriodReducer, setVipClubInfoPeriodAction],
  [selfVipClubPlacesReceiveReducer, selfVipClubPlacesReceiveAction],
  [neighboursVipClubReceiveReducer, neighboursVipClubReceiveAction],
  [setDiffVipClubReducer, diffVipClubInfoAction],
  [pinVipClubInfoUpdateReducer, pinVipClubInfoUpdateAction],
  [selfVipClubUpdateReducer, selfVipClubUpdateAction],
  [neighboursVipClubUpdateReducer, neighboursVipClubUpdateAction],
  [selfAndNeighboursVipClubUpdateReducer, selfAndNeighboursVipClubUpdateAction],
  [raceReducer, racesVipClubReceiveAction],
]);

export { playGameRootReducerNew };
