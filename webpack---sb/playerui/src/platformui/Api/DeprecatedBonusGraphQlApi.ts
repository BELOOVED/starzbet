import {
  platformPlayerBonusResourcesDeprecatedQueryOptionalFields,
  platformPlayerBonusResourcesWithCursorQueryOptionalFields,
  playerBonusResourcesWithoutTransactionRequestQueryOptionalFields,
  query_Platform_PlayerBonusResourcesDeprecated,
  query_Platform_PlayerBonusResourcesWithCursor,
} from "@sb/graphql-client/PlayerUI";
import {
  type Client,
  type EBonusProductEnum,
  EOrderDirection,
  type EPlatform_PlayerBonusPhaseEnum,
  EPlatform_PlayerBonusResourceOrderByPaths,
  EPlatform_PlayerBonusResourceWhereFieldPaths,
  EPlatform_PlayerTransactionWhereFieldPaths,
  EPlatform_WalletType,
  EWhere_Predicate,
  type TCursor,
  type TPlatform_PlayerBonusResourceOrderBy,
  type TPlatform_PlayerTransactionWhereInput,
} from "@sb/graphql-client";
import { deferWithAbort } from "@sb/utils";
import { getPlayerBonusResourcesWhere } from "../Store/Bonuses/Utils/BonusResourcesWhereUtils";

interface IPaginator {
  cursor: TCursor;
}

const bonusResourcesOrderBy: TPlatform_PlayerBonusResourceOrderBy[] = [{
  fieldPath: EPlatform_PlayerBonusResourceOrderByPaths.playerBonusResourceCreatedAt,
  direction: EOrderDirection.desc,
}];

const bonusResourcesTransactionsWhere: TPlatform_PlayerTransactionWhereInput = {
  predicate: EWhere_Predicate.in,
  fieldPath: EPlatform_PlayerTransactionWhereFieldPaths.playerTransactionWalletType,
  value: JSON.stringify([
    EPlatform_WalletType.player,
    EPlatform_WalletType.playerBonus,
    EPlatform_WalletType.freeBet,
    EPlatform_WalletType.externalPlayer,
    EPlatform_WalletType.externalPlayerBonus,
    EPlatform_WalletType.externalFreeBet,
  ]),
};

/**
 * @deprecated
 * use gqlLoadingFactory
 */
const deprecatedBonusGraphQlApi = (graphQLClient: Client) => ({
  /**
   * @deprecated
   * use LoadPlayerBonusesEpicFactory
   */
  loadPlayerBonusResourcesDeprecated: (playerBonusId: string) => deferWithAbort((signal) =>
    query_Platform_PlayerBonusResourcesDeprecated(
      graphQLClient,
      {
        optionalFields: platformPlayerBonusResourcesDeprecatedQueryOptionalFields,
        variables: {
          cursor: { first: -1 },
          orderBy: bonusResourcesOrderBy,
          where: {
            predicate: EWhere_Predicate.eq,
            fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourcePlayerBonusId,
            value: playerBonusId,
          },
          transactionsWhere: bonusResourcesTransactionsWhere,
        },
        signal,
      },
    )
      .then(({ platform: { PlayerBonusResourcesWithCursor } }) => PlayerBonusResourcesWithCursor)),

  /**
   * @deprecated
   * use LoadPlayerBonusesEpicFactory
   */
  loadPlayerBonusResources: (
    playerBonusId: string,
    paginatorProps: IPaginator,
    type?: EPlatform_PlayerBonusPhaseEnum,
    product?: EBonusProductEnum,
  ) =>
    deferWithAbort((signal) =>
      query_Platform_PlayerBonusResourcesWithCursor(
        graphQLClient,
        {
          optionalFields: playerBonusResourcesWithoutTransactionRequestQueryOptionalFields,
          variables: {
            ...paginatorProps,
            orderBy: bonusResourcesOrderBy,
            where: getPlayerBonusResourcesWhere(playerBonusId, type, product),
          },
          signal,
        },
      )
        .then(({ platform: { PlayerBonusResourcesWithCursor } }) => PlayerBonusResourcesWithCursor)),

  /**
   * @deprecated
   * use LoadPlayerBonusesEpicFactory
   */
  loadPlayerBonusResourceById: (
    bonusResourceId: string,
  ) =>
    deferWithAbort((signal) =>
      query_Platform_PlayerBonusResourcesWithCursor(
        graphQLClient,
        {
          optionalFields: platformPlayerBonusResourcesWithCursorQueryOptionalFields,
          variables: {
            cursor: { first: 1 },
            where: {
              predicate: EWhere_Predicate.eq,
              fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourceResourceId,
              value: bonusResourceId,
            },
          },
          signal,
        },
      )
        .then(({ platform: { PlayerBonusResourcesWithCursor } }) => PlayerBonusResourcesWithCursor)),
});

export type { IPaginator };

export { deprecatedBonusGraphQlApi };
