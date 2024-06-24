import { createOptionalPropertySelector, createPropertySelector, createSimpleSelector, isEmpty } from "@sb/utils";
import { callManagerStartedSelector, callManagerWasSucceededSelector } from "@sb/call-manager";
import { GAME_MANAGER_RECENTLY_PLAYED_GAMES_LOADING_SYMBOL } from "../Variables";
import { gamesStateSelector } from "./GamesSelectors";

const gameRecentlySelector = createPropertySelector(
  gamesStateSelector,
  "recentlyGames",
);

const lastPlayedGameSelector = createOptionalPropertySelector(
  gameRecentlySelector,
  0,
);

const isEmptyGameRecentlySelector = createSimpleSelector(
  [gameRecentlySelector],
  isEmpty,
);

const loadingRecentlyGamesSelector = createSimpleSelector(
  [
    callManagerStartedSelector.with.symbol(GAME_MANAGER_RECENTLY_PLAYED_GAMES_LOADING_SYMBOL),
    callManagerWasSucceededSelector.with.symbol(GAME_MANAGER_RECENTLY_PLAYED_GAMES_LOADING_SYMBOL),
  ],
  (a, b) => a || !b,
);

export {
  gameRecentlySelector,
  isEmptyGameRecentlySelector,
  loadingRecentlyGamesSelector,
  lastPlayedGameSelector,
};
