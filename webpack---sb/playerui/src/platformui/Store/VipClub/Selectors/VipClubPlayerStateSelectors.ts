import { createOptionalPropertySelector, createSimpleSelector, getNotNil, Money } from "@sb/utils";
import { callManagerWasSucceededSelector } from "@sb/call-manager";
import type { TPlatform_VipClubLevelRange_Fragment } from "@sb/graphql-client/PlayerUI";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type IWithVipClubState } from "../VipClubInitialState";
import { EVipClubLevelRuleState } from "../VipClubModels";
import { VIP_CLUB_PLAYER_STATE_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubSelectors } from "./VipClubSelectors";

const vipClubPlayerStateLoadedSelector = callManagerWasSucceededSelector.with.symbol(VIP_CLUB_PLAYER_STATE_LOADING_SYMBOL);

const vipClubPlayerStateAvailablePointsForCashBackSelector =
  createOptionalPropertySelector(vipClubSelectors.playerState, "availablePointsForCashBack");

const vipClubPlayerStateLevelSelector = createOptionalPropertySelector(vipClubSelectors.playerState, "level");

const vipClubNotNilPlayerStateLevelSelector = createSimpleSelector(
  [vipClubPlayerStateLevelSelector],
  (playerLevel) => getNotNil(playerLevel, ["vipClubNotNilPlayerStateLevelSelector"], "playerLevel"),
);

const vipClubNotNilPlayerStateNextLevelSelector = createSimpleSelector(
  [vipClubNotNilPlayerStateLevelSelector],
  (playerLevel) => playerLevel + 1,
);

const vipClubPlayerStatePointsFromLastLevelUpSelector = createOptionalPropertySelector(vipClubSelectors.playerState, "pointsFromLastLevelUp");

const vipClubPlayerStateLifeTimeDepositSelector = createOptionalPropertySelector(vipClubSelectors.playerState, "lifetimeDeposit");

const vipClubPlayerStateLifeTimeDepositOrZeroSelector = (state: IWithVipClubState & TPlatformAppState) => {
  const lifetimeDeposit = vipClubPlayerStateLifeTimeDepositSelector(state);

  return lifetimeDeposit ?? Money.getZero(playerCurrencySelector(state));
};

const vipClubLevelRuleStateByPlayerLevelSelector = (state: IWithVipClubState, levelRange: TPlatform_VipClubLevelRange_Fragment) => {
  const playerLevel = vipClubPlayerStateLevelSelector(state);

  if (!playerLevel) {
    return EVipClubLevelRuleState.notDefined;
  } else if (playerLevel > levelRange.to) {
    return EVipClubLevelRuleState.completed;
  } else if (playerLevel < levelRange.from) {
    return EVipClubLevelRuleState.notCompleted;
  }

  return EVipClubLevelRuleState.current;
};

export {
  vipClubPlayerStateAvailablePointsForCashBackSelector,
  vipClubPlayerStateLoadedSelector,
  vipClubPlayerStateLevelSelector,
  vipClubPlayerStateLifeTimeDepositOrZeroSelector,
  vipClubPlayerStatePointsFromLastLevelUpSelector,
  vipClubLevelRuleStateByPlayerLevelSelector,
  vipClubNotNilPlayerStateLevelSelector,
  vipClubNotNilPlayerStateNextLevelSelector,
};
