import { type Selector } from "react-redux";
import { createPropertySelector, createSimpleSelector } from "@sb/utils";
import { type TCasinoState } from "../../Casino/CasinoInitialState";
import { type TWithLiveGamesState } from "../LiveGamesInitialState";

const liveGamesSelector: Selector<TWithLiveGamesState, TCasinoState> = ({ liveGames }) => liveGames;

const liveGamesFavouritesSelector = createPropertySelector(
  liveGamesSelector,
  "favourites",
);

const liveGamesFavouritesSelectorLength = createPropertySelector(
  liveGamesFavouritesSelector,
  "length",
);

const liveGamesGameIdsSelector = createPropertySelector(
  liveGamesSelector,
  "gameIds",
);

const liveGamesPageInfoSelector = createPropertySelector(
  liveGamesSelector,
  "pageInfo",
);

const liveGamesFavouriteByGameId = createSimpleSelector(
  [
    liveGamesFavouritesSelector,
    (_, gameId: string) => gameId,
  ],
  (favourites, gameId) => favourites.find((it) => it === gameId),
);

export {
  liveGamesFavouritesSelector,
  liveGamesFavouritesSelectorLength,
  liveGamesFavouriteByGameId,
  liveGamesGameIdsSelector,
  liveGamesPageInfoSelector,
};
