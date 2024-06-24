import { memo } from "react";
import { EMoneyFormat, Money } from "@sb/utils";
import type { TPlatform_BonusEligibilityTotalTurnoverRuleProgress_Fragment } from "@sb/graphql-client/PlayerUI";
import { RuleProgress } from "../../../../../../Components/Bonuses/RuleProgress/RuleProgress";

interface ITotalTurnoverAggregateRuleProgressProps {
  progressNode: TPlatform_BonusEligibilityTotalTurnoverRuleProgress_Fragment;
}

const TotalTurnoverAggregateRuleProgress = memo<ITotalTurnoverAggregateRuleProgressProps>(({ progressNode }) => {
  const currentValue = Money.toFormat(progressNode.currentTurnover, EMoneyFormat.symbolLeft);

  const requiredValue = progressNode.requiredTurnover
    ? Money.toFormat(progressNode.requiredTurnover, EMoneyFormat.symbolLeft)
    : undefined;

  const currentProgress = progressNode.requiredTurnover
    ? Math.floor(Number(progressNode.currentTurnover.amount) / Number(progressNode.requiredTurnover.amount) * 100)
    : 0;

  return (
    <RuleProgress
      currentProgress={currentProgress}
      currentValue={currentValue}
      requiredValue={requiredValue}
    />
  );
});
TotalTurnoverAggregateRuleProgress.displayName = "TotalTurnoverAggregateRuleProgress";

export { TotalTurnoverAggregateRuleProgress };
