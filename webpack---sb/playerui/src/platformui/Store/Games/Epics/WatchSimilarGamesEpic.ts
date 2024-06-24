import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { filter } from "rxjs";
import { extractNodesFromEdges, getNotNil, isNotNil } from "@sb/utils";
import {
  platformGamesQueryOptionalFields,
  query_Platform_Games,
  type TPlatform_Games_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import { EWhere_Predicate } from "@sb/graphql-client";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import {
  drawerVisibleIdSelector,
  SIMILAR_GAMES_COUNT_IN_DRAWER,
  similarGamesInDrawer,
} from "../../GameInfoDrawer/Selectors/GameInfoDrawerSelectors";
import { gameByIdSelector } from "../Selectors/GamesSelectors";
import { getPredicatesForProviderGames } from "../Utils/GameEpicUtils";
import { GAME_MANAGER_SIMILAR_GAMES_LOADING_SYMBOL } from "../Variables";
import { simpleGamesLoadedAction } from "../Actions/GamesActions";

const watchSimilarGamesEpic: TMixAppEpic = (action$, state$, deps) => state$.pipe(
  map(drawerVisibleIdSelector),
  filter(isNotNil),
  distinctUntilChanged(),
  filter(() => {
    const similarGames = similarGamesInDrawer(state$.value);

    return similarGames.length < SIMILAR_GAMES_COUNT_IN_DRAWER;
  }),
  switchMap((gameId) => {
    const similarGamesLength = similarGamesInDrawer(state$.value).length;
    const countToFetch = SIMILAR_GAMES_COUNT_IN_DRAWER - similarGamesLength;
    const { provider, gamePage } = getNotNil(
      gameByIdSelector(state$.value, gameId),
      ["watchSimilarGamesEpic"],
      "Game",
    );

    const variables: TPlatform_Games_QueryVariables = {
      cursor: { first: countToFetch },
      where: {
        predicate: EWhere_Predicate.and,
        operands: getPredicatesForProviderGames(provider, gamePage),
      },
    };

    return gqlLoadingFactory(
      [GAME_MANAGER_SIMILAR_GAMES_LOADING_SYMBOL, gameId],
      query_Platform_Games,
      { optionalFields: platformGamesQueryOptionalFields, variables },
      simpleGamesLoadedAction,
      ({ platform: { Games } }) => [extractNodesFromEdges(Games)],
    )(action$, state$, deps);
  }),
);

export { watchSimilarGamesEpic };
