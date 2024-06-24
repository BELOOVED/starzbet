import { type Selector } from "react-redux";
import { createOptionalPropertySelector, createSimpleSelector, isNotEmpty } from "@sb/utils";
import type { TPlatform_Bonus_VipClub_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_BonusTypeEnum } from "@sb/graphql-client";
import { callManagerFailedSelector } from "@sb/call-manager";
import {
  isNotNilPlayerProfileSelector,
  profileSelectors,
} from "../../../../common/Store/Player/Selectors/ProfileSelectors";
import { getDateByTimeZone } from "../../../../common/Utils/GetDateByTimeZone";
import { type TPlatformAppState } from "../../PlatformInitialState";
import {
  availableBonusByIdNotNilSelector,
  isAvailableBonusExistSelector,
} from "../../Bonuses/Selectors/BonusesSelectors";
import { availableBonusesLoadingSelector } from "../../Bonuses/Selectors/BonusCallManagerSelectors";
import { AVAILABLE_BONUSES_CALL_SYMBOL } from "../../Bonuses/BonusVariables";
import { type IWithVipClubState } from "../VipClubInitialState";
import { EVipClubBonusCardButtonState, EVipClubBonusesState, EVipClubBonusType } from "../VipClubModels";
import {
  vipClubGetDate,
  vipClubGetMSMonthlyBonusAvailableFor,
  vipClubGetMSUntilEndOfDay,
  vipClubGetMSUntilNextMonday,
  vipClubGetMSUntilNextMonth,
  vipClubGetMSWeeklyBonusAvailableFor,
} from "../Util/VipClubTimeUtils";
import { VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL, VIP_CLUB_SETTINGS_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubLevelRulesLoadingSelector, vipClubPlayerLevelRuleSelector } from "./VipClubLevelRulesSelectors";
import { vipClubSettingsLoadingSelector, vipClubSettingsNotNilSelectors } from "./VipClubSettingsSelectors";

const vipClubPlayerLevelRuleRewardsSelector = createOptionalPropertySelector(vipClubPlayerLevelRuleSelector, "rewards");

const vipClubDailyBonusesSelector = (state: IWithVipClubState) => vipClubPlayerLevelRuleRewardsSelector(state)?.dailyBonuses ?? [];
const vipClubWeeklyBonusesSelector = (state: IWithVipClubState) => vipClubPlayerLevelRuleRewardsSelector(state)?.weeklyBonuses ?? [];
const vipClubMonthlyBonusesSelector = (state: IWithVipClubState) => vipClubPlayerLevelRuleRewardsSelector(state)?.monthlyBonuses ?? [];
const vipClubBirthdayBonusesSelector = (state: TPlatformAppState) => vipClubPlayerLevelRuleRewardsSelector(state)?.birthdayBonuses ?? [];
const vipClubExtraBonusesSelector = (state: IWithVipClubState) => vipClubPlayerLevelRuleRewardsSelector(state)?.extraBonuses ?? [];

const bonusesSelectorByTypeMap: Record<EVipClubBonusType, Selector<TPlatformAppState, TPlatform_Bonus_VipClub_Fragment[]>> = {
  [EVipClubBonusType.daily]: vipClubDailyBonusesSelector,
  [EVipClubBonusType.weekly]: vipClubWeeklyBonusesSelector,
  [EVipClubBonusType.monthly]: vipClubMonthlyBonusesSelector,
  [EVipClubBonusType.birthday]: vipClubBirthdayBonusesSelector,
  [EVipClubBonusType.extra]: vipClubExtraBonusesSelector,
};

const vipClubBonusesByTypeSelector = (state: TPlatformAppState, type: EVipClubBonusType) =>
  bonusesSelectorByTypeMap[type](state).filter(({ id }) => isAvailableBonusExistSelector(state, id));

const vipClubIsNotEmptyBonusesByTypeSelector = createSimpleSelector([vipClubBonusesByTypeSelector], isNotEmpty);

const vipClubHasAnyBonusSelector = createSimpleSelector(
  [
    vipClubDailyBonusesSelector,
    vipClubWeeklyBonusesSelector,
    vipClubMonthlyBonusesSelector,
    vipClubBirthdayBonusesSelector,
    vipClubExtraBonusesSelector,
  ],
  (...bonusesType) => bonusesType.some(isNotEmpty),
);

