import { createMemoSelector, createSimpleSelector, isNotEmpty } from "@sb/utils";
import { toSelectOption } from "../../../../../common/Components/Field/SelectModel";
import { extractId } from "../../../../../common/Utils/IDUtils";
import { BET_SLIP_PROMOTION_BONUS_TAG_ID } from "../../Model/BonusTags";
import { availableBonusesWithoutInvalidatedMatchResultsSelector } from "../BonusesSelectors";

const availableBetSlipPromotionBonusesSelector = createMemoSelector(
  [availableBonusesWithoutInvalidatedMatchResultsSelector],
  (availableBonuses) => availableBonuses.filter((it) => it.bonusTagIds.includes(BET_SLIP_PROMOTION_BONUS_TAG_ID)),
);

const isAnyBetSlipPromotionBonusesAvailableSelector = createSimpleSelector(
  [availableBetSlipPromotionBonusesSelector],
  isNotEmpty,
);

const availableBetSlipPromotionBonusIdsSelector = createMemoSelector(
  [availableBetSlipPromotionBonusesSelector],
  (availableBonuses) => availableBonuses.map(extractId),
);

const availableBetSlipPromotionBonusOptionsSelector = createMemoSelector(
  [availableBetSlipPromotionBonusesSelector],
  (availableBonuses) => availableBonuses.map(({ id }) => toSelectOption(id)),
);

export {
  isAnyBetSlipPromotionBonusesAvailableSelector,
  availableBetSlipPromotionBonusIdsSelector,
  availableBetSlipPromotionBonusOptionsSelector,
};
