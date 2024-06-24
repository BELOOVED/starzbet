import { type EGamePage } from "@sb/betting-core/EGamePage";
import {
  platformGamesQueryOptionalFields,
  platformGamesWithActiveFreeSpinsQueryOptionalFields,
  platformRecentlyPlayedGamesQueryOptionsFields,
  query_Platform_Games,
  query_Platform_GamesWithActiveFreeSpins,
  query_Platform_RecentlyPlayedGames,
  type TPlatform_Games_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import { extractNodesFromEdges } from "@sb/utils";
import { type EProductCode } from "@sb/betting-core/EProductCode";
import { type TGameProviderEnum } from "../../../../common/Store/Provider/ProviderModel";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import {
  GAME_MANAGER_LABEL_GAMES_ADDITIONAL_LOADING_SYMBOL,
  GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_PROVIDER_GAMES_ADDITIONAL_LOADING_SYMBOL,
  GAME_MANAGER_PROVIDER_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_RECENTLY_PLAYED_GAMES_LOADING_SYMBOL,
} from "../Variables";
import { concatIdForLoadingSymbol } from "../GamesUtils";
import {
  gamesForCombineProvidersAdditionalReceivedAction,
  gamesForCombineProvidersReceivedAction,
  gamesForFavLabelReceivedAction,
  gamesForFreeBetLabelReceivedAction,
  gamesForLabelAdditionalReceivedAction,
  gamesForLabelReceivedAction,
  gamesForProviderAdditionalReceivedAction,
  gamesForProviderReceivedAction,
} from "../Actions/GamesActions";
import { systemLabels } from "../Model/Games";
import { overwriteRecentlyPlayedAction } from "../Actions/GamesRecentlyPlayedActions";

const gamesForFavLabelLoadingFactory = (
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL, concatIdForLoadingSymbol(systemLabels.favourite, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForFavLabelReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), gamePage, visibleRows],
);

/**
 * todo WIP on back
 * provide gamePage in vars and filter by it on backend
 */
const gamesForFreeBetLabelLoadingFactory = (
  gamePage: EGamePage,
  matchedPlayerBonusId: string,
) => gqlLoadingFactory(
  [GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL, concatIdForLoadingSymbol(systemLabels.activeFreeSpins, gamePage)],
  query_Platform_GamesWithActiveFreeSpins,
  { optionalFields: platformGamesWithActiveFreeSpinsQueryOptionalFields, variables: {} },
  gamesForFreeBetLabelReceivedAction,
  ({ platform: { GamesWithActiveFreeSpins } }) => [GamesWithActiveFreeSpins, gamePage, matchedPlayerBonusId],
);

const gamesForLabelLoadingFactory = (
  labelId: string,
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL, concatIdForLoadingSymbol(labelId, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForLabelReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage, labelId, visibleRows],
);

const gamesForLabelAdditionalLoadingFactory = (
  labelId: string,
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_LABEL_GAMES_ADDITIONAL_LOADING_SYMBOL, concatIdForLoadingSymbol(labelId, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForLabelAdditionalReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage, labelId, visibleRows],
);

const gamesForProviderLoadingFactory = (
  provider: TGameProviderEnum,
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_PROVIDER_GAMES_LOADING_SYMBOL, concatIdForLoadingSymbol(provider, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForProviderReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage, provider, visibleRows],
);

const combineProvidersId = "combineProviders";

const gamesForCombineProvidersLoadingFactory = (
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_PROVIDER_GAMES_LOADING_SYMBOL, concatIdForLoadingSymbol(combineProvidersId, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForCombineProvidersReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage, visibleRows],
);

const gamesForProviderAdditionalLoadingFactory = (
  provider: TGameProviderEnum,
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_PROVIDER_GAMES_ADDITIONAL_LOADING_SYMBOL, concatIdForLoadingSymbol(provider, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForProviderAdditionalReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage, provider, visibleRows],
);

const gamesRecentlyPlayedLoadingFactory = (product: EProductCode) => gqlLoadingFactory(
  GAME_MANAGER_RECENTLY_PLAYED_GAMES_LOADING_SYMBOL,
  query_Platform_RecentlyPlayedGames,
  { optionalFields: platformRecentlyPlayedGamesQueryOptionsFields, variables: { limit: 50, product } },
  overwriteRecentlyPlayedAction,
  ({ platform: { RecentlyPlayedGames } }) => [RecentlyPlayedGames],
);

const gamesForCombineProvidersAdditionalLoadingFactory = (
  gamePage: EGamePage,
  visibleRows: number,
  variables: TPlatform_Games_QueryVariables,
) => gqlLoadingFactory(
  [GAME_MANAGER_PROVIDER_GAMES_ADDITIONAL_LOADING_SYMBOL, concatIdForLoadingSymbol(combineProvidersId, gamePage)],
  query_Platform_Games,
  { optionalFields: platformGamesQueryOptionalFields, variables },
  gamesForCombineProvidersAdditionalReceivedAction,
  ({ platform: { Games } }) => [extractNodesFromEdges(Games), Games.pageInfo, gamePage, visibleRows],
);

export {
  gamesForFavLabelLoadingFactory,
  gamesForFreeBetLabelLoadingFactory,
  gamesForLabelLoadingFactory,
  gamesForLabelAdditionalLoadingFactory,
  gamesForProviderLoadingFactory,
  gamesForProviderAdditionalLoadingFactory,
  //combineProviders
  gamesForCombineProvidersLoadingFactory,
  gamesForCombineProvidersAdditionalLoadingFactory,
  combineProvidersId,
  //recently Played
  gamesRecentlyPlayedLoadingFactory,
};
