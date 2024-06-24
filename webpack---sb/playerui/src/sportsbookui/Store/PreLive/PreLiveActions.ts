import { type TLocalizedRouteParams } from "../../../common/Client/Core/Services/RouterService/Model/RoutesTypes";
import { type ECustoms } from "./PreLiveState";

const preLiveSportIdAction = (sportId: string) => ({
  type: "@PRE_LIVE/CHANGE_SPORT_ID",
  payload: { sportId },
});

const preLiveToggleFavouriteAction = (tournamentId: string) => ({
  type: "@PRE_LIVE/TOGGLE_FAVOURITE",
  payload: { tournamentId },
});

const preLiveTogglePinEventAction = (eventId: string) => ({
  type: "@PRE_LIVE/PIN_EVENT",
  payload: { eventId },
});

const preLiveFavoritesFetchedAction = (favourites: string[]) => ({
  type: "@PRE_LIVE/FAVOURITES_FETCHED",
  payload: { favourites },
});

const preLiveSetRootRouteAction = (rootRoute: TLocalizedRouteParams<string>) => ({
  type: "@PRE_LIVE/SET_ROOT_ROUTE",
  payload: { rootRoute },
});

const changePreLiveSelectedMapAction = (period: string, sportId: string, tournamentId: string) => ({
  type: "@PRE_LIVE/SET_SELECTED_MAP",
  payload: {
    period,
    sportId,
    tournamentId,
  },
});

const setPreLiveCustomAction = (entity: ECustoms, id: string) => ({
  type: "@PRE_LIVE/SET_CUSTOM",
  payload: {
    entity,
    id,
  },
});

const resetPreLiveCustomAction = () => ({
  type: "@PRE_LIVE/RESET_CUSTOM",
});

export {
  preLiveSportIdAction,
  preLiveToggleFavouriteAction,
  preLiveFavoritesFetchedAction,
  preLiveSetRootRouteAction,
  changePreLiveSelectedMapAction,
  preLiveTogglePinEventAction,
  setPreLiveCustomAction,
  resetPreLiveCustomAction,
};

