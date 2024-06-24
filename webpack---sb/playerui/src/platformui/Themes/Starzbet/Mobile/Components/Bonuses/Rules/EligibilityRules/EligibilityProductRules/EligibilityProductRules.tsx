import clsx from "clsx";
import { createElement, memo, useCallback, useState } from "react";
import { platformui_starzbet_bonus_claim_title_placeholder } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useParamSelector } from "@sb/utils";
import classes from "./EligibilityProductRules.module.css";
import {
  aggregateRuleCommonSelector,
  aggregateRuleDependentRuleCommonSelector,
  eligibilityProductRulesAggregateRulesIdsSelector,
} from "../../../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import {
  isTotalCountRuleProgress,
  isTotalTurnoverRuleProgress,
} from "../../../../../../../../Store/Bonuses/Utils/BonusTypeGuards";
import { CheckedIconV2 } from "../../../../../../Components/Icons/CheckedIconV2";
import { useBonusItemContext } from "../../../../../../Components/Bonuses/BonusItemContext";
import { BonusTemplate } from "../../../../../../Components/Bonuses/BonusTemplate/BonusTemplate";
import {
  CRITERIA_TYPE_TO_ICON_MAP,
  CRITERIA_TYPE_TO_PRODUCT_TRANSLATE_MAP,
} from "../../../../../../Model/Bonus/BonusMaps";
import { RuleLayout } from "../RuleLayout/RuleLayout";
import { TotalCountAggregateRuleProgress } from "./TotalCountAggregateRuleProgress";
import { TotalTurnoverAggregateRuleProgress } from "./TotalTurnoverAggregateRuleProgress";

interface IDependentRuleTabIconProps {
  ruleId: string;
  setActive: (ruleId: string) => void;
  isActive: boolean;
}

const DependentRuleTabIcon = memo<IDependentRuleTabIconProps>(({ ruleId, setActive, isActive }) => {
  const [t] = useTranslation();
  const { bonusId, forAvailable } = useBonusItemContext();
  const {
    criteria,
    progressNode,
  } = useParamSelector(aggregateRuleDependentRuleCommonSelector, [bonusId, forAvailable, ruleId]);

  const handleItemClick = useCallback(() => setActive(ruleId), [setActive, ruleId]);

  return (
    <li className={clsx(classes.tabItem, isActive && classes.active)} onClick={handleItemClick}>
      {progressNode?.isSatisfiedByPlayer ? <CheckedIconV2 className={classes.ruleCheckedIcon} /> : null}

      <div>
        {createElement(CRITERIA_TYPE_TO_ICON_MAP[criteria.__typename])}
      </div>

      <div>
        {t(CRITERIA_TYPE_TO_PRODUCT_TRANSLATE_MAP[criteria.__typename])}
      </div>
    </li>
  );
});
DependentRuleTabIcon.displayName = "DependentRuleTabIcon";

interface IActiveRuleRulesProps {
  ruleId: string;
}

const ActiveRuleRules = memo<IActiveRuleRulesProps>(({ ruleId }) => {
  const { bonusId, forAvailable } = useBonusItemContext();
  const { criteria } = useParamSelector(aggregateRuleDependentRuleCommonSelector, [bonusId, forAvailable, ruleId]);

  return (
    <div className={classes.mt8}>
      <BonusTemplate
        note={criteria.title}
        bonusId={bonusId}
        forAvailable={forAvailable}
        className={classes.ruleTitle}
      />

      <BonusTemplate note={criteria.note} bonusId={bonusId} forAvailable={forAvailable} />
    </div>
  );
});
ActiveRuleRules.displayName = "ActiveRuleRules";

interface IAggregateRuleDependentRulesProps {
  rules: string[];
}

const AggregateRuleDependentRules = memo<IAggregateRuleDependentRulesProps>(({ rules }) => {
  const [active, setActive] = useState(rules[0]);

  if (rules.length === 1) {
    return <ActiveRuleRules ruleId={rules[0]} />;
  }

  return (
    <div>
      <ul className={classes.tabList}>
        {
          rules.map((ruleId) => (
            <DependentRuleTabIcon
              ruleId={ruleId}
              setActive={setActive}
              isActive={active === ruleId}
              key={ruleId}
            />
          ))
        }
      </ul>

      <ActiveRuleRules ruleId={active} />
    </div>
  );
});
AggregateRuleDependentRules.displayName = "AggregateRuleDependentRules";

interface IAggregateRuleProps {
  ruleId: string;
}

const AggregateRule = memo<IAggregateRuleProps>(({ ruleId }) => {
  const [t] = useTranslation();
  const { bonusId, forAvailable } = useBonusItemContext();
  const { criteria, progressNode } = useParamSelector(aggregateRuleCommonSelector, [bonusId, forAvailable, ruleId]);

  const title = criteria.title
    ? <BonusTemplate note={criteria.title} bonusId={bonusId} forAvailable={forAvailable} />
    : t(platformui_starzbet_bonus_claim_title_placeholder);

  return (
    <RuleLayout
      checked={progressNode ? progressNode.isSatisfiedByPlayer : false}
      title={title}
    >
      <BonusTemplate
        note={criteria.note}
        className={classes.mb8}
        bonusId={bonusId}
        forAvailable={forAvailable}
      />

      {
        progressNode && isTotalCountRuleProgress(progressNode)
          ? <TotalCountAggregateRuleProgress progressNode={progressNode} />
          : null
      }

      {
        progressNode && isTotalTurnoverRuleProgress(progressNode)
          ? <TotalTurnoverAggregateRuleProgress progressNode={progressNode} />
          : null
      }

      <AggregateRuleDependentRules rules={criteria.rules} />
    </RuleLayout>
  );
});
AggregateRule.displayName = "AggregateRule";

const EligibilityProductRules = memo(() => {
  const { bonusId, forAvailable } = useBonusItemContext();
  const aggregateRulesIds = useParamSelector(eligibilityProductRulesAggregateRulesIdsSelector, [bonusId, forAvailable]);

  return (
    <>
      {
        aggregateRulesIds.map((id) => (
          <AggregateRule ruleId={id} key={id} />
        ))
      }
    </>
  );
});
EligibilityProductRules.displayName = "EligibilityProductRules";

export { EligibilityProductRules };
