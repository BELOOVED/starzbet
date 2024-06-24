import { getNotNil, Money } from "@sb/utils";
import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import { isPlayerBonusOnWageringStage } from "../Utils/CommonBonusUtils";
import { platformBonusesSelectors, playerBonusByIdSelector } from "./BonusesSelectors";

const notSettledBonusResourcesCountSelector = (state: IWithPlatformBonusesState, playerBonusId: string) =>
  platformBonusesSelectors.notSettledResourcesMap(state)[playerBonusId];

/**
 * show just for active bonuses on 'Wagering' stage with completed wagering (currentWagering > totalWagering)
 * in awaiting of settle all resources (bets)
 */
const notSettledBonusResourcesCountVisibleSelector = (
  state: IWithPlatformBonusesState,
  playerBonusId: string,
): boolean => {
  const activePlayerBonus = playerBonusByIdSelector(state, playerBonusId);

  /**
   * do not show for 'History' bonuses
   */
  if (!activePlayerBonus) {
    return false;
  }

  const isWageringStage = isPlayerBonusOnWageringStage(activePlayerBonus);

  if (!isWageringStage) {
    return false;
  }
  const current = getNotNil(activePlayerBonus.currentWagering, ["notSettledBonusResourcesCountVisibleSelector"], "currentWagering");
  const total = getNotNil(activePlayerBonus.totalWagering, ["notSettledBonusResourcesCountVisibleSelector"], "totalWagering");

  return Money.greaterThanOrEqual(current.external, total.external);
};

export { notSettledBonusResourcesCountSelector, notSettledBonusResourcesCountVisibleSelector };
