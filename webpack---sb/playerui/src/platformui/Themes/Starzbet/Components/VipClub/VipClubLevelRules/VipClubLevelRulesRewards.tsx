import { type ComponentType, createElement, memo } from "react";
import type { TPlatform_Bonus_VipClub_Fragment, TPlatform_VipClubLevelRewards_Fragment } from "@sb/graphql-client/PlayerUI";
import { entries, isString, isVoid, withProps } from "@sb/utils";
import {
  platformui_starzbet_vipClub_levelRules_rewards_birthdayBonuses,
  platformui_starzbet_vipClub_levelRules_rewards_dailyBonuses,
  platformui_starzbet_vipClub_levelRules_rewards_depositBonuses,
  platformui_starzbet_vipClub_levelRules_rewards_extraBonuses,
  platformui_starzbet_vipClub_levelRules_rewards_levelUpBonuses,
  platformui_starzbet_vipClub_levelRules_rewards_monthlyBonuses,
  platformui_starzbet_vipClub_levelRules_rewards_title,
  platformui_starzbet_vipClub_levelRules_rewards_weeklyBonuses,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./VipClubLevelRules.module.css";
import { When } from "../../../../../../common/Components/When";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";

const VipClubLevelRuleBonusCard = memo<TPlatform_Bonus_VipClub_Fragment>(({ descriptionTitle, name }) => (
  <div className={classes.vipClubLevelRuleBonusCard}>
    <h4>
      <TranslateRecord record={name} />
    </h4>

    <When condition={Boolean(descriptionTitle)}>
      <p>
        <TranslateRecord record={descriptionTitle} />
      </p>
    </When>
  </div>
));
VipClubLevelRuleBonusCard.displayName = "VipClubLevelRuleBonusCard";

interface IVipClubLevelRuleBonusProps {
  value: TPlatform_Bonus_VipClub_Fragment[] | TPlatform_Bonus_VipClub_Fragment | string;
  titleTKey: TTKeys;
}

const VipClubLevelRuleBonus = memo<IVipClubLevelRuleBonusProps>(({ value, titleTKey }) => {
  const [t] = useTranslation();

  if (isString(value)) {
    return (
      <h3 className={classes.vipClubLevelRuleSubtitle}>
        <span>
          {t(titleTKey)}

          {": "}
        </span>

        <span className={classes.vipClubLevelRuleCashback}>{value}</span>
      </h3>
    );
  }

  return (
    <div className={classes.vipClubLevelRuleBonuses}>
      <h3 className={classes.vipClubLevelRuleSubtitle}>
        <span>
          {t(titleTKey)}

          {": "}
        </span>
      </h3>

      <div className={classes.vipClubLevelRuleBonusCards}>
        {
          Array.isArray(value)
            ? value.map((bonus) => <VipClubLevelRuleBonusCard {...bonus} key={bonus.id} />)
            : <VipClubLevelRuleBonusCard {...value} key={value.id} />
        }
      </div>
    </div>
  );
});
VipClubLevelRuleBonus.displayName = "VipClubLevelRuleBonus";

type TRewardKeyToComponentTypeMap = Record<keyof TPlatform_VipClubLevelRewards_Fragment, ComponentType<Omit<IVipClubLevelRuleBonusProps, "titleTKey">> | null>

const REWARD_KEY_TO_COMPONENT_TYPE_MAP: TRewardKeyToComponentTypeMap = {
  monthlyBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_monthlyBonuses,
  } as const),
  dailyBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_dailyBonuses,
  } as const),
  weeklyBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_weeklyBonuses,
  } as const),
  depositBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_depositBonuses,
  } as const),
  levelUpBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_levelUpBonuses,
  } as const),
  birthdayBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_birthdayBonuses,
  } as const),
  extraBonuses: withProps(VipClubLevelRuleBonus)({
    titleTKey: platformui_starzbet_vipClub_levelRules_rewards_extraBonuses,
  } as const),
  __typename: null,
  cashbackPerPoints: null,
};

interface IVipClubLevelRulesRewards {
  rewards: TPlatform_VipClubLevelRewards_Fragment;
}

const VipClubLevelRulesRewards = memo<IVipClubLevelRulesRewards>(({ rewards }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubLevelRuleRewardsInfo}>
      <h3 className={classes.vipClubLevelRuleTitle}>
        {t(platformui_starzbet_vipClub_levelRules_rewards_title)}

        {":"}
      </h3>

      {
        entries(rewards).map(([key, value]) => {
          if (isVoid(value)) {
            return null;
          }

          const componentType = REWARD_KEY_TO_COMPONENT_TYPE_MAP[key];

          return componentType ? createElement(componentType, { value }) : null;
        })
      }
    </div>
  );
});
VipClubLevelRulesRewards.displayName = "VipClubLevelRulesRewards";

export { VipClubLevelRulesRewards };
