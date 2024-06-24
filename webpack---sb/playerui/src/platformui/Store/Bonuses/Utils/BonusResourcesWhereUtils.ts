import {
  EBonusProductEnum,
  EPlatform_PlayerBonusPhaseEnum,
  EPlatform_PlayerBonusResourceWhereFieldPaths,
  EWhere_Predicate,
  type TPlatform_PlayerBonusResourceWhereInput,
} from "@sb/graphql-client";

const supportedProducts = [
  EBonusProductEnum.sports,
  EBonusProductEnum.casino,
  EBonusProductEnum.liveCasino,
  EBonusProductEnum.games,
];

const supportedProductsWhere: TPlatform_PlayerBonusResourceWhereInput = {
  predicate: EWhere_Predicate.in,
  fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourceProduct,
  value: JSON.stringify(supportedProducts),
};

const getPlayerBonusIdWhere = (playerBonusId: string): TPlatform_PlayerBonusResourceWhereInput => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourcePlayerBonusId,
  value: playerBonusId,
});

const getHeldAtPhaseWhere = (heldAtPhase: EPlatform_PlayerBonusPhaseEnum): TPlatform_PlayerBonusResourceWhereInput => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourceHeldAtPhase,
  value: heldAtPhase,
});

const getProductWhere = (product: EBonusProductEnum): TPlatform_PlayerBonusResourceWhereInput => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourceProduct,
  value: product,
});

const withCurrentWageringWhere: TPlatform_PlayerBonusResourceWhereInput = {
  predicate: EWhere_Predicate.isNotNull,
  fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourceCurrentWagering,
};

const finishedWhere: TPlatform_PlayerBonusResourceWhereInput = {
  predicate: EWhere_Predicate.isTrue,
  fieldPath: EPlatform_PlayerBonusResourceWhereFieldPaths.playerBonusResourceIsFinished,
};

const getPlayerBonusResourcesWhere = (
  playerBonusId: string,
  /**
   * make not optional when deprecated will be removed
   */
  phase?: EPlatform_PlayerBonusPhaseEnum,
  product?: EBonusProductEnum,
): TPlatform_PlayerBonusResourceWhereInput => {
  const where = {
    predicate: EWhere_Predicate.and,
    operands: [
      getPlayerBonusIdWhere(playerBonusId),
      supportedProductsWhere,
      finishedWhere,
    ],
  } satisfies TPlatform_PlayerBonusResourceWhereInput;

  if (!phase) {
    return where;
  }

  switch (phase) {
    case EPlatform_PlayerBonusPhaseEnum.wager: {
      where.operands.push(getHeldAtPhaseWhere(EPlatform_PlayerBonusPhaseEnum.wager));
      where.operands.push(withCurrentWageringWhere);
      break;
    }
    case EPlatform_PlayerBonusPhaseEnum.internalFreeBet: {
      where.operands.push(getHeldAtPhaseWhere(EPlatform_PlayerBonusPhaseEnum.internalFreeBet));
      break;
    }
    case EPlatform_PlayerBonusPhaseEnum.externalFreeBet: {
      where.operands.push(getHeldAtPhaseWhere(EPlatform_PlayerBonusPhaseEnum.externalFreeBet));
      /**
       * make getNotNil(product) when deprecated will be removed
       */
      if (product) {
        where.operands.push(getProductWhere(product));
      }
      break;
    }
  }

  return where;
};

export { getPlayerBonusResourcesWhere };
