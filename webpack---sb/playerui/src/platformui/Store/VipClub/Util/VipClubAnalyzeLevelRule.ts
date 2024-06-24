import type { TPlatform_VipClubLevelRewards_Fragment, TPlatform_VipClubLevelRule_Fragment } from "@sb/graphql-client/PlayerUI";
import { entries, isNotEmpty, isNotNil } from "@sb/utils";

const vipClubCheckLevelRuleRewardsExist = (rewards: TPlatform_VipClubLevelRewards_Fragment) =>
  entries(rewards).some(([key, value]) => {
    if (key === "__typename") {
      return false;
    }
    if (Array.isArray(value)) {
      return isNotEmpty(value);
    }

    return isNotNil(value);
  });

const vipClubAnalyzeLevelRule = ({ rewards, extraMedias, description }: TPlatform_VipClubLevelRule_Fragment) => {
  const hasSomeReward = vipClubCheckLevelRuleRewardsExist(rewards);
  const hasExtraMedias = isNotEmpty(extraMedias);

  const expandable = Boolean(description) || hasSomeReward || hasExtraMedias;

  return {
    hasSomeReward,
    hasExtraMedias,
    expandable,
  };
};

export { vipClubAnalyzeLevelRule };
