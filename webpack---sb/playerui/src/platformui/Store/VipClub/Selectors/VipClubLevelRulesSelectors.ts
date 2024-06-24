import {
  callManagerFailedSelector,
  callManagerStartedSelector,
  callManagerWasSucceededSelector,
  type TWithCallManagerState,
} from "@sb/call-manager";
import {
  createMemoSelector,
  createOptionalPropertySelector,
  createPropertySelectors,
  createSimpleSelector,
  getNotNil,
  isEmpty,
  isNotEmpty,
  isNotNil,
  isNotVoid,
} from "@sb/utils";
import type { TPlatform_VipClubLevelRule_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type IWithVipClubState } from "../VipClubInitialState";
import { EVipClubLevelRulesState, EVipClubPlayerState } from "../VipClubModels";
import { VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubPlayerStateLevelSelector, vipClubPlayerStateLoadedSelector } from "./VipClubPlayerStateSelectors";
import { vipClubSelectors } from "./VipClubSelectors";

const vipClubPlayerLevelRuleSelector = (state: IWithVipClubState) => {
  const playerLevel = vipClubPlayerStateLevelSelector(state);
  if (!playerLevel) {
    return null;
  }
  const levelRules = vipClubSelectors.levelRules(state);

  return levelRules.find((rule) => rule.levels.from <= playerLevel && playerLevel <= rule.levels.to) ?? null;
};

const vipClubNotNilPlayerLevelRuleSelector = createSimpleSelector(
  [vipClubPlayerLevelRuleSelector],
  (levelRule) => getNotNil(levelRule, ["vipClubNotNilPlayerLevelRuleSelector"], "levelRule"),
);

const vipClubNotNilPlayerLevelRuleSelectors = createPropertySelectors(vipClubNotNilPlayerLevelRuleSelector);

const vipClubPlayerLevelRulePassivePointsSelector = createSimpleSelector(
  [vipClubNotNilPlayerLevelRuleSelector],
  ({ passivationThreshold }) => passivationThreshold?.points || "",
);

const vipClubPlayerIconByLevelSelector = createSimpleSelector(
  [vipClubSelectors.levelRules, (_, level: number) => level],
  (levelRules, level) => {
    const currentLevel = levelRules.find(({ levels: { to, from } }) => from <= level && to >= level);

    return currentLevel?.icon?.pathToFile;
  },
);

const vipClubPlayerNextLevelRuleSelector = (state: IWithVipClubState) => {
  const playerLevel = vipClubPlayerStateLevelSelector(state);
  if (!playerLevel) {
    return null;
  }
  const levelRules = vipClubSelectors.levelRules(state);
  const playerNextLevel = playerLevel + 1;

  return levelRules.find((rule) => rule.levels.from <= playerNextLevel && playerNextLevel <= rule.levels.to);
};

const vipClubNotNilPlayerNextLevelRuleSelector = createSimpleSelector(
  [vipClubPlayerNextLevelRuleSelector],
  (nextLevelRule) => getNotNil(nextLevelRule, ["assertNotNilVipClubPlayerNextLevelRuleSelector"], "nextLevelRule"),
);

const vipClubNotNilPlayerNextLevelRuleSelectors = createPropertySelectors(vipClubNotNilPlayerNextLevelRuleSelector);

const vipClubPlayerLevelRuleRequiredPointsSelector = createOptionalPropertySelector(vipClubPlayerLevelRuleSelector, "requiredPoints");

const vipClubPlayerLevelRuleLifeTimeDepositSelector = createOptionalPropertySelector(vipClubPlayerLevelRuleSelector, "lifeTimeDeposit");

const vipClubPlayerLevelRuleCashbackPerPointsSelector = (state: IWithVipClubState) =>
  vipClubPlayerLevelRuleSelector(state)?.rewards.cashbackPerPoints;

const vipClubLevelRulesWasSucceededSelector = callManagerWasSucceededSelector.with.symbol(VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL);

