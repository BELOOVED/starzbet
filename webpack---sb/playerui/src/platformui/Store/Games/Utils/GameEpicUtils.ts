import {
  EOrderDirection,
  EPlatform_Device,
  EPlatform_GameGridType,
  EPlatform_GameOrderByPaths,
  EPlatform_GameWhereFieldPaths,
  EWhere_Predicate,
  type TPlatform_GameWhereInput,
} from "@sb/graphql-client";
import { isNotNil } from "@sb/utils";
import type { TPlatform_Games_QueryVariables } from "@sb/graphql-client/PlayerUI";
import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { type TGameProviderEnum } from "../../../../common/Store/Provider/ProviderModel";
import { systemLabels } from "../Model/Games";
import { gameByIdSelector, gamesFavouritesSelector } from "../Selectors/GamesSelectors";

const getCommonPredicates = (): TPlatform_GameWhereInput[] => [
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
    fieldPath: EPlatform_GameWhereFieldPaths.gameDevices,
    predicate: EWhere_Predicate.eq,
    value: IS_MOBILE_CLIENT_SIDE ? EPlatform_Device.mobile : EPlatform_Device.desktop,
  },
];

const getCommonPredicatesForGamePage = (gamePage: EGamePage): TPlatform_GameWhereInput[] => [
  ...getCommonPredicates(),
  {
    fieldPath: EPlatform_GameWhereFieldPaths.gamePage,
    predicate: EWhere_Predicate.eq,
    value: gamePage,
  },
];

const getPredicatesForGameLabel = (id: string, gamePage: EGamePage): TPlatform_GameWhereInput[] => [
  ...getCommonPredicatesForGamePage(gamePage),
  {
    fieldPath: EPlatform_GameWhereFieldPaths.gameSelectedLabelId,
    predicate: EWhere_Predicate.eq,
    value: id,
  },
];

const getPredicatesForFavGames = (favIds: string[], gamePage: EGamePage): TPlatform_GameWhereInput[] => [
  ...getCommonPredicatesForGamePage(gamePage),
  {
    fieldPath: EPlatform_GameWhereFieldPaths.gameId,
    predicate: EWhere_Predicate.in,
    value: JSON.stringify(favIds),
  },
];

const getPredicatesForProviderGames = (
  provider: TGameProviderEnum | EProviderCode,
  gamePage: EGamePage,
): TPlatform_GameWhereInput[] => [
  ...getCommonPredicatesForGamePage(gamePage),
  {
    fieldPath: EPlatform_GameWhereFieldPaths.gameProvider,
    predicate: EWhere_Predicate.eq,
    value: provider,
  },
];

const getPredicatesForCombineProvidersGames = (
  providers: (TGameProviderEnum | EProviderCode)[],
  gamePage: EGamePage,
): TPlatform_GameWhereInput[] => [
  ...getCommonPredicatesForGamePage(gamePage),
  {
    fieldPath: EPlatform_GameWhereFieldPaths.gameProvider,
    predicate: EWhere_Predicate.in,
    value: JSON.stringify(providers),
  },
];

const orderByPathForCustomLabelByGridSizeMap: Record<EPlatform_GameGridType, EPlatform_GameOrderByPaths> = {
  [EPlatform_GameGridType.size2]: EPlatform_GameOrderByPaths.gameLabelGridSize2Position,
  [EPlatform_GameGridType.size3]: EPlatform_GameOrderByPaths.gameLabelGridSize3Position,
  [EPlatform_GameGridType.size4]: EPlatform_GameOrderByPaths.gameLabelGridSize4Position,
  [EPlatform_GameGridType.size6]: EPlatform_GameOrderByPaths.gameLabelGridSize6Position,
  [EPlatform_GameGridType.size8]: EPlatform_GameOrderByPaths.gameLabelGridSize8Position,
};

