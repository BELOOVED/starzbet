import {
  platformui_starzbet_bonus_reward_cashbackSingle,
  platformui_starzbet_bonus_reward_cashbackTiered,
  platformui_starzbet_bonus_reward_freeBetMonetary,
  platformui_starzbet_bonus_reward_freeBetMonetaryOnSport,
  platformui_starzbet_bonus_reward_freeBetPercentage,
  platformui_starzbet_bonus_reward_freeBetPercentageOnSport,
  platformui_starzbet_bonus_reward_freeBetSpinsCount,
  platformui_starzbet_bonus_reward_freeSpinsCountWithDependsOnDeposit,
  platformui_starzbet_bonus_reward_freeSpinsDependsOnDeposit,
  platformui_starzbet_bonus_reward_monetary,
  platformui_starzbet_bonus_reward_percentage,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EMoneyFormat, type IMoney, Money, type TNullable } from "@sb/utils";
import { ERewardType } from "../../../../Store/Bonuses/Model/Enums/ERewardType";

const rewardTKeyByTypeMap: Record<ERewardType, string> = {
  [ERewardType.monetary]: platformui_starzbet_bonus_reward_monetary,
  [ERewardType.percentage]: platformui_starzbet_bonus_reward_percentage,
  [ERewardType.freeBetMonetary]: platformui_starzbet_bonus_reward_freeBetMonetary,
  [ERewardType.freeBetPercentage]: platformui_starzbet_bonus_reward_freeBetPercentage,
  [ERewardType.freeBetMonetaryOnSport]: platformui_starzbet_bonus_reward_freeBetMonetaryOnSport,
  [ERewardType.freeBetPercentageOnSport]: platformui_starzbet_bonus_reward_freeBetPercentageOnSport,
  [ERewardType.freeBetSpinsCount]: platformui_starzbet_bonus_reward_freeBetSpinsCount,
  [ERewardType.cashbackSingle]: platformui_starzbet_bonus_reward_cashbackSingle,
  [ERewardType.cashbackTiered]: platformui_starzbet_bonus_reward_cashbackTiered,
  [ERewardType.freeSpinsDependsOnDeposit]: platformui_starzbet_bonus_reward_freeSpinsDependsOnDeposit,
  [ERewardType.freeSpinsCountWithDependsOnDeposit]: platformui_starzbet_bonus_reward_freeSpinsCountWithDependsOnDeposit,
};

const transformOptionsWithMoney = (options: { money?: TNullable<IMoney>; }) => ({
  ...options,
  money: options.money && Money.isMoney(options.money) ? Money.toFormat(options.money, EMoneyFormat.codeRight) : undefined,
});

export {
  rewardTKeyByTypeMap,
  transformOptionsWithMoney,
};