const vipClubLevelRulesLoadingSelector = callManagerStartedSelector.with.symbol(VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL);

const vipClubPlayerStateTabStateSelector = (state: IWithVipClubState & TWithCallManagerState) => {
  const playerStateLoaded = vipClubPlayerStateLoadedSelector(state);
  const levelRulesLoaded = vipClubLevelRulesWasSucceededSelector(state);

  if (!playerStateLoaded || !levelRulesLoaded) {
    return EVipClubPlayerState.loading;
  }

  const playerState = vipClubSelectors.playerState(state);
  if (!playerState) {
    return EVipClubPlayerState.noPlayer;
  }

  const levelRules = vipClubSelectors.levelRules(state);
  if (!levelRules || isEmpty(levelRules)) {
    return EVipClubPlayerState.noLevelRules;
  }

  const playerLevelRule = vipClubPlayerLevelRuleSelector(state);
  if (!playerLevelRule) {
    return EVipClubPlayerState.noPlayerLevelRule;
  }

  const playerNextLevelRule = vipClubPlayerNextLevelRuleSelector(state);
  if (!playerNextLevelRule) {
    return EVipClubPlayerState.noPlayerNextLevelRule;
  }

  return EVipClubPlayerState.full;
};

const vipClubWidgetVisibleSelector = createSimpleSelector(
  [vipClubPlayerStateTabStateSelector],
  (state) => state === EVipClubPlayerState.full || state == EVipClubPlayerState.noPlayerNextLevelRule,
);

const vipClubPlayerNextLevelExistSelector = createSimpleSelector([vipClubPlayerNextLevelRuleSelector], isNotNil);

const vipClubPlayerLevelExtraMediasSelector = createSimpleSelector(
  [vipClubPlayerLevelRuleSelector],
  (playerLevelRule) => isNotVoid(playerLevelRule?.extraMedias) ? playerLevelRule.extraMedias : null,
);

const vipClubLevelRulesListWithExtraMediasSelector = createMemoSelector(
  [vipClubSelectors.levelRules],
  (levelRules) => levelRules.reduce<TPlatform_VipClubLevelRule_Fragment[]>(
    (acc, levelRule) => {
      if (isNotEmpty(levelRule.extraMedias)) {
        acc.push(levelRule);
      }

      return acc;
    },
    [],
  ),
);

const vipClubLevelRulesStateSelector = (state: TPlatformAppState) => {
  const isLoading = vipClubLevelRulesLoadingSelector(state);
  if (isLoading) {
    return EVipClubLevelRulesState.loading;
  }

  const failed = callManagerFailedSelector(state, VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL);
  if (failed) {
    return EVipClubLevelRulesState.failed;
  }

  const levelRules = vipClubSelectors.levelRules(state);
  if (isEmpty(levelRules)) {
    return EVipClubLevelRulesState.empty;
  }

  return EVipClubLevelRulesState.full;
};

export {
  vipClubPlayerLevelRuleCashbackPerPointsSelector,
  vipClubPlayerIconByLevelSelector,
  vipClubPlayerLevelRuleLifeTimeDepositSelector,
  vipClubPlayerLevelRuleRequiredPointsSelector,
  vipClubPlayerLevelRuleSelector,
  vipClubWidgetVisibleSelector,
  vipClubPlayerStateTabStateSelector,
  vipClubNotNilPlayerLevelRuleSelector,
  vipClubPlayerNextLevelExistSelector,
  vipClubNotNilPlayerNextLevelRuleSelector,
  vipClubLevelRulesWasSucceededSelector,
  vipClubPlayerLevelRulePassivePointsSelector,
  vipClubPlayerLevelExtraMediasSelector,
  vipClubLevelRulesListWithExtraMediasSelector,
  vipClubNotNilPlayerLevelRuleSelectors,
  vipClubNotNilPlayerNextLevelRuleSelectors,
  vipClubLevelRulesStateSelector,
  vipClubLevelRulesLoadingSelector,
};
