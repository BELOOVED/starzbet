import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { concat, EMPTY, filter, mergeMap, take } from "rxjs";
import { combineEpics } from "redux-observable";
import { extractNodesFromEdges, isCreator, isEmpty, isNotNil, not, withParams } from "@sb/utils";
import {
  platformGamesQueryOptionalFields,
  query_Platform_Games,
  type TPlatform_Games_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import {
  EOrderDirection,
  EPlatform_GameOrderByPaths,
  EPlatform_GameWhereFieldPaths,
  EWhere_Predicate,
} from "@sb/graphql-client";
import { callManagerSucceededSelector, callManagerWasSucceededSelector } from "@sb/call-manager";
import { EPlatformBlockMap } from "@sb/cms-core";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { CMSLoadGameLabels } from "../../../Api/CMSApi";
import type { TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  cmsGamesByIdsReceivedAction,
  cmsGamesByLabelIdsReceivedAction,
  cmsLoadMoreGames,
  labelsReceivedAction,
} from "../CMSAction";
import {
  cmsGamesEntriesSelector,
  cmsGamesLoadingSelector,
  cmsGamesMapItemSelector,
} from "../Selectors/LandingSelectors/CMSLandingSelectors";
import { CMS_BLOCKS_SYMBOL, CMS_GAMES_LOADING_SYMBOL } from "../Model/CmsSymbols";
import { cmsLoadBlockEpic } from "./CmsLoadBlockEpic";

const labelVariables = (id: string, endCursor?: string): TPlatform_Games_QueryVariables => ({
  cursor: { first: 7, after: endCursor },
  orderBy: [
    { fieldPath: EPlatform_GameOrderByPaths.gameClickCount, direction: EOrderDirection.desc },
  ],
  where: {
    predicate: EWhere_Predicate.and,
    operands: [
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameIsActive,
        predicate: EWhere_Predicate.isTrue,
      },
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameProviderIsActive,
        predicate: EWhere_Predicate.isTrue,
      },
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameSelectedLabelId,
        predicate: EWhere_Predicate.eq,
        value: id,
      },
    ],
  },
});

const gamesVariables = (ids: string[], endCursor?: string): TPlatform_Games_QueryVariables => ({
  cursor: { first: 7, after: endCursor },
  where: {
    predicate: EWhere_Predicate.and,
    operands: [
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameIsActive,
        predicate: EWhere_Predicate.isTrue,
      },
      {
        fieldPath: EPlatform_GameWhereFieldPaths.gameProviderIsActive,
        predicate: EWhere_Predicate.isTrue,
      },
      {
        predicate: EWhere_Predicate.in,
        fieldPath: EPlatform_GameWhereFieldPaths.gameId,
        value: JSON.stringify(ids),
      },
    ],
  },
  parameters: [
    {
      parameter: "game_ids",
      value: JSON.stringify(ids),
    },
  ],
  orderBy: [
    { fieldPath: EPlatform_GameOrderByPaths.gameProvidedIds },
  ],
});

type TLabel = { labelId: string; index: number; };
type TLabels = TLabel[];

const cmsLoadGamesByLabelIdsEpicFactory = ({ labelId, index }: TLabel, endCursor?: string): TPlatformEpic =>
  gqlLoadingFactory(
    [CMS_GAMES_LOADING_SYMBOL, String(index)],
    query_Platform_Games,
    { variables: labelVariables(labelId, endCursor), optionalFields: platformGamesQueryOptionalFields },
    cmsGamesByLabelIdsReceivedAction,
    ({ platform: { Games } }) => ([extractNodesFromEdges(Games), Games.pageInfo, labelId, index]),
  );

type TGame = { gameIds: string[]; index: number; };
type TGames = TGame[];

const cmsLoadGamesByIdsEpicFactory = ({ gameIds, index }: TGame, endCursor?: string) => gqlLoadingFactory(
  [CMS_GAMES_LOADING_SYMBOL, String(index)],
  query_Platform_Games,
  { variables: gamesVariables(gameIds, endCursor), optionalFields: platformGamesQueryOptionalFields },
  cmsGamesByIdsReceivedAction,
  ({ platform: { Games } }) => ([extractNodesFromEdges(Games), Games.pageInfo, index]),
);

