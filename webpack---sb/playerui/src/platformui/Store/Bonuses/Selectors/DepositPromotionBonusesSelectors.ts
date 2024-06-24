import {
  createMemoSelector,
  createSimpleSelector,
  type IMoney,
  isEmpty,
  Money,
  type TNullable,
  withParams,
} from "@sb/utils";
import type { TPlatform_Bonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { selectFieldValue } from "@sb/form-new";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { type IWithConfigState } from "../../../../common/Store/Config/ConfigInitialState";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import {
  platformBankingDepositPaymentMethodNonNullableSelector,
} from "../../Banking/Selectors/PlatformBankingSelectors";
import { DEPOSIT_FORM } from "../../Banking/Utils/Variables";
import { DEPOSIT_BASE_FIELD_PATHS } from "../../Banking/Form/BaseFormModel";
import { DEPOSIT_PROMOTION_BONUS_TAG_ID } from "../Model/BonusTags";
import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import { isEligibilityDepositRule } from "../Utils/BonusTypeGuards";
import {
  availableBonusByIdNotNilSelector,
  availableBonusByIdSelector,
  availableBonusesWithoutInvalidatedMatchResultsSelector,
} from "./BonusesSelectors";

const getDepositPromoBonusFilter = (paymentMethodId: string) => ({ eligibility }: TPlatform_Bonus_Fragment) => {
  const claimDepositRule = eligibility.claimRules.find(isEligibilityDepositRule);

  if (!claimDepositRule) {
    return false;
  }

  const paymentMethodIds = claimDepositRule.criteria.paymentMethodIds;

  return isEmpty(paymentMethodIds) || paymentMethodIds.includes(paymentMethodId);
};

const availableDepositPromotionBonusesSelector = createMemoSelector(
  [availableBonusesWithoutInvalidatedMatchResultsSelector],
  (bonuses) => bonuses.filter((it) => it.bonusTagIds.includes(DEPOSIT_PROMOTION_BONUS_TAG_ID)),
);

const isAnyDepositPromotionBonusesAvailableSelector = createSimpleSelector(
  [
    platformBankingDepositPaymentMethodNonNullableSelector,
    availableDepositPromotionBonusesSelector,
  ],
  (paymentMethodId, depositPromoBonuses) => depositPromoBonuses.filter(getDepositPromoBonusFilter(paymentMethodId)).length > 0,
);

const isDepositPromotionBonusMatchedSelector = createSimpleSelector(
  [
    availableBonusByIdNotNilSelector,
    playerCurrencySelector,
    (_, bonusId: string, amount: TNullable<IMoney>) => amount,
  ],
  ({ eligibility }, playerCurrency, money) => {
    if (!money) {
      return false;
    }

    const claimDepositRule = eligibility.claimRules.find(isEligibilityDepositRule);

    if (!claimDepositRule) {
      return false;
    }

    const minAmount = findPlayerMoneyInBag(claimDepositRule.criteria.minAmount, playerCurrency);
    const maxAmount = findPlayerMoneyInBag(claimDepositRule.criteria.maxAmount, playerCurrency);

    if (minAmount && Money.lessThan(money, minAmount)) {
      return false;
    }

    if (maxAmount && Money.greaterThan(money, maxAmount)) {
      return false;
    }

    return true;
  },
);

const depositFormAmountSelector = withParams(selectFieldValue<IMoney>, DEPOSIT_FORM, DEPOSIT_BASE_FIELD_PATHS.amount);

const availableDepositPromotionBonusOptionsSelector = createMemoSelector(
  (state: TMixAppState) => {
    const paymentMethodId = platformBankingDepositPaymentMethodNonNullableSelector(state);
    const availableBonuses = availableDepositPromotionBonusesSelector(state);
    const amount = depositFormAmountSelector(state);

    return availableBonuses.filter(getDepositPromoBonusFilter(paymentMethodId)).map(({ id }) => ({
      value: id,
      disabled: !isDepositPromotionBonusMatchedSelector(state, id, amount),
    }));
  },
  { resultEqual: "deepEqual" },
);

const isDepositPromoBonusSelectedAndMatched = (
  state: IWithPlatformBonusesState & IWithPlayerState & IWithConfigState,
  selectedBonusId: string | undefined,
  amount: TNullable<IMoney>,
) => {
  if (!selectedBonusId) {
    return false;
  }

  /**
   * when list of available bonuses updated after bonus_created ws event ->
   * selectedBonusId will still be selected as value in deposit form, so we should clear it
   * todo DepositPromotionBonusField EnhancedSelect useEffect should be implemented as reducer decorator after new-form integrate
   */
  const maybeAlreadyNotAvailable = availableBonusByIdSelector(state, selectedBonusId);

  if (!maybeAlreadyNotAvailable) {
    return false;
  }

  return isDepositPromotionBonusMatchedSelector(state, selectedBonusId, amount);
};

export {
  isAnyDepositPromotionBonusesAvailableSelector,
  availableDepositPromotionBonusOptionsSelector,
  isDepositPromoBonusSelectedAndMatched,
};