const vipClubBonusesStateSelector = (state: TPlatformAppState) => {
  const bonusesLoading = availableBonusesLoadingSelector(state);
  const levelRulesLoading = vipClubLevelRulesLoadingSelector(state);
  const settingsLoading = vipClubSettingsLoadingSelector(state);

  if (levelRulesLoading || settingsLoading || bonusesLoading) {
    return EVipClubBonusesState.loading;
  }

  const bonusesFailed = callManagerFailedSelector(state, AVAILABLE_BONUSES_CALL_SYMBOL);
  const levelRulesFailed = callManagerFailedSelector(state, VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL);
  const settingsFailed = callManagerFailedSelector(state, VIP_CLUB_SETTINGS_LOADING_SYMBOL);

  if (bonusesFailed || levelRulesFailed || settingsFailed) {
    return EVipClubBonusesState.failed;
  }

  const hasAnyBonus = vipClubHasAnyBonusSelector(state);
  if (!hasAnyBonus) {
    return EVipClubBonusesState.empty;
  }

  return EVipClubBonusesState.full;
};

const EMPTY_TIMER = 0;

const vipClubBonusAvailableForSelector = (state: TPlatformAppState, type: EVipClubBonusType) => {
  if (type === EVipClubBonusType.birthday) {
    return vipClubGetMSUntilEndOfDay();
  }

  //DAILY bonus available for 24h
  if (type === EVipClubBonusType.daily) {
    return vipClubGetMSUntilEndOfDay();
  }

  //Availability of WEEKLY bonus depends on vipClubSettings
  if (type === EVipClubBonusType.weekly) {
    const availableDays = vipClubSettingsNotNilSelectors.weeklyBonusAvailableDays(state);

    return vipClubGetMSWeeklyBonusAvailableFor(availableDays);
  }

  //Availability of MONTHLY bonus depends on vipClubSettings
  if (type === EVipClubBonusType.monthly) {
    const availableDays = vipClubSettingsNotNilSelectors.monthlyBonusDaysAvailable(state);

    return vipClubGetMSMonthlyBonusAvailableFor(availableDays);
  }

  //EXTRA bonus has no timer
  return EMPTY_TIMER;
};

const vipClubBonusWillBeAvailableInSelector = (state: TPlatformAppState, type: EVipClubBonusType) => {
  if (type === EVipClubBonusType.birthday) {
    const playerProfile = isNotNilPlayerProfileSelector(state);
    if (!playerProfile) {
      return EMPTY_TIMER;
    }

    const playerBirthday = profileSelectors.dateOfBirth(state);

    const birthDate = getDateByTimeZone("UTC", playerBirthday);

    const todayDate = vipClubGetDate();

    birthDate.setFullYear(todayDate.getFullYear());

    const todayTimestamp = todayDate.getTime();

    const diff = birthDate.getTime() - todayTimestamp;

    const isPast = diff < 0;
    if (isPast) {
      birthDate.setFullYear(todayDate.getFullYear() + 1);

      return birthDate.getTime() - todayTimestamp;
    }

    return diff;
  }

  //DAILY bonus will be available NEXT DAY at 00:00:00
  if (type === EVipClubBonusType.daily) {
    return vipClubGetMSUntilEndOfDay();
  }

  //WEEKLY bonus will be available NEXT MONDAY at 00:00:00
  if (type === EVipClubBonusType.weekly) {
    return vipClubGetMSUntilNextMonday();
  }

  //MONTHLY bonus will be available NEXT MONTH on 1st at 00:00:00
  if (type === EVipClubBonusType.monthly) {
    return vipClubGetMSUntilNextMonth();
  }

  //EXTRA bonus has no timer
  return EMPTY_TIMER;
};

const vipClubBonusCardButtonStateSelector = (state: TPlatformAppState, bonusId: string) => {
  const bonus = availableBonusByIdNotNilSelector(state, bonusId);

  if (isNotEmpty(bonus.invalidatedMatchResults)) {
    return EVipClubBonusCardButtonState.disabled;
  }

  if (bonus.bonusType === EPlatform_BonusTypeEnum.cashback) {
    return EVipClubBonusCardButtonState.cashback;
  }

  if (isNotEmpty(bonus.eligibility.claimRules)) {
    return EVipClubBonusCardButtonState.showClaimRules;
  }

  return EVipClubBonusCardButtonState.claim;
};

export {
  vipClubBonusesByTypeSelector,
  vipClubBonusesStateSelector,
  vipClubIsNotEmptyBonusesByTypeSelector,
  vipClubBonusAvailableForSelector,
  vipClubBonusWillBeAvailableInSelector,
  vipClubBonusCardButtonStateSelector,
};
