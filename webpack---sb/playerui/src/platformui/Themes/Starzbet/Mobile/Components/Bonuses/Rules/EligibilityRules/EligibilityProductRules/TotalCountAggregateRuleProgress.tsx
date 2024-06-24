import { memo } from "react";
import type { TPlatform_BonusEligibilityTotalCountRuleProgress_Fragment } from "@sb/graphql-client/PlayerUI";
import { RuleProgress } from "../../../../../../Components/Bonuses/RuleProgress/RuleProgress";

interface ITotalCountAggregateRuleProgressProps {
  progressNode: TPlatform_BonusEligibilityTotalCountRuleProgress_Fragment;
}

const TotalCountAggregateRuleProgress = memo<ITotalCountAggregateRuleProgressProps>(({ progressNode }) => {
  const { currentCount, requiredCount } = progressNode;
  const currentProgress = Math.floor(Number(progressNode.currentCount) / Number(progressNode.requiredCount) * 100);

  return (
    <RuleProgress
      currentProgress={currentProgress}
      currentValue={currentCount}
      requiredValue={requiredCount}
    />
  );
});
TotalCountAggregateRuleProgress.displayName = "TotalCountAggregateRuleProgress";

export { TotalCountAggregateRuleProgress };