const createCmsLoadGamesByIdsEpic = (games: TGames) => combineEpics(
  ...games.map(
    (game) => combineEpics(
      cmsLoadGamesByIdsEpicFactory(game),
    ),
  ),
);

const cmsLoadLabelsByLabelIds = (labels: TLabels): TPlatformEpic => (action$, state$, dependencies) =>
  CMSLoadGameLabels(
    labels.map(({ labelId }) => labelId),
    dependencies.graphQLClient,
  )
    .pipe(
      map(
        (labels) =>
          labelsReceivedAction(labels.map((it) => it.label)),
      ),
    );

const loadMoreGamesEpic: TPlatformEpic = (
  action$,
  state$,
  dependencies,
) =>
  action$
    .pipe(
      isCreator(cmsLoadMoreGames),
      map(({ payload: { index } }) => [cmsGamesMapItemSelector(state$.value, index), index] as const),
      filter(([game, index]) => Boolean(game.loaded.pageInfo?.hasNextPage) && !cmsGamesLoadingSelector(state$.value, String(index))),
      mergeMap(([game, index]) => {
        const endCursor = game.loaded.pageInfo?.endCursor;

        if (game.labelId) {
          return cmsLoadGamesByLabelIdsEpicFactory(
            {
              labelId: game.labelId,
              index,
            },
            endCursor,
          )(action$, state$, dependencies);
        }

        return cmsLoadGamesByIdsEpicFactory(
          { gameIds: game.gameIds, index },
          endCursor,
        )(action$, state$, dependencies);
      }),
    );

const cmsGamesByLabelAndGameIdsEpic: TPlatformEpic = (action$, state$, dependencies) => state$
  .pipe(
    map(withParams(callManagerSucceededSelector, CMS_BLOCKS_SYMBOL, EPlatformBlockMap.LANDING)),
    filter(Boolean),
    take(1),
    map(() => cmsGamesEntriesSelector(state$.value)),
    filter(isNotNil),
    switchMap((cmsGames) => {
      const labels = cmsGames
        .reduce<TLabels>(
          (acc, [index, item]) => {
            if (item.labelId) {
              acc.push({ labelId: item.labelId, index });
            }

            return acc;
          },
          [],
        );

      const games = cmsGames
        .reduce<TGames>(
          (acc, [index, item]) => {
            if (!item.labelId) {
              acc.push({ gameIds: item.gameIds, index });
            }

            return acc;
          },
          [],
        );

      const gamesEpic = createCmsLoadGamesByIdsEpic(games);

      if (isEmpty(labels) && isEmpty(games)) {
        return EMPTY;
      }

      if (isEmpty(labels)) {
        return combineEpics(gamesEpic, loadMoreGamesEpic)(action$, state$, dependencies);
      }

      const labelsGamesEpic = labels.map(
        (label) => cmsLoadGamesByLabelIdsEpicFactory(label),
      );

      const labelGamesEpic: TPlatformEpic = (
        action$,
        state$,
        dependencies,
      ) => concat(
        cmsLoadLabelsByLabelIds(labels)(action$, state$, dependencies),
        combineEpics(
          ...labelsGamesEpic,
        )(action$, state$, dependencies),
      );

      if (isEmpty(games)) {
        return combineEpics(
          labelGamesEpic,
          loadMoreGamesEpic,
        )(action$, state$, dependencies);
      }

      return combineEpics(
        labelGamesEpic,
        loadMoreGamesEpic,
        gamesEpic,
      )(action$, state$, dependencies);
    }),
  );

const cmsLoadGamesByLabelAndGameIdsEpic: TPlatformEpic = combineEpics(
  cmsGamesByLabelAndGameIdsEpic,
  (action$, state$, dependencies) => state$.pipe(
    map(withParams(callManagerWasSucceededSelector, CMS_BLOCKS_SYMBOL, EPlatformBlockMap.LANDING)),
    distinctUntilChanged(),
    filter(not<boolean>),
    switchMap(() => cmsLoadBlockEpic(EPlatformBlockMap.LANDING)(action$, state$, dependencies)),
  ),
);

export { cmsLoadGamesByLabelAndGameIdsEpic };