const orderByPathForAllLabelByGridSizeMap: Record<EPlatform_GameGridType, EPlatform_GameOrderByPaths> = {
  [EPlatform_GameGridType.size2]: EPlatform_GameOrderByPaths.gameAllLabelGridSize2Position,
  [EPlatform_GameGridType.size3]: EPlatform_GameOrderByPaths.gameAllLabelGridSize3Position,
  [EPlatform_GameGridType.size4]: EPlatform_GameOrderByPaths.gameAllLabelGridSize4Position,
  [EPlatform_GameGridType.size6]: EPlatform_GameOrderByPaths.gameAllLabelGridSize6Position,
  [EPlatform_GameGridType.size8]: EPlatform_GameOrderByPaths.gameAllLabelGridSize8Position,
};

const ORDER_BY_PATH_FOR_PROVIDER_BY_GRID_SIZE_MAP: Record<EPlatform_GameGridType, EPlatform_GameOrderByPaths> = {
  [EPlatform_GameGridType.size2]: EPlatform_GameOrderByPaths.gameProviderGridSize2Position,
  [EPlatform_GameGridType.size3]: EPlatform_GameOrderByPaths.gameProviderGridSize3Position,
  [EPlatform_GameGridType.size4]: EPlatform_GameOrderByPaths.gameProviderGridSize4Position,
  [EPlatform_GameGridType.size6]: EPlatform_GameOrderByPaths.gameProviderGridSize6Position,
  [EPlatform_GameGridType.size8]: EPlatform_GameOrderByPaths.gameProviderGridSize8Position,
};

const getVariablesSelectorForLabelGames = (
  gamePage: EGamePage,
  labelId: string,
  gamesCountToFetch: number,
  gridType: EPlatform_GameGridType,
  after?: string,
) => (state: TMixAppState): TPlatform_Games_QueryVariables => {
  switch (labelId) {
    case systemLabels.favourite: {
      const favIds = gamesFavouritesSelector(state, gamePage);

      const notFetchedGameIds = favIds.reduce<string[]>(
        (acc, id) => {
          const isGameFetched = isNotNil(gameByIdSelector(state, id));

          if (isGameFetched) {
            return acc;
          }

          return acc.concat(id);
        },
        [],
      );

      return {
        cursor: { first: -1 },
        where: { predicate: EWhere_Predicate.and, operands: getPredicatesForFavGames(notFetchedGameIds, gamePage) },
      };
    }
    case systemLabels.all: {
      return {
        cursor: {
          first: gamesCountToFetch,
          after,
        },
        where: { predicate: EWhere_Predicate.and, operands: getCommonPredicatesForGamePage(gamePage) },
        orderBy: [
          { fieldPath: orderByPathForAllLabelByGridSizeMap[gridType], direction: EOrderDirection.asc },
        ],
        parameters: [{ parameter: "label", value: systemLabels.all }],
      };
    }
    case systemLabels.popular: {
      return {
        cursor: {
          first: gamesCountToFetch,
          after,
        },
        where: { predicate: EWhere_Predicate.and, operands: getCommonPredicatesForGamePage(gamePage) },
        orderBy: [
          { fieldPath: EPlatform_GameOrderByPaths.gameClickCount, direction: EOrderDirection.desc },
        ],
      };
    }
    default: {
      return {
        cursor: {
          first: gamesCountToFetch,
          after,
        },
        where: { predicate: EWhere_Predicate.and, operands: getPredicatesForGameLabel(labelId, gamePage) },
        orderBy: [
          { fieldPath: orderByPathForCustomLabelByGridSizeMap[gridType], direction: EOrderDirection.asc },
        ],
        parameters: [{ parameter: "label", value: labelId }],
      };
    }
  }
};

const getVariablesForProviderGames = (
  gamesCountToFetch: number,
  provider: TGameProviderEnum | EProviderCode,
  gamePage: EGamePage,
  gridType: EPlatform_GameGridType,
) => (
  {
    cursor: { first: gamesCountToFetch },
    where: { predicate: EWhere_Predicate.and, operands: getPredicatesForProviderGames(provider, gamePage) },
    orderBy: [
      { fieldPath: ORDER_BY_PATH_FOR_PROVIDER_BY_GRID_SIZE_MAP[gridType], direction: EOrderDirection.asc },
    ],
  }
);

export {
  getCommonPredicatesForGamePage,
  getVariablesSelectorForLabelGames,
  getPredicatesForProviderGames,
  getPredicatesForCombineProvidersGames,
  getVariablesForProviderGames,
};
