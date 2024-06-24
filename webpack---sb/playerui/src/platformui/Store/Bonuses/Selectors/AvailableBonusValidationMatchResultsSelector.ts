import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import { availableBonusByIdNotNilSelectors } from "./BonusesSelectors";

const availableBonusHasLimitInvalidatedMatchResultsSelector = (state: IWithPlatformBonusesState, bonusId: string) => {
  const validationMatchResults = availableBonusByIdNotNilSelectors.invalidatedMatchResults(state, bonusId);

  return validationMatchResults.some(({
    __typename,
  }) => __typename === "Platform_BonusVipClubLimitMatchResult" || __typename === "Platform_BonusBonusLimitMatchResult");
};

export {
  availableBonusHasLimitInvalidatedMatchResultsSelector,
};
