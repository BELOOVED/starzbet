import { switchMap } from "rxjs/operators";
import { EMPTY, of } from "rxjs";
import { isCreator, isNotNil, type TWithRequired } from "@sb/utils";
import type { TPlatform_Games_QueryVariables } from "@sb/graphql-client/PlayerUI";
import { EWhere_Predicate } from "@sb/graphql-client";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { loadMoreGamesForCombineProviders, setVisibleRowsForCombineProvidersPageAction } from "../Actions/GamesActions";
import { gameGridWidthMap } from "../Model/Games";
import {
  combineProvidersSelector,
  fetchedCombineProvidersGamesCountByPageSelector,
  gridTypeSelector,
  pageInfoCombineProviderGamesByPageSelector,
  visibleRowsCombineProvidersGamesByPageSelector,
} from "../Selectors/GamesSelectors";
import { GAME_LIST_INITIAL_ROWS_COUNT, GAME_LIST_LOAD_MORE_STEP } from "../Model/DesktopGamesOption";
import { getPredicatesForCombineProvidersGames } from "../Utils/GameEpicUtils";
import { gamesForCombineProvidersAdditionalLoadingFactory } from "./GameManagerEpicFactories";

const handleLoadMoreCombineProvidersGamesEpic: TMixAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(loadMoreGamesForCombineProviders),
  switchMap(({ payload: { page } }) => {
    const gridWidth = gameGridWidthMap[gridTypeSelector(state$.value)];
    const visibleRows = visibleRowsCombineProvidersGamesByPageSelector(state$.value, page);
    const fetchedCount = fetchedCombineProvidersGamesCountByPageSelector(state$.value, page);

    const { endCursor, hasNextPage } = pageInfoCombineProviderGamesByPageSelector(state$.value, page);

    const gamesCountToFetch = gridWidth * GAME_LIST_LOAD_MORE_STEP;

    // games state do not cleared during runtime, if we return back on page where user fetched more games - just show them
    if ((visibleRows * gridWidth) + gamesCountToFetch <= fetchedCount || !hasNextPage) {
      return of(setVisibleRowsForCombineProvidersPageAction(page, visibleRows + GAME_LIST_INITIAL_ROWS_COUNT));
    }

    const providers = combineProvidersSelector(state$.value, page);

    if (!providers) {
      return EMPTY;
    }

    const variables: TWithRequired<TPlatform_Games_QueryVariables, "cursor"> = {
      cursor: { first: gamesCountToFetch },
      where: { predicate: EWhere_Predicate.and, operands: getPredicatesForCombineProvidersGames(providers, page) },
    };

    if (isNotNil(endCursor)) {
      variables.cursor.after = endCursor;
    }

    return gamesForCombineProvidersAdditionalLoadingFactory(
      page,
      visibleRows + GAME_LIST_INITIAL_ROWS_COUNT,
      variables,
    )(action$, state$, deps);
  }),
);
export { handleLoadMoreCombineProvidersGamesEpic };
