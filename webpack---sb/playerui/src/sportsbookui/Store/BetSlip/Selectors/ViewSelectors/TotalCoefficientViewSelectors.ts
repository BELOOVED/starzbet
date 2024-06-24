import { createSelector } from "reselect";
import { computeTotalCoefficient, type TCoefficientContainer } from "../../Model/ComputeTotalCoefficient";
import { coefficientContainersByPicksSelector } from "../CoefficientContainersSelector";
import { invalidPickCountViewSelector } from "./ValidPicksViewSelector";
import { betHashForMultiViewSelector, currentBetHashViewSelector } from "./BetSlipViewSelectors";
import { currentSystemHashViewSelector } from "./SystemsViewSelectors";

const combineCoefficient = (invalidCount: boolean, coefficientContainers: TCoefficientContainer[], hash: string) => invalidCount
  ? 0
  : computeTotalCoefficient(coefficientContainers, hash);

const totalCoefficientForMultiViewSelector = createSelector(
  invalidPickCountViewSelector,
  coefficientContainersByPicksSelector,
  betHashForMultiViewSelector,
  combineCoefficient,
);

const totalCoefficientForSystemViewSelector = createSelector(
  invalidPickCountViewSelector,
  coefficientContainersByPicksSelector,
  currentSystemHashViewSelector,
  combineCoefficient,
);

const totalCoefficientForAllViewSelector = createSelector(
  invalidPickCountViewSelector,
  coefficientContainersByPicksSelector,
  currentBetHashViewSelector,
  combineCoefficient,
);

export {
  totalCoefficientForMultiViewSelector,
  totalCoefficientForSystemViewSelector,
  totalCoefficientForAllViewSelector,
};
