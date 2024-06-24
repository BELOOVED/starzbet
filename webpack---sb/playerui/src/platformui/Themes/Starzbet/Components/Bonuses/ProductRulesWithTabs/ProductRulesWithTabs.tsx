import clsx from "clsx";
import { type ComponentType, createElement, memo, useState } from "react";
import {
  type TPlatform_BonusFreeBetProductRule_Fragment,
  type TPlatform_BonusWageringProductRule_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type EBonusProductEnum } from "@sb/graphql-client";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, isNil, isNotVoid, Money, useParamSelector } from "@sb/utils";
import {
  platformui_starzbet_bonus_wageringRules_minimumBets,
  platformui_starzbet_bonus_wageringRules_on,
  platformui_starzbet_bonus_wageringRules_play,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./ProductRulesWithTabs.module.css";
import { Space } from "../../../../../../common/Components/Space/Space";
import {
  wageringProductProgressSelector,
  wageringProductRemainingAmountSelector,
} from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import {
  CRITERIA_TYPE_TO_ICON_MAP,
  CRITERIA_TYPE_TO_PRODUCT_TRANSLATE_MAP,
  PRODUCT_TRANSLATE_MAP,
} from "../../../Model/Bonus/BonusMaps";
import { BonusTemplate } from "../BonusTemplate/BonusTemplate";
import { useBonusItemContext } from "../BonusItemContext";

interface IDependentRuleTabIconProps {
  rule: TPlatform_BonusFreeBetProductRule_Fragment | TPlatform_BonusWageringProductRule_Fragment;
  setActive: (product: EBonusProductEnum) => void;
  isActive: boolean;
  isSingle: boolean;
}

const RuleTabIcon = memo<IDependentRuleTabIconProps>(({
  rule,
  setActive,
  isActive,
  isSingle,
}) => {
  const [t] = useTranslation();

  const handleItemClick = () => setActive(rule.product);

  return (
    <li
      className={clsx(classes.tabItem, isActive && classes.active, isSingle && classes.single)}
      onClick={handleItemClick}
    >
      <div>
        {createElement(CRITERIA_TYPE_TO_ICON_MAP[rule.criteria.__typename])}
      </div>

      <div>
        {t(CRITERIA_TYPE_TO_PRODUCT_TRANSLATE_MAP[rule.criteria.__typename])}
      </div>
    </li>
  );
});
RuleTabIcon.displayName = "RuleTabIcon";

interface IWithProduct {
  product: EBonusProductEnum;
}

const RemainingWager = memo<IWithProduct>(({ product }) => {
  const [t] = useTranslation();
  const { bonusId } = useBonusItemContext();
  const remainingAmount = useParamSelector(wageringProductRemainingAmountSelector, [bonusId, product]);

  if (isNil(remainingAmount)) {
    return null;
  }

  const formatted = Money.toFormat(remainingAmount, EMoneyFormat.symbolLeft);

  return (
    <div className={classes.remainingWager}>
      {t(platformui_starzbet_bonus_wageringRules_play)}

      <span className={classes.mainColor}>{formatted}</span>

      {t(platformui_starzbet_bonus_wageringRules_on)}

      <span>{t(PRODUCT_TRANSLATE_MAP[product])}</span>
    </div>
  );
});
RemainingWager.displayName = "RemainingWager";

const MinimumBets = memo<IWithProduct>(({ product }) => {
  const { bonusId } = useBonusItemContext();
  const progress = useParamSelector(wageringProductProgressSelector, [bonusId, product]);
  const [t] = useTranslation();

  if (!progress || !progress.requiredCount) {
    return null;
  }

  return (
    <div className={classes.minimumBets}>
      <span>
        {t(platformui_starzbet_bonus_wageringRules_minimumBets)}
      </span>

      <span className={classes.mainColor}>
        {progress.currentCount}

        {"/"}

        {progress.requiredCount}
      </span>
    </div>
  );
});
MinimumBets.displayName = "MinimumBets";

interface IAggregateRuleDependentRulesProps {
  productRules: (TPlatform_BonusFreeBetProductRule_Fragment | TPlatform_BonusWageringProductRule_Fragment)[];
  remainingWager?: ComponentType<IWithProduct>;
}

const ProductRulesWithTabs = memo<IAggregateRuleDependentRulesProps>(({ productRules, remainingWager }) => {
  const { bonusId, forAvailable } = useBonusItemContext();
  const [active, setActive] = useState(productRules[0].product);

  const activeRule = productRules.find(({ product }) => product === active);

  return (
    <Space value={10} vertical>
      <ul className={classes.tabList}>
        {
          productRules.map((rule) => (
            <RuleTabIcon
              rule={rule}
              setActive={setActive}
              isActive={active === rule.product}
              isSingle={productRules.length === 1}
              key={rule.product}
            />
          ))
        }
      </ul>

      {isNotVoid(remainingWager) && createElement(remainingWager, { product: active })}

      <BonusTemplate
        note={activeRule.note}
        bonusId={bonusId}
        forAvailable={forAvailable}
        className={classes.note}
      />

      <MinimumBets product={active} />
    </Space>
  );
});
ProductRulesWithTabs.displayName = "ProductRulesWithTabs";

export { ProductRulesWithTabs, RemainingWager };
