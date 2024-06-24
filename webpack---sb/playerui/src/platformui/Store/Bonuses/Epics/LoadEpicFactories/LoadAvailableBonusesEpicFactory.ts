import { type TQueryArg } from "@sb/graphql-client";
import type { TCallManagerSymbol, TCallManagerSymbolPair } from "@sb/call-manager";
import {
  platformAvailableBonusDetailsQueryOptionalFields,
  platformAvailableBonusesForPlayerQueryOptionalFieldsNoRef,
  query_Platform_AvailableBonusDetails,
  query_Platform_AvailableBonusesForPlayer,
} from "@sb/graphql-client/PlayerUI";
import { isNil } from "@sb/utils";
import { playerDetailsSelectors } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import type { TAppEpicWithBonuses, TAppStateWithBonuses } from "../../../../../common/Store/Root/Epics/TAppEpic";
import { gqlLoadingFactory } from "../../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { availableBonusesFetchedAction, availableBonusFetchedAction } from "../../BonusesActions";

const loadAvailableBonusesVariablesSelector = (
  state: TAppStateWithBonuses,
): TQueryArg<typeof query_Platform_AvailableBonusesForPlayer, false> => {
  const playerId = playerDetailsSelectors.id(state);

  if (isNil(playerId)) {
    throw new Error("[loadAvailableBonusesVariablesSelector] playerId should be stored before 'loadAvailableBonusesEpicFactory' will be called");
  }

  return {
    optionalFields: platformAvailableBonusesForPlayerQueryOptionalFieldsNoRef,
    variables: { playerId },
  };
};

const loadAvailableBonusesEpicFactory = (
  callSymbol: TCallManagerSymbol,
): TAppEpicWithBonuses => gqlLoadingFactory(
  callSymbol,
  query_Platform_AvailableBonusesForPlayer,
  loadAvailableBonusesVariablesSelector,
  availableBonusesFetchedAction,
  (response) => [response.platform.AvailableBonusesForPlayer],
  undefined,
  undefined,
  true,
);

const loadAvailableBonusEpicFactory = (
  bonusId: string,
  callSymbol: TCallManagerSymbolPair,
  ignoreNullResponseError: boolean,
): TAppEpicWithBonuses => gqlLoadingFactory(
  callSymbol,
  query_Platform_AvailableBonusDetails,
  {
    optionalFields: platformAvailableBonusDetailsQueryOptionalFields,
    variables: { bonusId },
  },
  availableBonusFetchedAction,
  (response) => {
    const bonus = response.platform.AvailableBonusDetails;

    return bonus ? [bonus] : [bonusId, ignoreNullResponseError];
  },
  undefined,
  undefined,
  true,
);

export {
  loadAvailableBonusesEpicFactory,
  loadAvailableBonusEpicFactory,
};
