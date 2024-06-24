// @ts-nocheck
import { combineWithoutRepetitions } from "@sb/betting-core/Combinatorics";
import { virtualGameGetOutcomeId } from "../../Common/Model/GetOutcomeId";

const getComboOutcomeIds = (marketId, outcome, comboLength) => {
  if (!outcome[0]) {
    return [];
  }

  const list = combineWithoutRepetitions(outcome[0].split(","), comboLength);

  return list.map((combo) => virtualGameGetOutcomeId(marketId, { outcome: [combo] }));
};

export { getComboOutcomeIds };
