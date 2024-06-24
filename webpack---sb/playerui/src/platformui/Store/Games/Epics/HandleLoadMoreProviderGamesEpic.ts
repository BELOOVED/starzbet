import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { isCreator, isNotNil, type TWithRequired } from "@sb/utils";
import type { TPlatform_Games_QueryVariables } from "@sb/graphql-client/PlayerUI";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { GAME_LIST_INITIAL_ROWS_COUNT, GAME_LIST_LOAD_MORE_STEP } from "../Model/DesktopGamesOption";
import { loadMoreGamesForProvider, setVisibleRowsForProviderPageAction } from "../Actions/GamesActions";
import { gameGridWidthMap } from "../Model/Games";
import {
  fetchedGamesCountByPageAndProviderSelector,
  gridTypeSelector,
  pageProviderToGameMapNotNilSelectors,
} from "../Selectors/GamesSelectors";
import { getVariablesForProviderGames } from "../Utils/GameEpicUtils";
import { gamesForProviderAdditionalLoadingFactory } from "./GameManagerEpicFactories";

const handleLoadMoreProviderGamesEpic: TMixAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(loadMoreGamesForProvider),
  switchMap(({ payload: { provider, page } }) => {
    const gridType = gridTypeSelector(state$.value);
    const gridWidth = gameGridWidthMap[gridType];
    const visibleRows = pageProviderToGameMapNotNilSelectors.visibleRows(state$.value, page, provider);
    const fetchedCount = fetchedGamesCountByPageAndProviderSelector(state$.value, page, provider);

    const { endCursor, hasNextPage } = pageProviderToGameMapNotNilSelectors.pageInfo(state$.value, page, provider);

    const gamesCountToFetch = gridWidth * GAME_LIST_LOAD_MORE_STEP;

    // games state do not cleared during runtime, if we return back on page where user fetched more games - just show them
    if ((visibleRows * gridWidth) + gamesCountToFetch <= fetchedCount || !hasNextPage) {
      return of(setVisibleRowsForProviderPageAction(page, provider, visibleRows + GAME_LIST_INITIAL_ROWS_COUNT));
    }

    const variables: TWithRequired<TPlatform_Games_QueryVariables, "cursor"> = getVariablesForProviderGames(gamesCountToFetch, provider, page, gridType);

    if (isNotNil(endCursor)) {
      variables.cursor.after = endCursor;
    }

    return gamesForProviderAdditionalLoadingFactory(
      provider,
      page,
      visibleRows + GAME_LIST_INITIAL_ROWS_COUNT,
      variables,
    )(action$, state$, deps);
  }),
);

export { handleLoadMoreProviderGamesEpic };
