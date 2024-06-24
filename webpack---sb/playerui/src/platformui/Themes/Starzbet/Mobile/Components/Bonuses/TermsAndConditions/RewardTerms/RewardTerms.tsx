import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_bonus_terms_reward } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./RewardTerms.module.css";
import { bonusRewardSelector } from "../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { useBonusItemContext } from "../../../../../Components/Bonuses/BonusItemContext";
import { rewardTKeyByTypeMap, transformOptionsWithMoney } from "../../../../../Model/Bonus/BonusRewardsModel";
import { InnerTermsCollapse } from "../InnerTermsCollapse/InnerTermsCollapse";

interface IRewardContentProps {
  bonusId: string;
  forAvailable: boolean;
  itemClassName?: string;
}

const RewardContent = memo<IRewardContentProps>(({ bonusId, forAvailable, itemClassName }) => {
  const [t] = useTranslation();

  const reward = useParamSelector(bonusRewardSelector, [bonusId, forAvailable]);

  return Array.isArray(reward)
    ? (
      <ul>
        {
          reward.map(({ type, options }) => (
            <li key={type} className={clsx(classes.rewardItem, itemClassName)}>
              {t(rewardTKeyByTypeMap[type], transformOptionsWithMoney(options))}
            </li>
          ))
        }
      </ul>
    )
    : (
      <span className={clsx(classes.rewardItem, itemClassName)}>
        {t(rewardTKeyByTypeMap[reward.type], transformOptionsWithMoney(reward.options))}
      </span>
    );
});
RewardContent.displayName = "RewardContent";

const RewardTerms = memo(() => {
  const [t] = useTranslation();
  const { bonusId, forAvailable } = useBonusItemContext();

  return (
    <InnerTermsCollapse title={t(platformui_starzbet_bonus_terms_reward)}>
      <RewardContent bonusId={bonusId} forAvailable={forAvailable} />
    </InnerTermsCollapse>
  );
});
RewardTerms.displayName = "RewardTerms";

export { RewardTerms };
