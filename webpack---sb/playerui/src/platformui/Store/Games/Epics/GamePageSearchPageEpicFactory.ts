import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { debounceTime, filter, of } from "rxjs";
import { combineEpics } from "redux-observable";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import { matchPath, type TMatch } from "@sb/react-router-compat";
import {
  EOrderDirection,
  EPlatform_GameOrderByPaths,
  EPlatform_GameWhereFieldPaths,
  EWhere_Predicate,
} from "@sb/graphql-client";
import {
  createSimpleSelector,
  extractNodesFromEdges,
  getNotNil,
  isCreator,
  isNil,
  isNotNil,
  type TWithRequired,
  withParams,
} from "@sb/utils";
import {
  platformGamesQueryOptionalFields,
  query_Platform_Games,
  type TPlatform_Games_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import { routerLocationSelector } from "@sb/router";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import {
  searchPageInfoByGamePageMap,
  searchTextPathByGamePageMap,
  type TPathWithSearchText,
} from "../../../Utils/GetGamesViewParams";
import { GAME_LIST_INITIAL_ROWS_COUNT } from "../Model/DesktopGamesOption";
import { gridTypeSelector } from "../Selectors/GamesSelectors";
import { gameGridWidthMap, type TGameManagerPage } from "../Model/Games";
import { getCommonPredicatesForGamePage } from "../Utils/GameEpicUtils";
import {
  GAME_MANAGER_SEARCH_ADDITIONAL_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_SEARCH_GAMES_LOADING_SYMBOL,
} from "../Variables";
import {
  additionalGamesForSearchReceivedAction,
  gamesForSearchReceivedAction,
  loadMoreSearchGamesAction,
  searchGamesAction,
  searchLoadMoreGamesAction,
} from "../Actions/GamesActions";

type TWithCursorGameVariables = TWithRequired<TPlatform_Games_QueryVariables, "cursor">

/**
 * do not export, just for 'gamePageSearchPageEpicFactory'
 */
const routerSearchTextSelector = createSimpleSelector(
  [
    routerLocationSelector,
    (_: unknown, path: TPathWithSearchText) => path,
  ],
  ({ pathname }, path) => getNotNil(
    matchPath<{ searchText: string; }>(
      pathname,
      { path },
    ),
    ["routerSearchTextSelector"],
    "Match path",
  )
    .params
    .searchText,
);

const searchGamesEpicFactory = (
  gamePage: EGamePage,
  variables: TPlatform_Games_QueryVariables,
): TMixAppEpic => gqlLoadingFactory(
  GAME_MANAGER_SEARCH_GAMES_LOADING_SYMBOL,
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForSearchReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage],
);

const handleLoadMoreEpicFactory = (
  gamePage: TGameManagerPage,
  baseVariables: TWithCursorGameVariables,
): TMixAppEpic => (action$, state$, deps) => action$.pipe(
  isCreator(loadMoreSearchGamesAction),
  switchMap(() => {
    const pageInfoSelector = searchPageInfoByGamePageMap[gamePage];

    if (!pageInfoSelector) {
      throw new Error("[handleLoadMoreEpicFactory] shouldn't be null cause 'isLoadMorePossibleForSearchSelector' return 'true'");
    }

    const pageInfo = pageInfoSelector(state$.value);

    const variables = { ...baseVariables };

    if (isNotNil(pageInfo) && isNotNil(pageInfo.endCursor)) {
      variables.cursor.after = pageInfo.endCursor;
    }

    return gqlLoadingFactory(
      GAME_MANAGER_SEARCH_ADDITIONAL_GAMES_LOADING_SYMBOL,
      query_Platform_Games,
      { optionalFields: platformGamesQueryOptionalFields, variables },
      additionalGamesForSearchReceivedAction,
      ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage],
    )(action$, state$, deps);
  }),
);

const gamePageSearchPageEpicFactory = (gamePage: TGameManagerPage) => (match: TMatch<{
  searchText: string;
}>): TMixAppEpic =>
  (action$, state$, deps) => {
    if (isNil(match.params.searchText)) {
      throw new Error("[gamePageSearchPageEpicFactory] should be used just with routes with param ':searchText'");
    }

    return state$.pipe(
      map(withParams(routerSearchTextSelector, searchTextPathByGamePageMap[gamePage])),
      filter((searchText) => searchText.length > 2),
      distinctUntilChanged(),
      debounceTime(400),
      switchMap((searchText) => {
        const gridType = gridTypeSelector(state$.value);

        const gridWidth = gameGridWidthMap[gridType];

        const gameCountToFetch = gridWidth * GAME_LIST_INITIAL_ROWS_COUNT;

        const variables: TWithCursorGameVariables = {
          cursor: { first: gameCountToFetch },
          where: {
            predicate: EWhere_Predicate.and,
            operands: [
              ...getCommonPredicatesForGamePage(gamePage),
              {
                predicate: EWhere_Predicate.like,
                fieldPath: EPlatform_GameWhereFieldPaths.gameGameAndActiveProviderName,
                value: searchText,
              },
            ],
          },
          orderBy: [{
            fieldPath: EPlatform_GameOrderByPaths.gameClickCount,
            direction: EOrderDirection.desc,
          }],
        };

        return combineEpics(
          searchGamesEpicFactory(gamePage, variables),
          handleLoadMoreEpicFactory(gamePage, variables),
        )(action$, state$, deps);
      }),
    );
  };

const getVariables = (text: string, page: EGamePage): TWithCursorGameVariables => ({
  cursor: { first: 10 },
  where: {
    predicate: EWhere_Predicate.and,
    operands: [
      ...getCommonPredicatesForGamePage(page),
      {
        predicate: EWhere_Predicate.like,
        fieldPath: EPlatform_GameWhereFieldPaths.gameGameAndActiveProviderName,
        value: text,
      },
    ],
  },
  orderBy: [{
    fieldPath: EPlatform_GameOrderByPaths.gameClickCount,
    direction: EOrderDirection.desc,
  }],
});

const onActionSearchGame: TMixAppEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(searchGamesAction),
  debounceTime(400),
  switchMap(({
    payload: {
      text,
      page,
    },
  }) => searchGamesEpicFactory(page, getVariables(text, page))(action$, state$, deps)),
);

const onActionLoadMoreSearchGame: TMixAppEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(searchLoadMoreGamesAction),
  switchMap(({ payload: { text, page } }) => {
    const pageInfoSelector = searchPageInfoByGamePageMap[page];

    if (!pageInfoSelector) {
      throw new Error("[handleLoadMoreEpicFactory] shouldn't be null cause 'isLoadMorePossibleForSearchSelector' return 'true'");
    }

    const pageInfo = pageInfoSelector(state$.value);

    const variables = { ...getVariables(text, page) };

    if (isNotNil(pageInfo) && isNotNil(pageInfo.endCursor)) {
      variables.cursor.after = pageInfo.endCursor;
    }

    return gqlLoadingFactory(
      GAME_MANAGER_SEARCH_ADDITIONAL_GAMES_LOADING_SYMBOL,
      query_Platform_Games,
      { optionalFields: platformGamesQueryOptionalFields, variables },
      additionalGamesForSearchReceivedAction,
      ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, page],
    )(action$, state$, deps);
  }),
);

const handleLeaveSearchPageEpicFactory = (gamePage: EGamePage): TMixAppEpic => () =>
  of(gamesForSearchReceivedAction([], null, gamePage));

export {
  gamePageSearchPageEpicFactory,
  handleLeaveSearchPageEpicFactory,
  onActionLoadMoreSearchGame,
  onActionSearchGame,
};
