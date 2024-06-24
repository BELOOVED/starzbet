import {
  EOrderDirection,
  EPlatform_PlayerBonusOrderByPaths,
  EPlatform_PlayerBonusStatusEnum,
  EPlatform_PlayerBonusWhereFieldPaths,
  EWhere_Predicate,
  type TPlatform_PlayerBonusOrderBy,
  type TPlatform_PlayerBonusWhereInput,
  type TQueryArg,
} from "@sb/graphql-client";
import { getNotNil, isNil, type TExplicitAny, Time, withParams } from "@sb/utils";
import {
  platformPlayerBonusesQueryOptionalFields,
  query_Platform_PlayerBonuses,
  type TPlatform_PlayerBonus_Fragment,
  type TPlatform_PlayerBonuses_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import { type TCallManagerSymbol, type TCallManagerSymbolPair } from "@sb/call-manager";
import { playerDetailsSelectors } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TAppEpicWithBonuses, type TAppStateWithBonuses } from "../../../../../common/Store/Root/Epics/TAppEpic";
import { gqlLoadingFactory } from "../../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlNodeSelector } from "../../../Root/Selectors/GraphQlSelectors";
import { activePlayerBonusStatuses, finishedPlayerBonusStatuses } from "../../Model/PlayerBonusStatusList";

const getPlayerBonusPlayerIdOperand = (playerId: string): TPlatform_PlayerBonusWhereInput => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: EPlatform_PlayerBonusWhereFieldPaths.playerBonusPlayerId,
  value: playerId,
});

const getPlayerBonusIdOperand = (playerBonusId: string): TPlatform_PlayerBonusWhereInput => ({
  value: playerBonusId,
  fieldPath: EPlatform_PlayerBonusWhereFieldPaths.playerBonusPlayerBonusId,
  predicate: EWhere_Predicate.eq,
});

const inProgressPlayerBonusesOperand: TPlatform_PlayerBonusWhereInput = {
  fieldPath: EPlatform_PlayerBonusWhereFieldPaths.playerBonusStatus,
  predicate: EWhere_Predicate.eq,
  value: EPlatform_PlayerBonusStatusEnum.inProgress,
};

const activePlayerBonusesStatusOperand: TPlatform_PlayerBonusWhereInput = {
  fieldPath: EPlatform_PlayerBonusWhereFieldPaths.playerBonusStatus,
  predicate: EWhere_Predicate.in,
  value: JSON.stringify(activePlayerBonusStatuses),
};

const finishedPlayerBonusesStatusOperand: TPlatform_PlayerBonusWhereInput = {
  fieldPath: EPlatform_PlayerBonusWhereFieldPaths.playerBonusStatus,
  predicate: EWhere_Predicate.in,
  value: JSON.stringify(finishedPlayerBonusStatuses),
};

const getPlayerBonusFinishedAtOperand = (): TPlatform_PlayerBonusWhereInput => ({
  fieldPath: EPlatform_PlayerBonusWhereFieldPaths.playerBonusFinishedAt,
  predicate: EWhere_Predicate.gte,
  value: Time.addMonths(Date.now(), -1).toString(),
});

const historyBonusOrderBy: TPlatform_PlayerBonusOrderBy = {
  fieldPath: EPlatform_PlayerBonusOrderByPaths.playerBonusFinishedAt,
  direction: EOrderDirection.desc,
};

const loadPlayerBonusesVariablesSelector = (
  state: TAppStateWithBonuses,
  additionalOperands: TPlatform_PlayerBonusWhereInput[],
  additionalVariables: TPlatform_PlayerBonuses_QueryVariables,
): TQueryArg<typeof query_Platform_PlayerBonuses, false> => {
  const playerId = playerDetailsSelectors.id(state);

  if (isNil(playerId)) {
    throw new Error("[loadActivePlayerBonusesVariablesSelector] playerId should be stored before 'loadPlayerBonusesEpicFactory' will be called");
  }

  return {
    optionalFields: platformPlayerBonusesQueryOptionalFields,
    variables: {
      cursor: { first: -1 },
      where: {
        predicate: EWhere_Predicate.and,
        operands: [getPlayerBonusPlayerIdOperand(playerId), ...additionalOperands],
      },
      ...additionalVariables,
    },
  };
};

const loadPlayerBonusVariablesSelector = (
  state: TAppStateWithBonuses,
  additionalOperands: TPlatform_PlayerBonusWhereInput[],
  playerBonusId: string,
): TQueryArg<typeof query_Platform_PlayerBonuses, false> => {
  const playerId = playerDetailsSelectors.id(state);

  if (isNil(playerId)) {
    throw new Error("[loadPlayerBonusVariablesSelector] playerId should be stored before 'loadPlayerBonusEpicFactory' will be called");
  }

  return {
    optionalFields: platformPlayerBonusesQueryOptionalFields,
    variables: {
      cursor: { first: 1 },
      where: {
        predicate: EWhere_Predicate.and,
        operands: [
          getPlayerBonusPlayerIdOperand(playerId),
          getPlayerBonusIdOperand(playerBonusId),
          ...additionalOperands,
        ],
      },
    },
  };
};

/**
 * should be called after 'player.details' will be loaded
 */
const loadPlayerBonusesEpicFactory = (
  callSymbol: TCallManagerSymbol,
  succeedActionCreator: (playerBonuses: TPlatform_PlayerBonus_Fragment[]) => TExplicitAny,
  additionalOperands: TPlatform_PlayerBonusWhereInput[] = [],
  additionalVariables: TPlatform_PlayerBonuses_QueryVariables = {},
): TAppEpicWithBonuses => gqlLoadingFactory(
  callSymbol,
  query_Platform_PlayerBonuses,
  withParams(loadPlayerBonusesVariablesSelector, additionalOperands, additionalVariables),
  succeedActionCreator,
  (response) => [graphQlNodeSelector(response.platform.PlayerBonuses)],
  undefined,
  undefined,
  true,
);

/**
 * should be called after 'player.details' will be loaded
 */
const loadPlayerBonusEpicFactory = (
  playerBonusId: string,
  callSymbol: TCallManagerSymbolPair,
  succeedActionCreator: (playerBonus: TPlatform_PlayerBonus_Fragment) => TExplicitAny,
  additionalOperands: TPlatform_PlayerBonusWhereInput[] = [],
): TAppEpicWithBonuses => gqlLoadingFactory(
  callSymbol,
  query_Platform_PlayerBonuses,
  withParams(loadPlayerBonusVariablesSelector, additionalOperands, playerBonusId),
  succeedActionCreator,
  (response) => [
    getNotNil(graphQlNodeSelector(response.platform.PlayerBonuses)[0], ["loadPlayerBonusEpicFactory"], "playerBonus"),
  ],
  undefined,
  undefined,
  true,
);

export {
  inProgressPlayerBonusesOperand,
  activePlayerBonusesStatusOperand,
  finishedPlayerBonusesStatusOperand,
  getPlayerBonusFinishedAtOperand,
  historyBonusOrderBy,
  loadPlayerBonusesEpicFactory,
  loadPlayerBonusEpicFactory,
};
