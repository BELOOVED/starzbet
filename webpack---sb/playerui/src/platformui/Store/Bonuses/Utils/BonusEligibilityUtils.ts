import {
  type TPlatform_BonusEligibilityProductCriteriaRule_Fragment,
  type TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment,
  type TPlatform_BonusEligibilityRule_Fragment,
  type TPlatform_BonusEligibilityRuleProgress_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EMoneyFormat, getNotNil, Money } from "@sb/utils";
import { EPlatform_BonusEligibilityProductPredicateEnum } from "@sb/graphql-client";
import { type TEligibilityAggregateRuleCriteriaProgress } from "../Model/Types/BonusTypeShortcuts";
import {
  isDepositRuleProgress,
  isEligibilityAggregateCriteria,
  isEligibilityProductRule,
  isProductsRuleProgress,
} from "./BonusTypeGuards";

const getCurrentValue = (progressNode: TEligibilityAggregateRuleCriteriaProgress) => {
  if (progressNode.__typename === "Platform_BonusEligibilityTotalCountRuleProgress") {
    return progressNode.currentCount;
  }

  if (progressNode.__typename === "Platform_BonusEligibilityTotalTurnoverRuleProgress") {
    if (!progressNode.currentTurnover) {
      return "-";
    }

    return Money.toFormat(progressNode.currentTurnover, EMoneyFormat.symbolRight);
  }

  throw new Error(`[BonusEligibilityUtils] getCurrentValue unknown progress node: ${JSON.stringify(progressNode)}`);
};

const getRequiredValue = (progressNode: TEligibilityAggregateRuleCriteriaProgress) => {
  if (progressNode.__typename === "Platform_BonusEligibilityTotalCountRuleProgress") {
    return progressNode.requiredCount;
  }

  if (progressNode.__typename === "Platform_BonusEligibilityTotalTurnoverRuleProgress") {
    if (!progressNode.requiredTurnover) {
      return "-";
    }

    return Money.toFormat(progressNode.requiredTurnover, EMoneyFormat.symbolRight);
  }

  throw new Error(`[BonusEligibilityUtils] getRequiredValue unknown progress node: ${JSON.stringify(progressNode)}`);
};

const getCurrentProgress = (progressNode: TEligibilityAggregateRuleCriteriaProgress) => {
  if (progressNode.__typename === "Platform_BonusEligibilityTotalCountRuleProgress") {
    if (!progressNode.currentCount || !progressNode.requiredCount) {
      return 0;
    } else {
      return Math.floor(Number(progressNode.currentCount) / Number(progressNode.requiredCount) * 100);
    }
  }

  if (progressNode.__typename === "Platform_BonusEligibilityTotalTurnoverRuleProgress") {
    if (!(progressNode.currentTurnover) || !(progressNode.requiredTurnover)) {
      return 0;
    } else {
      return Math.floor(Number(progressNode.currentTurnover.amount) / Number(progressNode.requiredTurnover.amount) * 100);
    }
  }

  throw new Error(`[BonusEligibilityUtils] getCurrentProgress unknown progress node: ${JSON.stringify(progressNode)}`);
};

const getAggregateRuleProgressValues = (progressNode: TEligibilityAggregateRuleCriteriaProgress) => {
  const currentValue = getCurrentValue(progressNode);
  const requiredValue = getRequiredValue(progressNode);
  const currentProgress = getCurrentProgress(progressNode);

  return { currentValue, requiredValue, currentProgress };
};

const getEligibilityPlayRulesOperandSorter = (rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[]) =>
  (ruleId: string) => {
    const rule = rules.find((rule) => rule.ruleId === ruleId);

    if (rule && rule.value && isEligibilityAggregateCriteria(rule.value)) {
      return -1;
    }

    return 1;
  };

const getNode = (rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[], nodeId: string) =>
  getNotNil(rules.find((it) => it.ruleId === nodeId), ["Bonus Utils", "getNode"], "rule");

const isNodeSatisfied = (
  rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[],
  completionInfo: TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment[] | null,
  nodeId: string,
): boolean => {
  const node = getNode(rules, nodeId);

  if (!completionInfo) {
    return false;
  }

  if (!node.operands) {
    const progressNode = getNotNil(completionInfo.find(({ ruleId }) => ruleId === nodeId), ["isNodeSatisfied"], "progressNode");

    return progressNode.isSatisfiedByPlayer;
  } else {
    return getIsBranchCompleted(rules, completionInfo, nodeId, node.eligibilityProductPredicate);
  }
};

const getIsBranchCompleted = (
  rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[],
  completionInfo: TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment[] | null,
  nodeId: string,
  parentPredicate: EPlatform_BonusEligibilityProductPredicateEnum | null, // todo mb not nullable
) => {
  const node = getNode(rules, nodeId);

  const operands = getNotNil(node.operands, ["getIsBranchCompleted"], "operands");

  return parentPredicate === EPlatform_BonusEligibilityProductPredicateEnum.and
    ? operands.reduce((acc, it) => acc && isNodeSatisfied(rules, completionInfo, it), true)
    : operands.reduce((acc, it) => acc || isNodeSatisfied(rules, completionInfo, it), false);
};

const getIsSatisfiedReducer = (currentRules: TPlatform_BonusEligibilityRule_Fragment[]) =>
  (acc: boolean, it: TPlatform_BonusEligibilityRuleProgress_Fragment) => {
    if (isDepositRuleProgress(it)) {
      return acc && it.isSatisfiedByPlayer;
    }

    if (isProductsRuleProgress(it)) {
      const productRule = currentRules.find(isEligibilityProductRule);

      const flatRules = getNotNil(productRule, ["getIsSatisfiedReducer"], "productRule").flatRules;
      const { rules, indexes } = flatRules;

      const rootNodeIndex = getNotNil(indexes.find(({ parentId }) => parentId === null), ["getIsSatisfiedReducer"], "rootNode");
      const rootNodeId = rootNodeIndex.selfId;
      const rootNode = getNode(rules, rootNodeId);

      const isCurrentRuleAvailable = getIsBranchCompleted(rules, it.productRulesProgress, rootNodeId, rootNode.eligibilityProductPredicate);

      return acc && isCurrentRuleAvailable;
    }

    throw new Error("[getIsSatisfiedReducer] impossible condition");
  };

export {
  getAggregateRuleProgressValues,
  getEligibilityPlayRulesOperandSorter,
  getNode,
  getIsSatisfiedReducer,
  getIsBranchCompleted,
};
