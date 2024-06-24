import { of } from "rxjs";
import { type Epic } from "redux-observable";
import { createCallManagerSymbol } from "@sb/call-manager";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { playerGroupIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { whenPlayerGroupIdChangedEpic } from "../../../../common/Store/Player/Epics/WhenPlayerGroupIdChangedEpic";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import { resyncResourceFactory } from "../../../../common/Utils/EpicUtils/ResyncResourceFactory";
import { rpcLoadingFactory } from "../../../../common/Utils/EpicUtils/RpcLoadingFactory";
import { type IDepsWithHttpApi, type TEpicWithHttpApi } from "../../../../common/Store/Root/Epics/TEpicWithHttpApi";
import { oddsBoostFetchedAction, playerActivatedBoostsFetchedAction } from "../OddsBoostActions";
import { type TActiveBoostsForPlayerPayload, type TBoostsForGroupPayload } from "../Model/OddsBoost";

const ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL = createCallManagerSymbol("ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL");
const BOOSTS_FOR_GROUP_LOADING_SYMBOL = createCallManagerSymbol("BOOSTS_FOR_GROUP_LOADING_SYMBOL");

const storeActiveBoostsForPlayerPayloadEpic = (payload: TActiveBoostsForPlayerPayload): Epic => () => (
  of(playerActivatedBoostsFetchedAction(payload))
);

const storeBoostsForGroupPayloadEpic = (payload: TBoostsForGroupPayload): Epic => () => of(oddsBoostFetchedAction(payload));

const loadActiveBoostsForPlayerEpic = (playerId: string) => rpcLoadingFactory({
  callSymbol: ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL,
  method: (dependencies: IDepsWithHttpApi) => (
    dependencies.sportsbookHttpApi.callGetActiveBoostsForPlayer
  ),
  payload: playerId,
  onLoad: storeActiveBoostsForPlayerPayloadEpic,
});

const loadBoostsForGroupEpic = (groupId: string) => rpcLoadingFactory({
  callSymbol: BOOSTS_FOR_GROUP_LOADING_SYMBOL,
  method: (dependencies: IDepsWithHttpApi) => (
    dependencies.sportsbookHttpApi.callGetBoostsForGroup
  ),
  payload: groupId,
  onLoad: storeBoostsForGroupPayloadEpic,
});

const activeBoostsForPlayerResyncEpic: TEpicWithHttpApi<IWithPlayerState> = (action$, state$, dependencies) => {
  const playerId = playerIdNotNilSelector(state$.value);

  return resyncResourceFactory({
    loadEpic: loadActiveBoostsForPlayerEpic(playerId),
    loadSymbol: ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL,
    subscriptions: [{
      uri: `sumstats.odds_boost.count_active.${playerId}`,
      onUpdate: storeActiveBoostsForPlayerPayloadEpic,
    }],
  })(action$, state$, dependencies);
};

const boostsForGroupResyncEpic: TEpicWithHttpApi<IWithPlayerState> = (action$, state$, dependencies) => {
  const groupId = playerGroupIdNotNilSelector(state$.value);

  return resyncResourceFactory({
    loadEpic: loadBoostsForGroupEpic(groupId),
    loadSymbol: BOOSTS_FOR_GROUP_LOADING_SYMBOL,
    subscriptions: [{
      uri: `sumstats.odds_boost.updated.${groupId}`,
      onUpdate: storeBoostsForGroupPayloadEpic,
    }],
  })(action$, state$, dependencies);
};

const oddsBoostConnectedEpic = whenPlayerIdExist(
  activeBoostsForPlayerResyncEpic,
  whenPlayerGroupIdChangedEpic(boostsForGroupResyncEpic),
);

export { oddsBoostConnectedEpic, ACTIVE_BOOSTS_FOR_PLAYER_LOADING_SYMBOL, BOOSTS_FOR_GROUP_LOADING_SYMBOL };
