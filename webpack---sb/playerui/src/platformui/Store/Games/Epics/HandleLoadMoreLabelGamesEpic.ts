import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { isCreator } from "@sb/utils";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { GAME_LIST_INITIAL_ROWS_COUNT, GAME_LIST_LOAD_MORE_STEP } from "../Model/DesktopGamesOption";
import { loadMoreGamesForLabel, setVisibleRowsForLabelPageAction } from "../Actions/GamesActions";
import {
  fetchedGamesCountByPageAndLabelIdSelector,
  gridTypeSelector,
  labelGamesVisibleGamesCountSelector,
  pageInfoByPageAndLabelIdSelector,
  visibleRowsByPageAndLabelIdSelector,
} from "../Selectors/GamesSelectors";
import { gameGridWidthMap, systemLabels } from "../Model/Games";
import { getVariablesSelectorForLabelGames } from "../Utils/GameEpicUtils";
import { gamesForLabelAdditionalLoadingFactory } from "./GameManagerEpicFactories";

const handleLoadMoreLabelGamesEpic: TMixAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(loadMoreGamesForLabel),
  switchMap(({ payload: { labelId, page } }) => {
    const visibleRows = visibleRowsByPageAndLabelIdSelector(state$.value, page, labelId);

    if (labelId === systemLabels.favourite) { // all fav games already fetched
      return of(setVisibleRowsForLabelPageAction(page, labelId, visibleRows + GAME_LIST_LOAD_MORE_STEP));
    }

    const gridType = gridTypeSelector(state$.value);
    const gridWidth = gameGridWidthMap[gridType];
    const shouldBeRendered = gridWidth * GAME_LIST_LOAD_MORE_STEP;
    const fetchedCount = fetchedGamesCountByPageAndLabelIdSelector(state$.value, page, labelId);
    const visibleGamesCount = labelGamesVisibleGamesCountSelector(state$.value, page, labelId);

    const { hasNextPage, endCursor } = pageInfoByPageAndLabelIdSelector(state$.value, page, labelId);

    // games state do not cleared during runtime, if we return back on page where user fetched more games - just show them
    if (visibleGamesCount + shouldBeRendered <= fetchedCount || !hasNextPage) {
      return of(setVisibleRowsForLabelPageAction(page, labelId, visibleRows + GAME_LIST_LOAD_MORE_STEP));
    }

    const alreadyOverfetchedGamesCount = fetchedCount - visibleGamesCount;
    const gamesCountToFetch = shouldBeRendered - alreadyOverfetchedGamesCount;

    return gamesForLabelAdditionalLoadingFactory(
      labelId,
      page,
      visibleRows + GAME_LIST_INITIAL_ROWS_COUNT,
      getVariablesSelectorForLabelGames(page, labelId, gamesCountToFetch, gridType, endCursor)(state$.value),
    )(action$, state$, deps);
  }),
);

export { handleLoadMoreLabelGamesEpic };
