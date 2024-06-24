import { EMPTY, switchMap, take } from "rxjs";
import { platformGamesQueryOptionalFields, query_Platform_Games, type TPlatform_Games_QueryVariables } from "@sb/graphql-client/PlayerUI";
import { extractNodesFromEdges, isCreator } from "@sb/utils";
import { EPlatform_GameWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { gamesByExternalIdsAction } from "../Actions/GamesActions";
import { GAMES_BY_INTERNAL_IDS_LOADING_SYMBOL } from "../Model/Games";
import { gamesAddNewGamesAction } from "../Actions/GamesAddNewGamesActions";
import { type EExternalGameId } from "../GamesModels";
import { gameInternalIdByExternalIdsSelector } from "../Selectors/GamesSelectors";

const gamesVariables = (ids: string[]): TPlatform_Games_QueryVariables => ({
  where: {
    predicate: EWhere_Predicate.and,
    operands: [
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameIsActive,
        predicate: EWhere_Predicate.isTrue,
      },
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameProviderIsActive,
        predicate: EWhere_Predicate.eq,
        value: "true",
      },
      {
        predicate: EWhere_Predicate.in,
        fieldPath: EPlatform_GameWhereFieldPaths.gameExternalId,
        value: JSON.stringify(ids),
      },
    ],
  },
});

const loadGamesByExternalIdsEpicFactory = (ids: EExternalGameId[]): TPlatformEpic => gqlLoadingFactory(
  GAMES_BY_INTERNAL_IDS_LOADING_SYMBOL,
  query_Platform_Games,
  { variables: gamesVariables(ids), optionalFields: platformGamesQueryOptionalFields },
  gamesAddNewGamesAction,
  ({ platform: { Games } }) => ([extractNodesFromEdges(Games)]),
);

const loadLandingGamesEpicFactory = (id: EExternalGameId): TPlatformEpic =>
  (action$, state$, deps) => {
    const gameLink = gameInternalIdByExternalIdsSelector(state$.value, id);

    if (gameLink) {
      return EMPTY;
    }

    return loadGamesByExternalIdsEpicFactory([id])(action$, state$, deps);
  };

const gamesByExternalIdsEpic: TPlatformEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(gamesByExternalIdsAction),
  take(1),
).pipe(
  switchMap(({ payload: { ids } }) => loadGamesByExternalIdsEpicFactory(ids)(action$, state$, dependencies)),
);

export { gamesByExternalIdsEpic, loadLandingGamesEpicFactory };
